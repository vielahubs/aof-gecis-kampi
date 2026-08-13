# AÖF Geçiş Kampı

22 Ağustos 2026 AÖF yaz okulu sınavları için hazırlanmış, tarayıcıda çalışan çalışma takip uygulaması.

Güncel sürüm: **v1.2.0** · [Değişiklik günlüğü](CHANGELOG.md)

## Özellikler

- Beş ders ve toplam 40 ünite için çalışma takibi
- Beş derse eşit dağıtılmış 50 özgün deneme sorusu ve her ünite için soru desteği
- Son 50 denemenin doğru, yanlış, boş, net ve puan bilgilerini saklayan deneme geçmişi
- Günlük çalışma etkinliğini ve en uzun devamlılığı gösteren çalışma serisi
- 30, 60 ve 120 dakikaya göre öncelikli görevler oluşturan günlük çalışma planı
- 120 kartlık havuzdan her ders ve üniteden eşit dağıtılan 40 kartlık akıllı tekrar oturumları
- Doğru, yanlış ve boş cevapları ünite bazında gösteren zayıflık haritası
- 20 soruluk karma ve ders bazında süreli sınav provaları
- Denemeler içinde her ders için analiz edilen üç yaz okulunu gösteren çıkmış soru arşivi
- Denemede işaretleme, boş soruya geri dönme ve cevap durumlarını gösteren soru paleti
- Sonuç ekranında boş bırakılan soruların doğru cevap ve açıklamalarını inceleme
- Ünite özetini ve anlatımını Türkçe okuyan, hız ve bölüm kontrollü sesli çalışma modu
- Oda koduyla çalışan, iki kişilik gerçek zamanlı Canlı Düello
- Ortak 10 soru, hazır odası, hız puanı ve canlı skor tablosu
- Yanlış soruları otomatik tekrar listesine ekleme
- Beş dersin 40 ünitesini gösteren ayrı ilerleme haritası
- Özetler, kritik bilgiler ve ayrıntılı anlatımların tamamında içerik araması
- Son açılan üniteyi hatırlayan “kaldığın yerden devam et” akışı
- Konu anlatımında önceki ve sonraki üniteye doğrudan geçiş
- Zorlanılan üniteleri kaydetmek için kişisel tekrar panosu
- Her üniteye eklenebilen ve cihazda otomatik saklanan kişisel notlar
- 15, 25 ve 45 dakikalık hazır seçenekleri ve özel süre girişi olan Kronometre
- Tamamlanan oturum ve toplam odak süresi istatistikleri
- Her ünitenin başında sınavlık “Bu üniteden mutlaka bil” özeti
- Beş dersin 40 ünitesi için ayrıntılı sınav anlatımları
- Açık ve karanlık görünüm seçeneği
- Resmî Anadolu Üniversitesi kaynak bağlantıları
- Kişisel ilerlemeyi tarayıcıda, geçici yarışma verilerini güvenli Supabase tablolarında saklama

## Yerel çalıştırma

```bash
npm ci
npm run dev
```

## GitHub Pages

`main` dalına gönderilen her değişiklik GitHub Actions ile statik olarak derlenir ve GitHub Pages'e yayınlanır.

```bash
npm run build:pages
```

## İçerik notu

Ünite adları ve kapsam bilgisi uygulamada bağlantıları verilen resmî Anadolu Üniversitesi kaynaklarıyla kontrol edilmiştir. Özetler ve sorular çalışma amacıyla özgün hazırlanmıştır; resmî çıkmış soru değildir.
