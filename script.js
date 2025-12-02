document.addEventListener('DOMContentLoaded', () => {
    // === Ambil Elemen Kunci ===
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const header = document.querySelector('header');
    
    const getHeaderOffset = () => {
         return header ? header.offsetHeight + 30 : 120;
    };
    
    if (loginContainer) {
        loginContainer.classList.remove('hidden'); 
    }

    // === 1. LOGIKA LOGIN & Transisi ===
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const kelurahanInput = document.getElementById('kelurahan').value.trim();
            
            if (kelurahanInput !== '') { 
                loginContainer.classList.add('hidden');
                
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    showSection('home'); 
                    
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector('a[href="#home"]').classList.add('active');
                }
                
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            } else {
                alert('Mohon masukkan Kelurahan Anda untuk melanjutkan.');
            }
        });
    }

    // === 2. NAVIGASI Halaman (SPA) ===
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                 window.scrollTo({
                     top: targetSection.offsetTop - getHeaderOffset(),
                     behavior: 'smooth'
                 });
            }
        });
    });

    // === 3. FUNGSI MENAMPILKAN SECTION & SORTING ARTIKEL ===
    function showSection(id) {
        contentSections.forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Logika Khusus: Panggil fungsi sorting saat menampilkan artikel
        if (id === 'articles') {
             sortArticlesByDate('ascending'); // Mengurutkan dari Terlama ke Terbaru
        }
    }
    
    // Fungsi Sorting Artikel berdasarkan data-date (Terlama ke Terbaru)
    function sortArticlesByDate(order = 'ascending') {
        const articleGrid = document.querySelector('#articles .article-grid');
        if (!articleGrid) return;
        
        const articles = Array.from(articleGrid.querySelectorAll('.article-item'));

        articles.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            
            return order === 'ascending' ? dateA - dateB : dateB - dateA;
        });

        // Hapus elemen lama dan tambahkan yang sudah diurutkan
        articles.forEach(article => articleGrid.appendChild(article));
    }

    if (mainContent) {
        mainContent.classList.add('hidden');
    }
});