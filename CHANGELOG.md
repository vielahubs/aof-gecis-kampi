# Değişiklik Günlüğü

Projede yayımlanan önemli değişiklikler bu dosyada sürüm sürüm kaydedilir.

## v1.2.3 - 2026-08-14

### İyileştirildi

- “Denemeyi bitir” eylemi soru paletinden ayrılarak sağ sütunda kendi durum kartına taşındı; düğme metni ve cevaplanan/boş soru bilgileri büyütüldü.

## v1.2.2 - 2026-08-14

### İyileştirildi

- İnkılap Tarihi I, 8. ünitedeki Musul, etabli ve Küçük Ağrı eşleştirmeleri; ilgili ülkeleri, sorunların anlamını ve kısa sonuçlarını açıklayacak biçimde yeniden yazıldı.

## v1.2.1 - 2026-08-13

### İyileştirildi

- Deneme ekranının altındaki “Başa dön / Sonraki soru” düğmesinin yanına, sayfanın başına kaydırmadan kullanılabilen “Denemeden çık” düğmesi eklendi.

## v1.2.0 - 2026-08-13

### Eklendi

- Denemeler sayfasına beş dersin her biri için incelenen üç yaz okulu sınavını ve 60 soruluk kapsamı gösteren Çıkmış Soru Arşivi eklendi.
- Açık soru arşiviyle resmî Anadolu Üniversitesi sınav yayımlama sistemine doğrudan erişim eklendi.

### İyileştirildi

- Ünite kartlarındaki “Cevap” ve “Kısa Cevap” adlandırmaları “Sınav Notu” olarak güncellendi.
- “Soru kalıpları ve kısa cevapları” başlığı “Soru kalıpları ve sınav notları” olarak değiştirildi.

## v1.1.0 - 2026-08-13

### İyileştirildi

- Genel Bakış sayfasında dersler geniş sol alana, günlük çalışma planı daha küçük sağ alana taşındı.

## v1.0.0 - 2026-08-13

### Kararlı sürüm

- Beş ders, 40 ünite, 40 ayrıntılı anlatım, 120 tekrar kartı ve bütün çalışma akışları veri bütünlüğü testleriyle doğrulandı.
- Soru havuzu her derste 10 soru olacak biçimde 50 soruya tamamlandı; daha önce sorusu bulunmayan beş üniteye de doğrudan soru desteği eklendi.
- Denemelerin süre dolmasıyla manuel bitirmenin aynı anda gerçekleşmesi durumunda geçmişe iki kez kaydolmasını önleyen tek sonuçlandırma kilidi eklendi.
- Eski veya bozulmuş yerel kayıtların soru istatistiklerini, tekrar kartlarını, deneme geçmişini ve günlük planı bozması önlendi.
- Çalışma serisinin gün hesabı Türkiye saatine göre ve tarih sınırlarında kararlı çalışacak biçimde düzeltildi.
- Canlı Düello sürüm etiketi güncellendi; oda kodu panoya kopyalanamazsa anlaşılır hata ve elle paylaşılacak kod gösteriliyor.
- GitHub Pages çıktısına favicon ve tarayıcı tema rengi eklendi.
- Canlı Düello ve Supabase bağlantısı ayrı bir JavaScript parçasına bölünerek normal çalışma ekranlarının ilk yükü hafifletildi.
- Otomatik test paketi 5 ders, 40 ünite, 50 soru, 120 kart, cevap aralıkları, kaynak bağlantıları ve içerik eşleşmelerini denetleyecek biçimde genişletildi.

## v0.19.0 - 2026-08-13

### İyileştirildi

- Akıllı tekrar oturumu 15 karttan 40 karta çıkarıldı.
- Beş dersin her birinden sekiz kart gelecek biçimde eşit ders dağılımı sağlandı.
- Her üniteden en az bir sınav kartı seçilerek 40 ünitenin tamamı oturuma dahil edildi.
- Aynı ünitedeki kartlar; önceki “Tekrar et” seçimleri, aktif yanlışlar, düşük doğruluk ve tekrar listesi dikkate alınarak önceliklendirildi.
- Tekrar Merkezi’nde 120 kartlık toplam havuz ve 8×5 dengeli dağılım görünür hâle getirildi.

