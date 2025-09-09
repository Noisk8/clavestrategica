const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar base de datos
const db = new sqlite3.Database('./candidates.db');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS candidate_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    process_status TEXT DEFAULT 'Pendiente',
    invitation_status TEXT DEFAULT 'Pendiente',
    notes TEXT DEFAULT '',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insertar datos iniciales si la tabla está vacía
  db.get("SELECT COUNT(*) as count FROM candidate_tracking", (err, row) => {
    if (!err && row.count === 0) {
      console.log('Insertando datos iniciales...');
      const candidates = [
        'Camila Jiménez Sáez',
        'Lina Paola Delgadillo Murcia',
        'Daniela Eusse Molina',
        'Juan Camilo Correa Díaz',
        'Susana Botero Rendón',
        'Sandra Emilia Arroyave Sampedro',
        'Melissa Zuluaga Soto',
        'Laura Cristina Henao',
        'Martha Liliana Suárez García',
        'Julián Mazo Zapata',
        'Alejandro Jiménez Salazar',
        'Jose David Tovar Ortiz',
        'Stefan Quiroga Fajardo',
        'Juliana Soto Córdoba',
        'Hernando Sánchez',
        'Xenia Paola Arellano Tamayo',
        'Ximena Alvarez Castro',
        'Valentina Acosta',
        'Laura Velásquez Hernández',
        'Dina Margarita Linero Ariza'
      ];

      const stmt = db.prepare(`INSERT INTO candidate_tracking (name) VALUES (?)`);
      candidates.forEach(name => {
        stmt.run(name);
      });
      stmt.finalize();
    }
  });
});

// RUTAS API

// GET - Obtener todos los candidatos
app.get('/api/candidates', (req, res) => {
  db.all(`SELECT * FROM candidate_tracking ORDER BY name`, (err, rows) => {
    if (err) {
      console.error('Error al obtener candidatos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    
    const candidates = {};
    rows.forEach(row => {
      candidates[row.name] = {
        processStatus: row.process_status,
        invitationStatus: row.invitation_status,
        notes: row.notes,
        updatedAt: row.updated_at
      };
    });
    
    res.json(candidates);
  });
});

// PUT - Actualizar un candidato específico
app.put('/api/candidates/:name', (req, res) => {
  const candidateName = req.params.name;
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

  db.run(
    `UPDATE candidate_tracking 
     SET process_status = ?, invitation_status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
     WHERE name = ?`,
    [processStatus, invitationStatus, notes || '', candidateName],
    function(err) {
      if (err) {
        console.error('Error al actualizar candidato:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      
      if (this.changes === 0) {
        res.status(404).json({ error: 'Candidato no encontrado' });
        return;
      }

      res.json({ 
        message: 'Candidato actualizado exitosamente',
        updatedAt: new Date().toISOString()
      });
    }
  );
});

// POST - Actualizar múltiples candidatos (para importar datos)
app.post('/api/candidates/bulk-update', (req, res) => {
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

  db.serialize(() => {
    const stmt = db.prepare(`
      UPDATE candidate_tracking 
      SET process_status = ?, invitation_status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE name = ?
    `);

    updates.forEach(update => {
      stmt.run(update);
    });

    stmt.finalize((err) => {
      if (err) {
        console.error('Error en actualización masiva:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      res.json({ 
        message: `${updates.length} candidatos actualizados exitosamente`
      });
    });
  });
});

// GET - Exportar datos
app.get('/api/export', (req, res) => {
  db.all(`SELECT * FROM candidate_tracking ORDER BY name`, (err, rows) => {
    if (err) {
      console.error('Error al exportar datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    
    const exportData = {};
    rows.forEach(row => {
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
  });
});

// Servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Base de datos SQLite inicializada`);
});

// Manejo graceful del cierre
process.on('SIGINT', () => {
  console.log('\n⏹️  Cerrando servidor...');
  db.close((err) => {
    if (err) {
      console.error('Error al cerrar la base de datos:', err);
    } else {
      console.log('✅ Base de datos cerrada correctamente');
    }
    process.exit(0);
  });
});