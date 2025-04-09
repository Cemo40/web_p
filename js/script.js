// DOM yüklendikten sonra çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Tarih bilgisini güncelle
    updateDate();
    
    // Mobil menü düğmesi işlevselliği
    setupMobileMenu();
    
    // Haber arama işlevselliği
    setupSearch();
    
    // Bülten aboneliği işlevselliği
    setupNewsletter();
    
    // Hava durumu bilgisini güncelle (simüle edilmiş)
    simulateWeather();
});

// Güncel tarihi göster
function updateDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('tr-TR', options);
    }
}

// Mobil menü işlevselliği
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuBtn && mainMenu) {
        menuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            
            // Menü simgesini değiştir
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Haber arama işlevselliği
function setupSearch() {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Normalde bir arama API'si çağrılır, burada simüle ediyoruz
                alert(`"${searchTerm}" için arama sonuçları gösteriliyor...`);
                // Gerçek uygulamada: window.location.href = `arama-sonuclari.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
}

// Bülten aboneliği işlevselliği
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Normalde bir API'ye gönderilir, burada simüle ediyoruz
                alert(`${email} adresiniz bülten listemize eklenmiştir. Teşekkür ederiz!`);
                emailInput.value = '';
            }
        });
    }
}

// Hava durumu simülasyonu (gerçek uygulamada bir hava durumu API'si kullanılır)
function simulateWeather() {
    const weatherElement = document.getElementById('weather-info');
    if (weatherElement) {
        const weatherConditions = [
            '23°C Güneşli',
            '19°C Parçalı Bulutlu',
            '15°C Yağmurlu',
            '21°C Az Bulutlu',
            '26°C Açık'
        ];
        
        // Rastgele bir hava durumu seç
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        weatherElement.textContent = randomWeather;
    }
}

// URL'den parametre alma fonksiyonu (haber detay sayfası için)
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Haber detay sayfası için veri yükleme (eğer detay sayfasındaysak)
if (window.location.pathname.includes('haber-detay.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadNewsDetail();
    });
}

// Haber detaylarını yükleme fonksiyonu
function loadNewsDetail() {
    const newsId = getParameterByName('id');
    
    if (newsId) {
        // Gerçek uygulamada bir API'den veri çekilir
        // Burada örnek veriler kullanıyoruz
        const newsData = getNewsById(newsId);
        
        if (newsData) {
            // Haber başlığını güncelle
            document.title = `${newsData.title} - Mucur Haber`;
            
            // Haber içeriğini DOM'a ekle
            const titleElement = document.querySelector('.news-detail-title');
            const imageElement = document.querySelector('.news-detail-image img');
            const dateElement = document.querySelector('.news-detail-date');
            const contentElement = document.querySelector('.news-detail-content');
            const categoryElement = document.querySelector('.news-detail-category');
            
            if (titleElement) titleElement.textContent = newsData.title;
            if (imageElement) imageElement.src = newsData.image;
            if (dateElement) dateElement.textContent = newsData.date;
            if (contentElement) contentElement.innerHTML = newsData.content;
            if (categoryElement) categoryElement.textContent = newsData.category;
            
            // İlgili haberleri göster
            showRelatedNews(newsData.category, newsId);
        } else {
            // Haber bulunamadıysa
            showNewsNotFound();
        }
    } else {
        // ID parametresi yoksa
        showNewsNotFound();
    }
}

