const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan las credenciales de Supabase');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
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