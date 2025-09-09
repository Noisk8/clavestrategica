const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

function exportCandidatesData() {
    const db = new sqlite3.Database('./candidates.db');
    
    db.all(`SELECT * FROM candidate_tracking ORDER BY name`, (err, rows) => {
        if (err) {
            console.error('❌ Error al leer SQLite:', err.message);
            return;
        }
        
        console.log(`📊 Encontrados ${rows.length} candidatos en SQLite`);
        
        // 1. Crear archivo JSON
        const jsonData = {
            candidates: rows,
            exportDate: new Date().toISOString(),
            totalRecords: rows.length
        };
        
        fs.writeFileSync('candidates-export.json', JSON.stringify(jsonData, null, 2));
        console.log('✅ JSON exportado: candidates-export.json');
        
        // 2. Crear script SQL para Supabase
        let sqlScript = `-- Script de inserción de candidatos para Supabase
-- Ejecuta este script en: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp/sql
-- Fecha de exportación: ${new Date().toISOString()}

-- Primero crear la tabla si no existe
CREATE TABLE IF NOT EXISTS candidate_tracking (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    process_status TEXT DEFAULT 'Pendiente',
    invitation_status TEXT DEFAULT 'Pendiente',
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Limpiar datos existentes (opcional)
-- DELETE FROM candidate_tracking;

-- Insertar datos de candidatos
INSERT INTO candidate_tracking (name, process_status, invitation_status, notes) VALUES\n`;
        
        const insertValues = rows.map(row => {
            const name = row.name.replace(/'/g, "''"); // Escapar comillas simples
            const processStatus = row.process_status.replace(/'/g, "''");
            const invitationStatus = row.invitation_status.replace(/'/g, "''");
            const notes = (row.notes || '').replace(/'/g, "''");
            
            return `('${name}', '${processStatus}', '${invitationStatus}', '${notes}')`;
        });
        
        sqlScript += insertValues.join(',\n');
        sqlScript += '\nON CONFLICT (name) DO UPDATE SET\n';
        sqlScript += '  process_status = EXCLUDED.process_status,\n';
        sqlScript += '  invitation_status = EXCLUDED.invitation_status,\n';
        sqlScript += '  notes = EXCLUDED.notes,\n';
        sqlScript += '  updated_at = NOW();\n\n';
        sqlScript += `-- Verificar inserción\nSELECT COUNT(*) as total_candidatos FROM candidate_tracking;\n`;
        sqlScript += `SELECT name, process_status, invitation_status FROM candidate_tracking ORDER BY name LIMIT 5;`;
        
        fs.writeFileSync('supabase-insert.sql', sqlScript);
        console.log('✅ SQL generado: supabase-insert.sql');
        
        // 3. Crear CSV para importación manual
        let csvContent = 'name,process_status,invitation_status,notes\n';
        rows.forEach(row => {
            const csvRow = [
                `"${row.name.replace(/"/g, '""')}"`,
                `"${row.process_status.replace(/"/g, '""')}"`,
                `"${row.invitation_status.replace(/"/g, '""')}"`,
                `"${(row.notes || '').replace(/"/g, '""')}"`
            ].join(',');
            csvContent += csvRow + '\n';
        });
        
        fs.writeFileSync('candidates-export.csv', csvContent);
        console.log('✅ CSV generado: candidates-export.csv');
        
        // 4. Mostrar resumen de datos
        console.log('\n📋 RESUMEN DE DATOS:');
        console.log('==================');
        
        const statusCount = {};
        const invitationCount = {};
        
        rows.forEach(row => {
            statusCount[row.process_status] = (statusCount[row.process_status] || 0) + 1;
            invitationCount[row.invitation_status] = (invitationCount[row.invitation_status] || 0) + 1;
        });
        
        console.log('\n📊 Estados del proceso:');
        Object.entries(statusCount).forEach(([status, count]) => {
            console.log(`  ${status}: ${count} candidatos`);
        });
        
        console.log('\n📩 Estados de invitación:');
        Object.entries(invitationCount).forEach(([status, count]) => {
            console.log(`  ${status}: ${count} candidatos`);
        });
        
        console.log('\n📄 ARCHIVOS GENERADOS:');
        console.log('======================');
        console.log('1. candidates-export.json - Datos completos en JSON');
        console.log('2. supabase-insert.sql    - Script SQL para ejecutar en Supabase');
        console.log('3. candidates-export.csv  - CSV para importación manual');
        
        console.log('\n🚀 PRÓXIMOS PASOS:');
        console.log('==================');
        console.log('OPCIÓN 1 - Via SQL (Recomendado):');
        console.log('  1. Ve a: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp/sql');
        console.log('  2. Abre el archivo: supabase-insert.sql');
        console.log('  3. Copia y pega el contenido completo');
        console.log('  4. Haz clic en "Run"');
        
        console.log('\nOPCIÓN 2 - Via CSV:');
        console.log('  1. Ve a: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp/editor');
        console.log('  2. Selecciona la tabla "candidate_tracking"');
        console.log('  3. Haz clic en "Insert" > "Import CSV"');
        console.log('  4. Sube el archivo: candidates-export.csv');
        
        db.close();
    });
}

if (require.main === module) {
    exportCandidatesData();
}

module.exports = { exportCandidatesData };