// Haber ID'sine göre haber verisi getir (simüle edilmiş)
function getNewsById(id) {
    // Gerçek uygulamada bu veriler bir API'den gelir
    const newsDatabase = [
        {
            id: '1',
            title: 'Mucur\'da Yeni Kültür Merkezi Açıldı',
            category: 'Gündem',
            date: '12 Haziran 2023',
            image: 'https://picsum.photos/800/500',
            content: `<p>Mucur ilçesinde uzun süredir yapımı devam eden kültür merkezi törenle açıldı. Merkez, ilçe sakinlerine çeşitli kültürel etkinlikler sunacak.</p>
                      <p>Açılış törenine Kırşehir Valisi, Mucur Kaymakamı, Belediye Başkanı ve çok sayıda vatandaş katıldı. Törende konuşan yetkililer, merkezin ilçenin kültürel yaşamına büyük katkı sağlayacağını belirtti.</p>
                      <p>Kültür merkezi içerisinde 300 kişilik çok amaçlı salon, sergi alanları, kütüphane ve çeşitli atölyeler bulunuyor. Merkezde düzenli olarak tiyatro gösterileri, konserler ve söyleşiler düzenlenecek.</p>
                      <p>Belediye Başkanı yaptığı açıklamada, "Uzun zamandır eksikliğini hissettiğimiz bir tesisi ilçemize kazandırmanın mutluluğunu yaşıyoruz. Kültür merkezimiz 7'den 70'e tüm vatandaşlarımıza hizmet verecek" dedi.</p>
                      <p>Kültür merkezinin ilk etkinliği önümüzdeki hafta sonu gerçekleştirilecek olan yerel sanatçılar konseri olacak.</p>`
        },
        {
            id: '2',
            title: 'Mucurspor Yeni Sezona Hazır',
            category: 'Spor',
            date: '11 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=2',
            content: `<p>Bölgesel Amatör Lig'de mücadele eden Mucurspor, yeni sezon hazırlıklarına başladı. Takım, geçtiğimiz sezon yaşanan küme düşme tehlikesini son maçlarda aldığı galibiyetlerle atlattıktan sonra bu sezon daha iddialı bir kadro kurmayı hedefliyor.</p>
                      <p>Teknik direktör Mehmet Yılmaz yönetiminde ilk antrenmanını yapan kırmızı-beyazlı ekip, yoğun bir hazırlık dönemi geçirecek. Takıma 5 yeni transfer yapılması planlanıyor.</p>
                      <p>Kulüp başkanı Ahmet Demir, "Geçen sezon yaşadığımız sıkıntıları geride bıraktık. Bu sezon hedefimiz ligi ilk 5 içinde tamamlamak. Taraftarlarımızın desteğiyle bunu başaracağımıza inanıyorum" dedi.</p>
                      <p>Mucurspor'un ilk hazırlık maçı önümüzdeki hafta komşu il takımlarından biriyle yapılacak.</p>`
        },
        {
            id: '3',
            title: 'Okullar Yaz Tatiline Giriyor',
            category: 'Eğitim',
            date: '10 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=3',
            content: `<p>2022-2023 eğitim öğretim yılı sona eriyor. Mucur'daki tüm okullarda yarın karne dağıtım törenleri yapılacak ve öğrenciler yaz tatiline girecek.</p>
                      <p>İlçe Milli Eğitim Müdürü Hasan Yılmaz, yaptığı açıklamada bu eğitim yılının verimli geçtiğini belirterek, "Öğrencilerimiz karnelerini aldıktan sonra yaklaşık 3 ay sürecek bir tatile başlayacaklar. Bu süreyi iyi değerlendirmelerini tavsiye ediyorum" dedi.</p>
                      <p>Yaz döneminde ilçedeki bazı okullarda çeşitli kurslar ve etkinlikler düzenlenecek. Özellikle Halk Eğitim Merkezi tarafından organize edilen yaz kurslarına kayıtlar önümüzdeki hafta başlayacak.</p>
                      <p>Yeni eğitim öğretim yılının 11 Eylül 2023 tarihinde başlaması planlanıyor.</p>`
        },
        {
            id: '4',
            title: 'Mucur\'da Yeni İş Fırsatları',
            category: 'Ekonomi',
            date: '9 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=4',
            content: `<p>Mucur Organize Sanayi Bölgesi'nde kurulan yeni fabrika, ilçede istihdam fırsatları yaratacak. Tekstil sektöründe faaliyet gösterecek olan fabrika, ilk etapta 200 kişiyi işe alacak.</p>
                      <p>Fabrika yetkilisi İbrahim Kaya, "Üretim hatlarımızı Temmuz ayı içerisinde faaliyete geçirmeyi planlıyoruz. İşe alım sürecimiz başladı, başvurular fabrika yönetim ofisine şahsen yapılabilir" dedi.</p>
                      <p>Mucur Belediye Başkanı da konuyla ilgili yaptığı açıklamada, ilçedeki işsizlik sorununa çözüm olacak bu yatırımın çok değerli olduğunu ve belediye olarak her türlü desteği vereceklerini belirtti.</p>
                      <p>Fabrikada çalışacak personel için servis hizmeti de sağlanacak. Böylece çevre köylerden de fabrikanın istihdam olanaklarından faydalanılabilecek.</p>`
        },
        {
            id: '5',
            title: 'Sağlık Ocağı Yenilendi',
            category: 'Sağlık',
            date: '8 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=5',
            content: `<p>Mucur merkez sağlık ocağı, kapsamlı bir yenileme çalışmasının ardından modern bir görünüme kavuştu. Yenilenen sağlık ocağında hasta kabul alanları genişletildi ve yeni tıbbi cihazlar hizmete sunuldu.</p>
                      <p>İlçe Sağlık Müdürü Dr. Ayşe Demir, "Vatandaşlarımıza daha iyi hizmet verebilmek için sağlık ocağımızı baştan aşağı yeniledik. Artık daha fazla hastaya, daha kaliteli hizmet verebileceğiz" dedi.</p>
                      <p>Yenilenen sağlık ocağında bir diş ünitesi de hizmete girdi. Böylece ilçe sakinleri diş tedavileri için il merkezine gitmek zorunda kalmayacak.</p>
                      <p>Sağlık ocağında ayrıca diyabet ve hipertansiyon hastaları için özel takip programları da başlatıldı.</p>`
        },
        {
            id: '6',
            title: 'Geleneksel Festival Başlıyor',
            category: 'Kültür',
            date: '7 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=6',
            content: `<p>Mucur'un geleneksel yaz festivali bu yıl 15. kez düzenlenecek. 20-22 Haziran tarihleri arasında gerçekleştirilecek festival, renkli etkinliklere ev sahipliği yapacak.</p>
                      <p>Festival komitesi başkanı Mehmet Aydın, "Bu yıl festivalimizi daha geniş bir katılımla gerçekleştirmeyi hedefliyoruz. Çevre il ve ilçelerden misafirlerimizi Mucur'da ağırlamaktan mutluluk duyacağız" dedi.</p>
                      <p>Festival kapsamında konserler, halk oyunları gösterileri, yöresel ürün sergileri ve çeşitli yarışmalar düzenlenecek. Ayrıca bu yıl ilk kez bir fotoğraf yarışması da programa dahil edildi.</p>
                      <p>Festival alanında kurulacak stantlarda yöresel lezzetler de ziyaretçilerle buluşacak. Özellikle Mucur'un meşhur tatlıları festivalde büyük ilgi görüyor.</p>`
        },
        {
            id: '7',
            title: 'İlçeye Ücretsiz Wi-Fi',
            category: 'Teknoloji',
            date: '6 Haziran 2023',
            image: 'https://picsum.photos/800/500?random=7',
            content: `<p>Mucur Belediyesi, ilçe meydanı ve çevresinde ücretsiz internet hizmeti sunmaya başladı. Proje kapsamında meydana ve çevresindeki parklara yerleştirilen Wi-Fi noktaları sayesinde vatandaşlar internete ücretsiz erişebilecek.</p>
                      <p>Belediye Başkanı, "Dijital dönüşüm kapsamında ilçemizde attığımız adımlardan biri de bu oldu. Özellikle gençlerimizin ve öğrencilerimizin faydalanacağı bu hizmeti sunmaktan mutluluk duyuyoruz" dedi.</p>
                      <p>Ücretsiz Wi-Fi hizmetinden yararlanmak için kullanıcıların cep telefonu numaralarıyla basit bir kayıt işlemi yapmaları yeterli olacak. Sistem günlük 2 GB kullanım hakkı sunuyor.</p>
                      <p>Belediye, ilerleyen dönemde ücretsiz internet hizmetini ilçedeki diğer kamusal alanlara da yaymayı planlıyor.</p>`
        }
    ];
    
    return newsDatabase.find(news => news.id === id) || null;
}

