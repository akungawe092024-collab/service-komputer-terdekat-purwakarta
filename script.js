document.addEventListener('DOMContentLoaded', () => {
    // === Ambil Elemen Kunci ===
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const header = document.querySelector('header');
    
    // Fungsi untuk mendapatkan tinggi header dinamis + offset (padding/margin)
    const getHeaderOffset = () => {
         // Tambah 30px offset agar konten tidak tertutup header fixed
         return header ? header.offsetHeight + 30 : 120; 
    };
    
    // Pastikan halaman login terlihat saat pertama kali dimuat
    if (loginContainer) {
        loginContainer.classList.remove('hidden'); 
    }

    // === 1. LOGIKA LOGIN & Transisi ===
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const kelurahanInput = document.getElementById('kelurahan').value.trim();
            
            if (kelurahanInput !== '') { 
                // Sembunyikan container login
                loginContainer.classList.add('hidden');
                
                // Tampilkan konten utama
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    // Tampilkan section 'home' dan 'articles' (bagian dari Beranda)
                    showSection('home'); 
                    
                    // Pastikan link Beranda menjadi aktif
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector('a[href="#home"]').classList.add('active');
                }
                
                // Gulir ke atas halaman setelah login
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
            
            // Gulir ke posisi section dengan offset header fixed
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                 window.scrollTo({
                     top: targetSection.offsetTop - getHeaderOffset(), // Gunakan offset dinamis
                     behavior: 'smooth'
                 });
            }
        });
    });

    // === 3. FUNGSI MENAMPILKAN SECTION & SORTING ARTIKEL ===
    function showSection(id) {
        // Sembunyikan semua section
        contentSections.forEach(section => {
            section.classList.add('hidden');
        });

        // Tampilkan section target
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Logika Khusus: Jika di "Beranda" atau "Artikel", tampilkan bagian "Artikel"
        if (id === 'home' || id === 'articles') {
             const articlesSection = document.getElementById('articles');
             if (articlesSection) {
                 articlesSection.classList.remove('hidden');
                 sortArticlesByDate('ascending'); // Mengurutkan dari Terlama ke Terbaru
             }
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
            
            // Urutan Ascending (Terlama ke Terbaru)
            return order === 'ascending' ? dateA - dateB : dateB - dateA;
        });

        // Hapus elemen lama dan tambahkan yang sudah diurutkan
        articles.forEach(article => articleGrid.appendChild(article));
    }

    // Inisialisasi: Sembunyikan konten utama saat load
    if (mainContent) {
        mainContent.classList.add('hidden');
    }
});