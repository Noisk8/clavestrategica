-- Script de inserción de candidatos para Supabase
-- Ejecuta este script en: https://supabase.com/dashboard/project/rizlfhgnhtirdpjbaqvp/sql
-- Fecha de exportación: 2025-09-09T04:16:59.373Z

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
INSERT INTO candidate_tracking (name, process_status, invitation_status, notes) VALUES
('Alejandro Jiménez Salazar', 'Pendiente', 'Pendiente', ''),
('Camila Jiménez Sáez', 'Pendiente', 'Pendiente', ''),
('Daniela Eusse Molina', 'Pendiente', 'Pendiente', ''),
('Dina Margarita Linero Ariza', 'No continúa', 'Pendiente', ''),
('Hernando Sánchez', 'Pendiente', 'Pendiente', ''),
('Jose David Tovar Ortiz', 'Pendiente', 'Pendiente', ''),
('Juan Camilo Correa Díaz', 'Pendiente', 'Pendiente', ''),
('Juliana Soto Córdoba', 'Pendiente', 'Pendiente', ''),
('Julián Mazo Zapata', 'Pendiente', 'Pendiente', ''),
('Laura Cristina Henao', 'Pendiente', 'Pendiente', ''),
('Laura Velásquez Hernández', 'Pendiente', 'Pendiente', ''),
('Lina Paola Delgadillo Murcia', 'Pendiente', 'Pendiente', ''),
('Martha Liliana Suárez García', 'Pendiente', 'Pendiente', ''),
('Melissa Zuluaga Soto', 'Pendiente', 'Pendiente', ''),
('Sandra Emilia Arroyave Sampedro', 'Pendiente', 'Pendiente', ''),
('Stefan Quiroga Fajardo', 'Pendiente', 'Pendiente', ''),
('Susana Botero Rendón', 'Pendiente', 'Pendiente', ''),
('Valentina Acosta', 'Pendiente', 'Pendiente', ''),
('Xenia Paola Arellano Tamayo', 'Pendiente', 'Pendiente', ''),
('Ximena Alvarez Castro', 'Pendiente', 'Pendiente', '')
ON CONFLICT (name) DO UPDATE SET
  process_status = EXCLUDED.process_status,
  invitation_status = EXCLUDED.invitation_status,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- Verificar inserción
SELECT COUNT(*) as total_candidatos FROM candidate_tracking;
SELECT name, process_status, invitation_status FROM candidate_tracking ORDER BY name LIMIT 5;