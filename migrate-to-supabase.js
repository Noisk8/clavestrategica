const { createClient } = require('@supabase/supabase-js');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan las credenciales de Supabase en el archivo .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function exportFromSQLite() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./candidates.db');
        
        db.all(`SELECT * FROM candidate_tracking ORDER BY name`, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            
            console.log(`📊 Encontrados ${rows.length} candidatos en SQLite`);
            
            // Transformar los datos para Supabase
            const candidates = rows.map(row => ({
                name: row.name,
                process_status: row.process_status,
                invitation_status: row.invitation_status,
                notes: row.notes || '',
                updated_at: row.updated_at
            }));
            
            db.close();
            resolve(candidates);
        });
    });
}

async function importToSupabase(candidates) {
    try {
        console.log('🚀 Migrando datos a Supabase...');
        
        // Limpiar tabla existente (opcional)
        console.log('🧹 Limpiando datos existentes en Supabase...');
        const { error: deleteError } = await supabase
            .from('candidate_tracking')
            .delete()
            .neq('id', 0); // Eliminar todos los registros
        
        if (deleteError) {
            console.log('⚠️  Error al limpiar (probablemente la tabla estaba vacía):', deleteError.message);
        }
        
        // Insertar datos por lotes
        console.log('📥 Insertando candidatos...');
        const { data, error } = await supabase
            .from('candidate_tracking')
            .insert(candidates);
        
        if (error) {
            console.error('❌ Error al insertar datos:', error.message);
            return false;
        }
        
        console.log(`✅ ${candidates.length} candidatos migrados exitosamente`);
        return true;
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error.message);
        return false;
    }
}

async function verifyMigration() {
    try {
        console.log('🔍 Verificando migración...');
        
        const { data, error, count } = await supabase
            .from('candidate_tracking')
            .select('*', { count: 'exact' });
        
        if (error) {
            console.error('❌ Error al verificar:', error.message);
            return false;
        }
        
        console.log(`📊 Total de candidatos en Supabase: ${count}`);
        
        if (data && data.length > 0) {
            console.log('📝 Primeros 3 candidatos migrados:');
            data.slice(0, 3).forEach(candidate => {
                console.log(`  - ${candidate.name}: ${candidate.process_status} | ${candidate.invitation_status}`);
            });
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Error durante la verificación:', error.message);
        return false;
    }
}

async function migrateFull() {
    try {
        console.log('🔄 Iniciando migración completa de SQLite a Supabase...\n');
        
        // 1. Exportar desde SQLite
        console.log('1️⃣ Exportando datos de SQLite...');
        const candidates = await exportFromSQLite();
        
        if (candidates.length === 0) {
            console.log('⚠️  No hay datos para migrar');
            return;
        }
        
        console.log(`📋 Datos exportados: ${candidates.length} candidatos\n`);
        
        // 2. Importar a Supabase
        console.log('2️⃣ Importando a Supabase...');
        const importSuccess = await importToSupabase(candidates);
        
        if (!importSuccess) {
            console.log('❌ Error durante la importación');
            return;
        }
        
        console.log('');
        
        // 3. Verificar migración
        console.log('3️⃣ Verificando migración...');
        const verifySuccess = await verifyMigration();
        
        if (verifySuccess) {
            console.log('\n🎉 ¡Migración completada exitosamente!');
            console.log('📋 Próximos pasos:');
            console.log('   1. Actualizar el backend para usar Supabase');
            console.log('   2. Probar la aplicación');
            console.log('   3. Hacer backup de la BD SQLite');
        } else {
            console.log('\n❌ Error durante la verificación');
        }
        
    } catch (error) {
        console.error('💥 Error general durante la migración:', error.message);
    }
}

if (require.main === module) {
    migrateFull();
}

module.exports = { exportFromSQLite, importToSupabase, verifyMigration, migrateFull };