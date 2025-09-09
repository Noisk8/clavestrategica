// API Service para comunicación con el backend
class ApiService {
    constructor() {
        this.baseUrl = '';
        this.debounceTimer = null;
    }

    // Mostrar/ocultar indicador de carga
    showLoading() {
        document.getElementById('loadingIndicator').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingIndicator').classList.add('hidden');
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const icon = type === 'success' ? '✓' : '⚠';
        
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
        notification.innerHTML = `${icon} ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Obtener todos los candidatos
    async getCandidates() {
        try {
            const response = await fetch(`${this.baseUrl}/api/candidates`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener candidatos:', error);
            this.showNotification('Error al cargar los datos', 'error');
            return {};
        }
    }

    // Actualizar un candidato (con debounce para evitar múltiples requests)
    updateCandidate(name, data) {
        // Limpiar timer anterior
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }

        // Configurar nuevo timer
        this.debounceTimer = setTimeout(async () => {
            try {
                const response = await fetch(`${this.baseUrl}/api/candidates/${encodeURIComponent(name)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Error HTTP: ${response.status}`);
                }

                const result = await response.json();
                this.showNotification('Datos guardados automáticamente');
                
            } catch (error) {
                console.error('Error al actualizar candidato:', error);
                this.showNotification('Error al guardar los cambios', 'error');
            }
        }, 1000); // Esperar 1 segundo después del último cambio
    }

    // Actualización masiva (para importar)
    async bulkUpdateCandidates(candidatesData) {
        try {
            this.showLoading();
            const response = await fetch(`${this.baseUrl}/api/candidates/bulk-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidatesData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            this.showNotification(result.message);
            return true;
            
        } catch (error) {
            console.error('Error en actualización masiva:', error);
            this.showNotification('Error al importar los datos', 'error');
            return false;
        } finally {
            this.hideLoading();
        }
    }

    // Exportar datos
    async exportData() {
        try {
            this.showLoading();
            const response = await fetch(`${this.baseUrl}/api/export`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `candidatos_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.showNotification('Datos exportados exitosamente');
            
        } catch (error) {
            console.error('Error al exportar:', error);
            this.showNotification('Error al exportar los datos', 'error');
        } finally {
            this.hideLoading();
        }
    }
}

// Instancia global del servicio API
const apiService = new ApiService();