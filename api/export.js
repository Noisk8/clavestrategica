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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('candidate_tracking')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error al exportar datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      
      const exportData = {};
      data.forEach(row => {
        exportData[row.name] = {
          processStatus: row.process_status,
          invitationStatus: row.invitation_status,
          notes: row.notes,
          updatedAt: row.updated_at
        };
      });
      
      res.setHeader('Content-Disposition', `attachment; filename="candidatos_export_${new Date().toISOString().split('T')[0]}.json"`);
      res.setHeader('Content-Type', 'application/json');
      res.json(exportData);
    } catch (error) {
      console.error('Error al exportar datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}