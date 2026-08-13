# Değişiklik Günlüğü

Projede yayımlanan önemli değişiklikler bu dosyada sürüm sürüm kaydedilir.

## v0.14.0 - 2026-08-13

### Yenilendi

- Ana gezinme Genel Bakış, Çalış, Denemeler ve İlerleme olmak üzere dört başlığa indirildi.
- Ders listesi ve ikincil araçlar kalabalığı sol menüden kaldırıldı.
- Kronometre, tekrar panosu ve içerik araması Çalış sayfasının içine yerleştirildi.
- Hızlı deneme, yanlışlar ve Canlı Düello Denemeler sayfasında bir araya getirildi.
- Ünite haritası, zayıflık haritası ve kaynak kontrolü İlerleme alanında toplandı.
- Masaüstü sol menüsü ve mobil üst menü daha modern aktif durumlar, sade boşluklar ve dört seçenekli düzenle yenilendi.
- Sayfa içi araç geçişleri kaydırılabilir, yapışkan ve mobil uyumlu alt menüye dönüştürüldü.

## v0.13.0 - 2026-08-13

### Eklendi

- 30, 60 veya 120 dakikaya göre eksik üniteleri, yanlışları, tekrar listesini ve düşük başarı alanlarını önceliklendiren Bugünün Çalışma Planı.
- Günlük görevleri tamamlandı işaretleme, günlük ilerleme yüzdesi ve planı yeniden oluşturma.
- Doğru, yanlış ve boş cevapları ünite bazında ölçen; ders ve ünite düzeyinde renkli sonuç gösteren Zayıflık Haritası.
- 5 dersten 20 soruluk 30 dakikalık karma sınav provası ve her ders için ayrı süreli deneme.
- Süre dolunca kalan soruları boş sayan otomatik deneme tamamlama ve sonuçların zayıflık haritasına aktarılması.

### İyileştirildi

- Ana sayfadaki çalışma rotası yeni günlük planla birleştirildi.
- Üst çubuktaki “Odak” adı “Kronometre” olarak düzeltildi.
- Mevcut cihaz verileri korunurken ayrıntılı soru istatistikleri için geriye uyumlu veri geçişi eklendi.

## v0.12.0 - 2026-08-13

### Eklendi

- Kronometre mini penceresine 15, 25 ve 45 dakikalık hızlı süre seçenekleri.
- Ana ekrandan ve mini pencereden 5–120 dakika arasında özel süre belirleme.

### İyileştirildi

- Odak Sayacı adlandırması Kronometre olarak sadeleştirildi.
- Her zaman üstte kalan mini pencere, süre seçimleri ve kontroller için genişletildi.

## v0.11.0 - 2026-08-11

### Eklendi

- Oda koduyla arkadaş davet etmeyi sağlayan iki kişilik Canlı Düello.
- Hesap açmadan kullanılan anonim oyuncu oturumları ve hazır odası.
- İki oyuncuya aynı sırayla yöneltilen 10 soruluk yarışma akışı.
- Doğru cevap ve ilk 20 saniyedeki cevap hızını birlikte değerlendiren puanlama.
- Her soruda anlık cevap durumu, canlı skor tablosu ve final sıralaması.

### Altyapı

- Yarışma odaları, oyuncular ve cevaplar Supabase Realtime ile eşzamanlandı.
- Yarışma tablolarına kullanıcı ve oda üyeliği temelli satır güvenliği uygulandı.
- GitHub Pages sürümüne Supabase istemci bağlantısı eklendi.

### Düzeltildi

- Oyuncuların bekleme odasına katılmasını engelleyen ekleme ve aynı istek içinde geri okuma RLS kontrolleri düzeltildi.
- Bir yarışma odası en fazla iki oyuncu kabul edecek biçimde veritabanı seviyesinde sınırlandı.

## v0.10.0 - 2026-08-11

### Eklendi

- 15, 25 ve 45 dakikalık çalışma seçenekleri sunan Odak Sayacı.
- Çalışırken başka ünite sayfalarına geçildiğinde de devam eden sayaç göstergesi.
- Tamamlanan oturum sayısı ve toplam odak süresinin cihazda saklanması.
- Son çalışılan üniteye Odak Sayacı ekranından doğrudan dönme.

### İyileştirildi

- Mobil ana menü, yeni çalışma araçlarını daha rahat göstermek için iki satırlı düzene geçirildi.
- Önceki sürümlerdeki ilerleme, not ve tekrar listesi verilerini koruyan yerel veri geçişi genişletildi.

## v0.9.0 - 2026-08-11

### Eklendi

- Üniteleri yıldızlayarak sınav öncesi tekrar listesine ekleme.
- Her üniteye 1200 karaktere kadar kişisel çalışma notu yazma ve otomatik kaydetme.
- Yıldızlanan ve not eklenen üniteleri tek ekranda birleştiren Tekrar Panosu.

