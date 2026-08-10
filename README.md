# AÖF Geçiş Kampı

22 Ağustos 2026 AÖF yaz okulu sınavları için hazırlanmış, tarayıcıda çalışan çalışma takip uygulaması.

## Özellikler

- Beş ders ve toplam 40 ünite için çalışma takibi
- Ders bazında ve karışık özgün denemeler
- Yanlış soruları otomatik tekrar listesine ekleme
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
