// Modern Script - Mucur Haber

document.addEventListener('DOMContentLoaded', function() {
    // Güncel Tarih
    const currentDate = document.getElementById('current-date');
    if (currentDate) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('tr-TR', options);
    }

    // Mobil Menü Düğmesi
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }

    // Profil Sayfası Sekme Değiştirme
    const profileTabs = document.querySelectorAll('.profile-nav a[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (profileTabs.length > 0 && tabContents.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Aktif sekme sınıfını kaldır
                profileTabs.forEach(t => t.classList.remove('active'));
                
                // Tıklanan sekmeye aktif sınıfı ekle
                this.classList.add('active');
                
                // Tüm içerikleri gizle
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // İlgili içeriği göster
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Giriş/Kayıt Formları Arasında Geçiş
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (registerLink && loginLink && loginForm && registerForm) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
        
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Form Animasyonları
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            // Odaklanma efekti
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Odak kaybı efekti
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // Kaydırma Animasyonu
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Sayfa yüklendiğinde ve kaydırıldığında animasyonları kontrol et
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Sayfa yüklendiğinde de çalıştır

    // Profil Fotoğrafı Önizleme
    const avatarInput = document.getElementById('edit-avatar');
    const avatarPreview = document.querySelector('.profile-avatar');
    
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    // Mevcut içeriği temizle
                    avatarPreview.innerHTML = '';
                    
                    // Yeni resmi ekle
                    const img = document.createElement('img');
                    img.src = reader.result;
                    avatarPreview.appendChild(img);
                });
                
                reader.readAsDataURL(file);
            }
        });
    }
});