# AÖF Geçiş Kampı

22 Ağustos 2026 AÖF yaz okulu sınavları için hazırlanmış, tarayıcıda çalışan çalışma takip uygulaması.

Güncel sürüm: **v0.7.1** · [Değişiklik günlüğü](CHANGELOG.md)

## Özellikler

- Beş ders ve toplam 40 ünite için çalışma takibi
- Ders bazında ve karışık özgün denemeler
- Yanlış soruları otomatik tekrar listesine ekleme
- Beş dersin 40 ünitesini gösteren ayrı ilerleme haritası
- Her ünitenin başında sınavlık “Bu üniteden mutlaka bil” özeti
- İnkılap Tarihi I'in sekiz ünitesi için ayrıntılı sınav anlatımları
- Açık ve karanlık görünüm seçeneği
- Resmî Anadolu Üniversitesi kaynak bağlantıları
- İlerlemeyi yalnızca kullanıcının tarayıcısında saklama

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
