// Données simulées pour les vidéos
const sampleVideos = [
    {
        id: 1,
        title: "Mon premier TikTok !",
        thumbnail: "https://via.placeholder.com/300x200",
        views: "125K",
        likes: "12.4K",
        comments: "856",
        shares: "234",
        uploadDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Tutoriel danse facile",
        thumbnail: "https://via.placeholder.com/300x200",
        views: "89K",
        likes: "8.7K",
        comments: "432",
        shares: "156",
        uploadDate: "2024-01-14"
    },
    {
        id: 3,
        title: "Challenge accepté !",
        thumbnail: "https://via.placeholder.com/300x200",
        views: "256K",
        likes: "24.8K",
        comments: "1.2K",
        shares: "567",
        uploadDate: "2024-01-13"
    }
];

// Navigation entre les sections
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.querySelector('a').getAttribute('href').substring(1);
            
            // Mettre à jour la navigation active
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher la section cible
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Charger les vidéos
    loadVideos();
    
    // Initialiser les graphiques
    initializeCharts();
    
    // Gestion de l'upload
    setupUploadModal();
});

function loadVideos() {
    const videoGrid = document.querySelector('.video-grid');
    const videosContainer = document.querySelector('.videos-container');
    
    if (videoGrid) {
        videoGrid.innerHTML = sampleVideos.map(video => `
            <div class="video-card">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-stats">
                        <span><i class="fas fa-eye"></i> ${video.views}</span>
                        <span><i class="fas fa-heart"></i> ${video.likes}</span>
                        <span><i class="fas fa-comment"></i> ${video.comments}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (videosContainer) {
        videosContainer.innerHTML = sampleVideos.map(video => `
            <div class="video-card">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-stats">
                        <span><i class="fas fa-eye"></i> ${video.views} vues</span>
                        <span><i class="fas fa-heart"></i> ${video.likes}</span>
                        <span><i class="fas fa-comment"></i> ${video.comments}</span>
                        <span><i class="fas fa-share"></i> ${video.shares}</span>
                    </div>
                    <div class="video-actions">
                        <button class="btn-secondary"><i class="fas fa-edit"></i> Modifier</button>
                        <button class="btn-secondary"><i class="fas fa-chart-bar"></i> Analytics</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function initializeCharts() {
    // Graphique des vues
    const viewsCtx = document.getElementById('viewsChart').getContext('2d');
    const viewsChart = new Chart(viewsCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
                label: 'Vues',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                borderColor: '#ff0050',
                backgroundColor: 'rgba(255, 0, 80, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Graphique d'engagement
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    const engagementChart = new Chart(engagementCtx, {
        type: 'bar',
        data: {
            labels: ['Likes', 'Commentaires', 'Partages', 'Nouveaux abonnés'],
            datasets: [{
                label: 'Engagement',
                data: [12500, 3200, 1800, 450],
                backgroundColor: [
                    '#ff0050',
                    '#ff4081',
                    '#ff79b0',
                    '#ffb6c1'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function setupUploadModal() {
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeBtn = document.querySelector('.close');
    const uploadArea = document.getElementById('uploadArea');
    const videoFile = document.getElementById('videoFile');
    const videoInfo = document.getElementById('videoInfo');
    const publishBtn = document.getElementById('publishBtn');
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            uploadModal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            uploadModal.style.display = 'none';
            resetUploadForm();
        });
    }
    
    // Fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
            resetUploadForm();
        }
    });
    
    // Gestion de l'upload de fichier
    uploadArea.addEventListener('click', () => {
        videoFile.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ff0050';
        uploadArea.style.backgroundColor = '#f8f9fa';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    
    videoFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    function handleFileSelect(file) {
        if (file.type.startsWith('video/')) {
            // Simuler le traitement de la vidéo
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #4caf50;"></i>
                <p>Fichier sélectionné: ${file.name}</p>
                <p>Taille: ${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            `;
            videoInfo.style.display = 'block';
        } else {
            alert('Veuillez sélectionner un fichier vidéo valide.');
        }
    }
    
    publishBtn.addEventListener('click', () => {
        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        
        if (!title) {
            alert('Veuillez ajouter un titre à votre vidéo.');
            return;
        }
        
        // Simuler la publication
        alert(`Vidéo "${title}" publiée avec succès !`);
        uploadModal.style.display = 'none';
        resetUploadForm();
        
        // Ajouter la nouvelle vidéo à la liste
        const newVideo = {
            id: sampleVideos.length + 1,
            title: title,
            thumbnail: "https://via.placeholder.com/300x200",
            views: "0",
            likes: "0",
            comments: "0",
            shares: "0",
            uploadDate: new Date().toISOString().split('T')[0]
        };
        
        sampleVideos.unshift(newVideo);
        loadVideos();
    });
    
    function resetUploadForm() {
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Glissez-déposez votre vidéo ici ou</p>
            <button class="btn-secondary">Choisir un fichier</button>
        `;
        videoInfo.style.display = 'none';
        document.getElementById('videoTitle').value = '';
        document.getElementById('videoDescription').value = '';
        document.getElementById('videoTags').value = '';
        videoFile.value = '';
    }
}