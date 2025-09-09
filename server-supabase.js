const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan las credenciales de Supabase en el archivo .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verificar conexión a Supabase al iniciar
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase
            .from('candidate_tracking')
            .select('count', { count: 'exact', head: true });
        
        if (error) {
            console.error('❌ Error conectando a Supabase:', error.message);
            return false;
        }
        
        console.log('✅ Conexión a Supabase exitosa');
        return true;
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        return false;
    }
}

// RUTAS API

// GET - Obtener todos los candidatos
app.get('/api/candidates', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('candidate_tracking')
            .select('*')
            .order('name');
        
        if (error) {
            console.error('Error al obtener candidatos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        
        // Transformar datos al formato esperado por el frontend
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
        console.error('Error general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// PUT - Actualizar un candidato específico
app.put('/api/candidates/:name', async (req, res) => {
    const candidateName = req.params.name;
    const { processStatus, invitationStatus, notes } = req.body;

    // Validar datos
    if (!processStatus || invitationStatus === undefined) {
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
                notes: notes || ''
            })
            .eq('name', candidateName)
            .select();

        if (error) {
            console.error('Error al actualizar candidato:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if (!data || data.length === 0) {
            res.status(404).json({ error: 'Candidato no encontrado' });
            return;
        }

        res.json({ 
            message: 'Candidato actualizado exitosamente',
            updatedAt: data[0].updated_at
        });

    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST - Actualizar múltiples candidatos (para importar datos)
app.post('/api/candidates/bulk-update', async (req, res) => {
    const candidatesData = req.body;

    if (!candidatesData || typeof candidatesData !== 'object') {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    try {
        let updateCount = 0;
        const errors = [];

        // Procesar actualizaciones secuencialmente para evitar conflictos
        for (const [name, data] of Object.entries(candidatesData)) {
            if (data.processStatus && data.invitationStatus !== undefined) {
                const { error } = await supabase
                    .from('candidate_tracking')
                    .update({
                        process_status: data.processStatus,
                        invitation_status: data.invitationStatus,
                        notes: data.notes || ''
                    })
                    .eq('name', name);

                if (error) {
                    errors.push(`Error actualizando ${name}: ${error.message}`);
                } else {
                    updateCount++;
                }
            }
        }

        if (errors.length > 0) {
            res.status(207).json({ 
                message: `${updateCount} candidatos actualizados, ${errors.length} errores`,
                errors: errors
            });
        } else {
            res.json({ 
                message: `${updateCount} candidatos actualizados exitosamente`
            });
        }

    } catch (error) {
        console.error('Error en actualización masiva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// GET - Exportar datos
app.get('/api/export', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('candidate_tracking')
            .select('*')
            .order('name');
        
        if (error) {
            console.error('Error al exportar datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        
        // Transformar datos al formato esperado
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
        console.error('Error general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST - Crear candidato (nuevo endpoint)
app.post('/api/candidates', async (req, res) => {
    const { name, processStatus = 'Pendiente', invitationStatus = 'Pendiente', notes = '' } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
    }

    try {
        const { data, error } = await supabase
            .from('candidate_tracking')
            .insert([{
                name,
                process_status: processStatus,
                invitation_status: invitationStatus,
                notes
            }])
            .select();

        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                res.status(409).json({ error: 'El candidato ya existe' });
            } else {
                console.error('Error al crear candidato:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
            return;
        }

        res.status(201).json({ 
            message: 'Candidato creado exitosamente',
            candidate: data[0]
        });

    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint de salud
app.get('/health', async (req, res) => {
    const supabaseOk = await testSupabaseConnection();
    res.json({
        status: 'ok',
        supabase: supabaseOk ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
async function startServer() {
    // Verificar conexión a Supabase antes de iniciar
    const supabaseConnected = await testSupabaseConnection();
    
    if (!supabaseConnected) {
        console.log('⚠️  Advertencia: No se pudo conectar a Supabase');
        console.log('🔗 Verifica las credenciales en el archivo .env');
        console.log('📋 Asegúrate de que la tabla candidate_tracking existe');
    }

    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`🗄️  Base de datos: Supabase ${supabaseConnected ? '✅' : '❌'}`);
        console.log(`🌐 Dashboard: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp`);
    });
}

// Manejo graceful del cierre
process.on('SIGINT', () => {
    console.log('\n⏹️  Cerrando servidor...');
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
});

startServer();