// İlgili haberleri gösterme fonksiyonu
function showRelatedNews(category, currentId) {
    // Gerçek uygulamada API'den kategori bazlı haberler çekilir
    // Burada örnek veriler kullanıyoruz
    const relatedNewsContainer = document.querySelector('.related-news-container');
    
    if (relatedNewsContainer) {
        // Tüm haberlerden aynı kategoride olanları filtrele
        const allNews = getAllNews();
        const related = allNews.filter(news => news.category === category && news.id !== currentId);
        
        // En fazla 3 ilgili haber göster
        const newsToShow = related.slice(0, 3);
        
        if (newsToShow.length > 0) {
            let html = '';
            
            newsToShow.forEach(news => {
                html += `
                <article class="news-card">
                    <div class="news-img">
                        <img src="${news.image}" alt="${news.title}">
                    </div>
                    <div class="news-content">
                        <span class="category">${news.category}</span>
                        <h3><a href="haber-detay.html?id=${news.id}">${news.title}</a></h3>
                        <div class="news-meta">
                            <span class="date">${news.date}</span>
                        </div>
                    </div>
                </article>
                `;
            });
            
            relatedNewsContainer.innerHTML = html;
        } else {
            relatedNewsContainer.innerHTML = '<p>Bu kategoride başka haber bulunamadı.</p>';
        }
    }
}

