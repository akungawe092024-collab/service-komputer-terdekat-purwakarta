document.addEventListener('DOMContentLoaded', () => {
    // === Ambil Elemen Kunci ===
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Header (untuk menghitung offset saat scrolling)
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight + 20 : 120; // Ambil tinggi header + margin
    
    // Pastikan halaman login terlihat saat pertama kali dimuat
    if (loginContainer) {
        loginContainer.classList.remove('hidden');
    }

    // === 1. LOGIKA LOGIN & Transisi ===
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const kelurahanInput = document.getElementById('kelurahan').value.trim();
            
            // Cek sederhana: Pastikan input tidak kosong
            if (kelurahanInput !== '') { 
                // Sembunyikan container login
                loginContainer.classList.add('hidden');
                
                // Tampilkan konten utama
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    // Tampilkan section 'home' dan 'articles' (bagian dari Beranda)
                    showSection('home');
                    document.getElementById('articles').classList.remove('hidden');
                    
                    // Pastikan link Beranda menjadi aktif
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector('a[href="#home"]').classList.add('active');
                }
                
                // Gulir ke atas halaman setelah login
                window.scrollTo(0, 0); 
                
            } else {
                alert('Mohon masukkan Kelurahan Anda untuk melanjutkan.');
            }
        });
    }

    // === 2. NAVIGASI Halaman (SPA) ===
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Hapus kelas 'active' dari semua link
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Tambahkan kelas 'active' ke link yang diklik
            link.classList.add('active');
            
            // Ambil ID target (e.g., '#profile' -> 'profile')
            const targetId = link.getAttribute('href').substring(1);
            
            // Tampilkan section yang sesuai
            showSection(targetId);
            
            // Gulir ke posisi section dengan offset header fixed
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                 window.scrollTo({
                     top: targetSection.offsetTop - headerHeight,
                     behavior: 'smooth'
                 });
            }
        });
    });

    // Fungsi untuk menampilkan section berdasarkan ID
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
        
        // Logika Khusus: Jika di "Beranda", tampilkan juga bagian "Artikel"
        if (id === 'home') {
             const articlesSection = document.getElementById('articles');
             if (articlesSection) {
                 articlesSection.classList.remove('hidden');
             }
        }
    }
    
    // Inisialisasi: Sembunyikan konten utama saat load, kecuali jika sudah login (walaupun ini akan di-override oleh login logic)
    if (mainContent) {
        mainContent.classList.add('hidden');
    }
});