const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Supabase URL:', supabaseUrl ? 'Configurada' : '❌ No configurada');
console.log('🔍 Supabase Key:', supabaseKey ? 'Configurada' : '❌ No configurada');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan las credenciales de Supabase');
  console.error('Variables disponibles:', Object.keys(process.env).filter(key => key.includes('SUPABASE')));
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Extraer nombre del candidato de la URL para requests PUT
  const urlParts = req.url.split('/');
  const candidateNameFromUrl = urlParts.length > 3 ? decodeURIComponent(urlParts[3]) : null;

  if (req.method === 'GET') {
    // GET - Obtener todos los candidatos
    try {
      const { data, error } = await supabase
        .from('candidate_tracking')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error al obtener candidatos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      
      const candidates = {};
      data.forEach(row => {
        candidates[row.name] = {
          processStatus: row.process_status,
          invitationStatus: row.invitation_status,
          notes: row.notes,
          updatedAt: row.updated_at
        };
      });
      
      res.json(candidates);
    } catch (error) {
      console.error('Error al obtener candidatos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else if (req.method === 'PUT') {
    // PUT - Actualizar un candidato específico (desde URL path)
    if (!candidateNameFromUrl) {
      return res.status(400).json({ error: 'Nombre de candidato requerido en la URL' });
    }
    
    const candidateName = candidateNameFromUrl;
    const { processStatus, invitationStatus, notes } = req.body;

    // Validar datos
    if (!processStatus || !invitationStatus) {
      return res.status(400).json({ 
        error: 'processStatus e invitationStatus son requeridos' 
      });
    }

    const validProcessStatus = ['Pendiente', 'Continúa', 'No continúa'];
    const validInvitationStatus = ['Pendiente', 'Enviado', 'Completado', 'No aplica'];

    if (!validProcessStatus.includes(processStatus)) {
      return res.status(400).json({ 
        error: 'processStatus debe ser uno de: ' + validProcessStatus.join(', ') 
      });
    }

    if (!validInvitationStatus.includes(invitationStatus)) {
      return res.status(400).json({ 
        error: 'invitationStatus debe ser uno de: ' + validInvitationStatus.join(', ') 
      });
    }

    try {
      const { data, error } = await supabase
        .from('candidate_tracking')
        .update({
          process_status: processStatus,
          invitation_status: invitationStatus,
          notes: notes || '',
          updated_at: new Date().toISOString()
        })
        .eq('name', candidateName)
        .select();

      if (error) {
        console.error('Error al actualizar candidato:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Candidato no encontrado' });
      }

      res.json({ 
        message: 'Candidato actualizado exitosamente',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error al actualizar candidato:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else if (req.method === 'POST') {
    // POST - Actualizar múltiples candidatos (para importar datos)
    const candidatesData = req.body;

    if (!candidatesData || typeof candidatesData !== 'object') {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const updates = [];
    for (const [name, data] of Object.entries(candidatesData)) {
      if (data.processStatus && data.invitationStatus !== undefined) {
        updates.push([
          data.processStatus,
          data.invitationStatus,
          data.notes || '',
          name
        ]);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No hay datos válidos para actualizar' });
    }

    try {
      // Actualizar cada candidato individualmente con Supabase
      const updatePromises = updates.map(([processStatus, invitationStatus, notes, name]) => 
        supabase
          .from('candidate_tracking')
          .update({
            process_status: processStatus,
            invitation_status: invitationStatus,
            notes: notes,
            updated_at: new Date().toISOString()
          })
          .eq('name', name)
      );

      const results = await Promise.all(updatePromises);
      
      // Verificar errores
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        console.error('Errores en actualización masiva:', errors);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      res.json({ 
        message: `${updates.length} candidatos actualizados exitosamente`
      });
    } catch (error) {
      console.error('Error en actualización masiva:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}