// Tüm haberleri getir (simüle edilmiş)
function getAllNews() {
    // Gerçek uygulamada bu veriler bir API'den gelir
    return [
        {
            id: '1',
            title: 'Mucur\'da Yeni Kültür Merkezi Açıldı',
            category: 'Gündem',
            date: '12 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=1'
        },
        {
            id: '2',
            title: 'Mucurspor Yeni Sezona Hazır',
            category: 'Spor',
            date: '11 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=2'
        },
        {
            id: '3',
            title: 'Okullar Yaz Tatiline Giriyor',
            category: 'Eğitim',
            date: '10 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=3'
        },
        {
            id: '4',
            title: 'Mucur\'da Yeni İş Fırsatları',
            category: 'Ekonomi',
            date: '9 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=4'
        },
        {
            id: '5',
            title: 'Sağlık Ocağı Yenilendi',
            category: 'Sağlık',
            date: '8 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=5'
        },
        {
            id: '6',
            title: 'Geleneksel Festival Başlıyor',
            category: 'Kültür',
            date: '7 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=6'
        },
        {
            id: '7',
            title: 'İlçeye Ücretsiz Wi-Fi',
            category: 'Teknoloji',
            date: '6 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=7'
        },
        {
            id: '8',
            title: 'Mucur Belediyesi\'nden Çevre Temizliği',
            category: 'Gündem',
            date: '5 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=8'
        },
        {
            id: '9',
            title: 'Yerel Sanatçılardan Konser',
            category: 'Kültür',
            date: '4 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=9'
        },
        {
            id: '10',
            title: 'Çiftçilere Destek Ödemeleri Başladı',
            category: 'Ekonomi',
            date: '3 Haziran 2023',
            image: 'https://picsum.photos/400/300?random=10'
        }
    ];
}

// Haber bulunamadı mesajını göster
function showNewsNotFound() {
    const newsDetailContainer = document.querySelector('.news-detail-container');
    
    if (newsDetailContainer) {
        newsDetailContainer.innerHTML = `
        <div class="news-not-found">
            <h2>Haber Bulunamadı</h2>
            <p>Aradığınız haber bulunamadı veya kaldırılmış olabilir.</p>
            <a href="index.html" class="btn">Anasayfaya Dön</a>
        </div>
        `;
    }
}

// Profil sayfası işlevselliği
if (window.location.pathname.includes('profil.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        setupProfilePage();
    });
}

// Profil sayfası kurulumu
function setupProfilePage() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const profileInfo = document.getElementById('profile-info');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Kullanıcı giriş yapmış mı kontrol et
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Kullanıcı giriş yapmışsa profil bilgilerini göster
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'none';
        if (profileInfo) profileInfo.style.display = 'block';
        
        // Kullanıcı bilgilerini göster
        const username = localStorage.getItem('username');
        const userEmail = localStorage.getItem('userEmail');
        
        const usernameElement = document.getElementById('profile-username');
        const emailElement = document.getElementById('profile-email');
        
        if (usernameElement) usernameElement.textContent = username;
        if (emailElement) emailElement.textContent = userEmail;
    } else {
        // Kullanıcı giriş yapmamışsa giriş formunu göster
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (profileInfo) profileInfo.style.display = 'none';
    }
    
    // Giriş formu işlevselliği
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = this.querySelector('input[name="username"]').value.trim();
            const password = this.querySelector('input[name="password"]').value.trim();
            
            // Basit bir doğrulama (gerçek uygulamada API kullanılır)
            if (username && password) {
                // Kullanıcı bilgilerini kaydet
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userEmail', username + '@example.com');
                
                // Sayfayı yenile
                window.location.reload();
            } else {
                alert('Lütfen kullanıcı adı ve şifre girin.');
            }
        });
    }
    
    // Kayıt ol bağlantısı
    const registerLink = document.getElementById('register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'block';
        });
    }
    
    // Giriş yap bağlantısı
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
        });
    }
    
    // Kayıt formu işlevselliği
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = this.querySelector('input[name="reg-username"]').value.trim();
            const email = this.querySelector('input[name="reg-email"]').value.trim();
            const password = this.querySelector('input[name="reg-password"]').value.trim();
            const confirmPassword = this.querySelector('input[name="reg-confirm-password"]').value.trim();
            
            // Basit bir doğrulama
            if (username && email && password) {
                if (password !== confirmPassword) {
                    alert('Şifreler eşleşmiyor.');
                    return;
                }
                
                // Kullanıcı bilgilerini kaydet
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userEmail', email);
                
                // Sayfayı yenile
                window.location.reload();
            } else {
                alert('Lütfen tüm alanları doldurun.');
            }
        });
    }
    
    // Çıkış yap düğmesi
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Kullanıcı bilgilerini temizle
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('userEmail');
            
            // Sayfayı yenile
            window.location.reload();
        });
    }
}