## v0.18.0 - 2026-08-13

### Eklendi

- Tamamlanan son 50 denemeyi tarih, deneme türü, doğru, yanlış, boş, net ve puan bilgileriyle saklayan Deneme Geçmişi.
- Deneme geçmişinde toplam deneme, ortalama puan ve en iyi puan özeti.
- Ünite tamamlama, deneme çözme, odak oturumu ve tekrar çalışmasını gün bazında izleyen Çalışma Serisi.
- Ana sayfada son yedi günün çalışma durumunu, güncel seriyi ve en uzun seriyi gösteren haftalık şerit.

### İyileştirildi

- Yeni alanlar mevcut cihaz verilerini silmeden geriye uyumlu olarak yerel kayda eklendi.
- Deneme sonuç ekranına geçmişe doğrudan geçiş eklendi.

## v0.17.0 - 2026-08-13

### Eklendi

- Ünite sayfasından başlatılan tarayıcı tabanlı Türkçe Sesli Çalışma modu.
- Ünite başlığı, özet, kritik bilgiler, sınav sinyalleri, ayrıntılı anlatım ve hızlı tekrarı sırayla okuma.
- Sayfalar arasında gezinirken ekranda kalan modern ses oynatıcısı.
- Duraklatma/devam, önceki ve sonraki anlatım bölümü kontrolleri.
- 0.8×, 1×, 1.2×, 1.5× ve 1.8× okuma hızı seçenekleri.
- Uzun anlatımları tarayıcıların güvenle okuyabileceği kısa bölümlere ayırma.

### İyileştirildi

- Ünite yan paneline yeni kategori oluşturmadan “Sesli çalışma” eylemi yerleştirildi.
- Türkçe bir sistem sesi bulunduğunda otomatik olarak tercih edilmesi sağlandı.

## v0.16.0 - 2026-08-13

### Eklendi

- Denemelerde cevaplanan, boş ve işaretlenen soruları gösteren soru paleti.
- Her soruda “Sonra dön” işareti ve paletten istenen soruya geri geçiş.
- Denemeyi bitirmeden önce kalan boş soru sayısını gösteren sonuçlandırma düğmesi.
- Sonuç ekranında boş bırakılan soruları doğru seçenekleri ve açıklamalarıyla inceleme alanı.

### Düzeltildi

- Boş bırakılan soruların yalnızca sayı olarak görünmesi ve hangi sorular olduğunun gösterilmemesi düzeltildi.
- Bir soruya geri dönüldüğünde önceki cevabın kaybolması ve istatistiğin yeniden sayılabilmesi önlendi.
- Süre dolduğunda tüm cevaplanmamış soruların güvenli biçimde boş kaydedilmesi sağlandı.

## v0.15.0 - 2026-08-13

### Eklendi

- Çalış alanındaki Tekrar Merkezi’ne 15 kartlık Akıllı Tekrar Kartları.
- Mevcut sınav soru kalıpları ve kısa cevaplardan oluşturulan 120 kişisel çalışma kartı.
- Cevabı göstermeden önce zihinden hatırlamayı destekleyen çift yüzlü kart akışı.
- Her kart için “Biliyorum” ve “Tekrar et” değerlendirmesi ile cihazda saklanan kart geçmişi.
- Tekrar bekleyen ve güçlü kart sayaçları ile oturum sonu özeti.
- Zorlanılan kartların sonraki kart oturumlarında ve Bugünün Çalışma Planı’nda öne alınması.

### İyileştirildi

- Tekrar Panosu; akıllı kartları, yıldızlanan üniteleri ve kişisel notları birleştiren Tekrar Merkezi’ne dönüştürüldü.

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
