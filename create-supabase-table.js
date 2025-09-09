const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuración de Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan las credenciales de Supabase en el archivo .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
    try {
        console.log('🔧 Creando tabla en Supabase...');
        
        // Crear la tabla usando SQL directo
        const { data, error } = await supabase.rpc('exec_sql', {
            sql: `
                -- Crear tabla si no existe
                CREATE TABLE IF NOT EXISTS candidate_tracking (
                    id SERIAL PRIMARY KEY,
                    name TEXT UNIQUE NOT NULL,
                    process_status TEXT DEFAULT 'Pendiente',
                    invitation_status TEXT DEFAULT 'Pendiente',
                    notes TEXT DEFAULT '',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );

                -- Crear función para actualizar updated_at automáticamente
                CREATE OR REPLACE FUNCTION update_updated_at_column()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = NOW();
                    RETURN NEW;
                END;
                $$ language 'plpgsql';

                -- Crear trigger para actualizar updated_at
                DROP TRIGGER IF EXISTS update_candidate_tracking_updated_at ON candidate_tracking;
                CREATE TRIGGER update_candidate_tracking_updated_at
                    BEFORE UPDATE ON candidate_tracking
                    FOR EACH ROW
                    EXECUTE FUNCTION update_updated_at_column();

                -- Habilitar Row Level Security (RLS)
                ALTER TABLE candidate_tracking ENABLE ROW LEVEL SECURITY;

                -- Crear política para permitir todas las operaciones (puedes restringir después)
                DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON candidate_tracking;
                CREATE POLICY "Enable all operations for authenticated users" ON candidate_tracking
                    FOR ALL USING (true);
            `
        });

        if (error) {
            console.error('❌ Error al crear tabla:', error.message);
            
            // Intentar crear tabla con método alternativo
            console.log('🔄 Intentando método alternativo...');
            
            const { error: createError } = await supabase
                .from('candidate_tracking')
                .select('*')
                .limit(1);
            
            if (createError && createError.code === 'PGRST116') {
                console.log('📝 La tabla no existe. Necesitas crearla manualmente en Supabase.');
                console.log('\n📋 SQL para crear la tabla en Supabase Dashboard:');
                console.log('==========================================');
                console.log(`
CREATE TABLE candidate_tracking (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    process_status TEXT DEFAULT 'Pendiente',
    invitation_status TEXT DEFAULT 'Pendiente',
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_candidate_tracking_updated_at
    BEFORE UPDATE ON candidate_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE candidate_tracking ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir todas las operaciones
CREATE POLICY "Enable all operations for authenticated users" ON candidate_tracking
    FOR ALL USING (true);
                `);
                console.log('==========================================');
                console.log('\n🌐 Ve a: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp/sql');
                console.log('📝 Pega el SQL de arriba y ejecuta');
                return false;
            }
        }

        // Verificar que la tabla existe
        const { data: tableCheck, error: checkError } = await supabase
            .from('candidate_tracking')
            .select('count', { count: 'exact', head: true });

        if (checkError) {
            console.error('❌ Error al verificar tabla:', checkError.message);
            return false;
        }

        console.log('✅ Tabla creada exitosamente en Supabase');
        return true;

    } catch (error) {
        console.error('❌ Error general:', error.message);
        return false;
    }
}

if (require.main === module) {
    createTable().then(success => {
        if (success) {
            console.log('🎉 Tabla lista para usar');
        } else {
            console.log('⚠️  Revisa los pasos manuales arriba');
        }
        process.exit(success ? 0 : 1);
    });
}

module.exports = { createTable };