// Variables globales
let candidatesData = {};
let candidatesTrackingData = {};

// Funciones de filtrado y búsqueda
function filterCandidates() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const professionFilter = document.getElementById('filterProfession').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const cards = document.querySelectorAll('.candidate-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const profession = card.getAttribute('data-profession');
        const processStatus = card.querySelector('.process-status').value;
        const cardText = card.textContent.toLowerCase();

        const matchesSearch = cardText.includes(searchTerm);
        const matchesProfession = !professionFilter || profession === professionFilter;
        const matchesStatus = !statusFilter || processStatus === statusFilter;

        if (matchesSearch && matchesProfession && matchesStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterProfession').value = '';
    document.getElementById('filterStatus').value = '';
    filterCandidates();
}

function updateStatus(selectElement) {
    const status = selectElement.value;
    filterCandidates();
}

function toggleDetails(candidateId) {
    const details = document.getElementById(candidateId + '-details');
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
    } else {
        details.classList.add('hidden');
    }
}

function viewDocument(filename) {
    apiService.showNotification(`Documento: ${filename}`, 'success');
}

// Funciones de gestión de datos
async function saveCandidate(candidateName) {
    const card = document.querySelector(`[data-candidate-name="${candidateName}"]`);
    if (!card) return;

    const processStatus = card.querySelector('.process-status').value;
    const invitationStatus = card.querySelector('.invitation-status').value;
    const notes = card.querySelector('.candidate-notes').value;

    const data = {
        processStatus,
        invitationStatus,
        notes
    };

    // Actualizar datos locales
    candidatesTrackingData[candidateName] = data;

    // Enviar al backend
    apiService.updateCandidate(candidateName, data);
}

async function loadData() {
    try {
        apiService.showLoading();
        candidatesTrackingData = await apiService.getCandidates();
        
        // Aplicar los datos cargados a los campos
        document.querySelectorAll('.candidate-card').forEach(card => {
            const name = card.querySelector('h3').textContent;
            if (candidatesTrackingData[name]) {
                const data = candidatesTrackingData[name];
                card.querySelector('.process-status').value = data.processStatus || 'Pendiente';
                card.querySelector('.invitation-status').value = data.invitationStatus || 'Pendiente';
                card.querySelector('.candidate-notes').value = data.notes || '';
            }
        });
        
        console.log('Datos cargados exitosamente');
    } catch (error) {
        console.error('Error al cargar datos:', error);
    } finally {
        apiService.hideLoading();
    }
}

async function exportData() {
    await apiService.exportData();
}

async function importData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const data = JSON.parse(e.target.result);
                const success = await apiService.bulkUpdateCandidates(data);
                
                if (success) {
                    await loadData(); // Recargar datos después de la importación
                }
            } catch (error) {
                console.error('Error al procesar archivo:', error);
                apiService.showNotification('Archivo JSON inválido', 'error');
            }
        };
        reader.readAsText(file);
    }
    // Limpiar el input
    event.target.value = '';
}

// Función para generar el HTML de un candidato
function generateCandidateHTML(name, staticData) {
    const candidateId = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const extraInfo = staticData.age ? `
        <div class="flex items-center space-x-2">
            <span class="text-gray-500 text-sm">🎂</span>
            <span class="text-sm text-gray-700">${staticData.age}</span>
        </div>` : '';

    return `
        <div class="candidate-card bg-white rounded-xl shadow-lg p-6 card-hover" 
             data-profession="${staticData.profession}" 
             data-candidate-name="${name}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r ${staticData.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${staticData.initials}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${name}</h3>
                        <div class="status-badge bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium inline-block">
                            Documentos OK
                        </div>
                    </div>
                </div>
                <button onclick="toggleDetails('${candidateId}')" class="text-blue-600 hover:text-blue-800 font-medium">
                    Ver detalles
                </button>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Estado del proceso:</label>
                        <select class="process-status editable-field w-full text-sm" onchange="updateStatus(this)">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Continúa">Continúa en proceso</option>
                            <option value="No continúa">No continúa</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Invitación y pruebas:</label>
                        <select class="invitation-status editable-field w-full text-sm">
                            <option value="Pendiente">Pendiente</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Completado">Completado</option>
                            <option value="No aplica">No aplica</option>
                        </select>
                    </div>
                </div>
                <div class="mt-3">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Notas:</label>
                    <textarea class="candidate-notes editable-field w-full text-sm" rows="2" placeholder="Agregar notas sobre el candidato..."></textarea>
                </div>
            </div>

            <div class="space-y-3 mb-4">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-500 text-sm">📚</span>
                    <span class="text-sm text-gray-700">${staticData.education}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-gray-500 text-sm">💼</span>
                    <span class="text-sm text-gray-700">${staticData.experience}</span>
                </div>
                ${extraInfo}
                <div class="flex items-center space-x-2">
                    <span class="text-gray-500 text-sm">📞</span>
                    <span class="text-sm text-gray-700">${staticData.phone}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-gray-500 text-sm">✉️</span>
                    <span class="text-sm text-gray-700">${staticData.email}</span>
                </div>
            </div>

            <div id="${candidateId}-details" class="hidden border-t pt-4 mt-4">
                <h4 class="font-semibold text-gray-800 mb-2">Perfil Profesional:</h4>
                <p class="text-sm text-gray-600 mb-3">${staticData.profile}</p>
                
                <h4 class="font-semibold text-gray-800 mb-2">Experiencia Completa:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    ${staticData.fullExperience.map(exp => `<li>${exp}</li>`).join('')}
                </ul>
                
                <div class="mt-4">
                    <button onclick="viewDocument('${staticData.document}')" 
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        📄 Ver Hoja de Vida
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar todos los candidatos
function renderCandidates() {
    const grid = document.getElementById('candidatesGrid');
    let html = '';

    Object.entries(candidatesStaticData).forEach(([name, staticData]) => {
        html += generateCandidateHTML(name, staticData);
    });

    grid.innerHTML = html;
    
    // Después de renderizar, cargar los datos de seguimiento
    loadData();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar candidatos al cargar la página
    renderCandidates();

    // Event listeners para filtros
    document.getElementById('searchInput').addEventListener('input', filterCandidates);
    document.getElementById('filterProfession').addEventListener('change', filterCandidates);
    document.getElementById('filterStatus').addEventListener('change', filterCandidates);

    // Auto-save cuando se modifican los campos
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('candidate-notes') || 
            e.target.classList.contains('process-status') || 
            e.target.classList.contains('invitation-status')) {
            
            const card = e.target.closest('.candidate-card');
            const candidateName = card.querySelector('h3').textContent;
            saveCandidate(candidateName);
        }
    });

    // Auto-save para textarea (con debounce)
    let textareaTimer;
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('candidate-notes')) {
            clearTimeout(textareaTimer);
            textareaTimer = setTimeout(() => {
                const card = e.target.closest('.candidate-card');
                const candidateName = card.querySelector('h3').textContent;
                saveCandidate(candidateName);
            }, 2000); // 2 segundos después de dejar de escribir
        }
    });
});