### İyileştirildi

- Önceki sürümlerde kaydedilmiş ilerleme ve yanlış verilerini koruyan güvenli yerel veri geçişi.
- Tekrar listesi, not alanı ve mobil menü için açık/karanlık tema uyumu.

## v0.8.0 - 2026-08-11

### Eklendi

- Kırk ünitenin özetlerini, kritik bilgilerini, sınav sinyallerini ve ayrıntılı anlatımlarını birlikte tarayan içerik araması.
- Son açılan üniteyi cihazda hatırlayan “Kaldığın yerden devam et” alanı.
- Konu anlatımlarının sonunda önceki ve sonraki üniteye doğrudan geçiş.

### İyileştirildi

- Günlük plandaki ana eylem, ders sayfası yerine doğrudan sıradaki üniteyi açacak biçimde düzeltildi.
- Yeni arama ve gezinme bileşenleri mobil görünüm ve karanlık temayla uyumlu hâle getirildi.

## v0.7.1 - 2026-08-11

### Düzeltilenler

- Kod denetimini durduran kaçışsız metin karakteri düzeltildi.
- Üretilmiş derleme dosyalarının kaynak kod denetimine yanlışlıkla katılması önlendi.
- Cloudflare Worker ve veritabanı bağlayıcılarının TypeScript tip denetimi düzeltildi.
- Test komutu; kod denetimi, tip kontrolü, üretim derlemesi ve HTML testini birlikte çalıştıracak biçimde güçlendirildi.

## v0.7.0 - 2026-08-11

### Eklendi

- İçerik Yönetim Sistemleri, İnternet Tabanlı Programlama ve Ağ Yönetimi ve Bilgi Güvenliği derslerinin sekiz ünitesine ayrıntılı çalışma anlatımları.
- Her ünite için temel kavram ayrımları, mimari/akış açıklamaları, sık karıştırılan terimler ve soru ipuçları.

## v0.6.0 - 2026-08-11

### Eklendi

- Atatürk İlkeleri ve İnkılap Tarihi II dersinin sekiz ünitesine ayrıntılı, başlıklara ayrılmış sınav anlatımları.
- İnkılaplar, Atatürk ilkeleri, II. Dünya Savaşı, Demokrat Parti, darbeler, Özal yılları, koalisyonlar ve 2002–2018 dönemi için kronoloji, kavram ayrımı ve soru ipuçları.
- Yaz okulu soru örneklerinde görülen kurum, kanun, olay ve dönem eşleştirmelerini destekleyen çalışma bağlamı.

### Düzeltilenler

- Derleme yardımcıları, çalıştırma izni korunmayan ortamlarda da Bash üzerinden güvenle çalışacak biçimde düzenlendi.

## v0.5.0 - 2026-08-10

### Eklendi

- Atatürk İlkeleri ve İnkılap Tarihi I dersinin sekiz ünitesine ayrıntılı, başlıklara ayrılmış sınav anlatımları.
- Olayların kronolojisini, neden–sonuç ilişkilerini ve sık karıştırılan kavramları açıklayan çalışma metinleri.
- Uzun anlatımlar için mobil ve karanlık modla uyumlu okunabilir bölüm kartları.

## v0.4.0 - 2026-08-10

### Eklendi

- Kırk ünitenin her birine “Bu üniteden mutlaka bil” hızlı çalışma alanı.
- Kritik bilgiler, soru anahtarları, sık kullanılan soru kalıpları ve karıştırılan kavramların tek bölümde gösterilmesi.
- İki dakikalık tekrar kancası ve varsa doğrudan ünite sorusuna geçiş.

## v0.3.0 - 2026-08-10

### Eklendi

- Genel Bakış'tan ayrı, beş dersin 40 ünitesini birlikte gösteren İlerleme Haritası.
- Harita üzerinden üniteye doğrudan geçme ve tamamlanma durumunu değiştirme.
- Ders ve genel toplam için görsel ilerleme göstergeleri.

## v0.2.0 - 2026-08-10

### Eklendi

- Üst menüden değiştirilebilen açık ve karanlık görünüm.
- Tema tercihinin tarayıcıda saklanması.
- İlk açılışta cihazın görünüm tercihinin algılanması.
- Çıkmış soru eğilimlerinden yararlanan anahtar kelime odaklı konu anlatımları.

### İyileştirildi

- Karanlık görünümde kartlar, sorular, doğru-yanlış geri bildirimleri ve kaynak alanlarının okunabilirliği.

## v0.1.0 - 2026-08-10

### Eklendi

- Beş ders ve toplam 40 ünite için çalışma takibi.
- Ders bazında ve karışık özgün denemeler.
- Yanlış soruları otomatik tekrar listesine ekleme.
- İlerlemenin tarayıcıda saklanması.
- Resmî Anadolu Üniversitesi kaynak bağlantıları.
- GitHub Pages üzerinden otomatik yayınlama.
