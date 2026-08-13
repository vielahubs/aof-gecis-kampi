export type Unit = {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  keywords: string[];
};

export type Course = {
  code: string;
  short: string;
  title: string;
  color: string;
  source: string;
  bookSource?: string;
  archiveSource: string;
  archivePeriods: string;
  verification: string;
  units: Unit[];
};

export type Question = {
  id: string;
  course: string;
  unit: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const u = (course: string, number: number, title: string, summary: string, keyPoints: string[], keywords: string[]): Unit => ({
  id: `${course}-${number}`,
  title,
  summary,
  keyPoints,
  keywords,
});

export const courses: Course[] = [
  {
    code: "TAR201U",
    short: "İnkılap I",
    title: "Atatürk İlkeleri ve İnkılap Tarihi I",
    color: "#ef6c5b",
    source: "https://www.anadolu.edu.tr/akademik/fakulteler/ders/246067/ataturk-ilkeleri-ve-inkilap-tarihi-i/ders-icerik",
    bookSource: "https://kitapsatis1.anadolu.edu.tr/100019-ataturk-ilkeleri-ve-inkilap-tarihi-i.html",
    archiveSource: "https://aofsoru.com/tar201u-ataturk-ilkeleri-ve-inkilap-tarihi-1-dersi-sinav-sorulari",
    archivePeriods: "2022–2023, 2023–2024 ve 2024–2025 yaz okulu",
    verification: "8 ünite başlığı resmî Anadolu ders içeriği ve güncel kitap sayfasıyla doğrulandı.",
    units: [
      u("TAR201U", 1, "Türk İnkılabını Hazırlayan Sebepler: 19. ve 20. Yüzyıllarda Osmanlı Devletine Genel Bakış", "Osmanlı Devleti'nin son dönemindeki askerî, siyasi, ekonomik ve toplumsal sorunlar; reform arayışları ve milliyetçilik hareketleri Türk İnkılabı'nın tarihsel zeminini oluşturdu.", ["Tanzimat Fermanı: 1839", "Islahat Fermanı: 1856", "I. Meşrutiyet ve Kanun-ı Esasi: 1876"], ["Tanzimat", "meşrutiyet", "Kanun-ı Esasi"]),
      u("TAR201U", 2, "Yeni Bir İktidar, Yıkıcı ve Yıpratıcı Savaşlar Dönemi", "II. Meşrutiyet, İttihat ve Terakki iktidarı, Trablusgarp ve Balkan Savaşları ile Birinci Dünya Savaşı Osmanlı Devleti'nin son yıllarını belirledi.", ["II. Meşrutiyet: 1908", "Uşi Antlaşması Trablusgarp Savaşı'nı bitirdi", "Mondros Ateşkesi: 30 Ekim 1918"], ["İttihat ve Terakki", "Balkan Savaşları", "Mondros"]),
      u("TAR201U", 3, "Millî Mücadele Başlıyor: Haksız İşgaller Karşısında Türk Milleti ve Mustafa Kemal Paşa", "Mondros sonrasındaki işgaller ve cemiyetler, Mustafa Kemal Paşa'nın Samsun'a çıkışı, genelgeler ve kongreler Millî Mücadele'nin örgütlenme sürecini oluşturdu.", ["Samsun: 19 Mayıs 1919", "Amasya Genelgesi millî iradeyi vurguladı", "Sivas'ta millî cemiyetler birleştirildi"], ["Mondros", "Samsun", "Amasya", "Sivas"]),
      u("TAR201U", 4, "Yeni Türk Devleti'nin Kuruluşu", "Misak-ı Millî'nin kabulü, İstanbul'un işgali, TBMM'nin açılması ve 1921 Anayasası millî egemenliğe dayalı yeni devletin siyasi-hukuki temelini kurdu.", ["Misak-ı Millî: millî sınırlar ve tam bağımsızlık", "TBMM: 23 Nisan 1920", "1921 Anayasası: Egemenlik kayıtsız şartsız milletindir"], ["Misak-ı Millî", "TBMM", "1921 Anayasası"]),
      u("TAR201U", 5, "Türk İstiklal Harbi: Ya İstiklal Ya Ölüm", "Doğu, Güney ve Batı cephelerindeki mücadele; düzenli ordunun kurulması, İnönü savaşları, Sakarya ve Büyük Taarruz ile askerî zafere ulaştı.", ["Gümrü TBMM'nin ilk uluslararası antlaşmasıdır", "Sakarya'dan sonra Mustafa Kemal'e mareşal ve gazi unvanı verildi", "Büyük Taarruz 26 Ağustos 1922'de başladı"], ["İnönü", "Sakarya", "Büyük Taarruz", "Gümrü"]),
      u("TAR201U", 6, "Bir Uzlaşı Belgesi Olarak Türkiye Cumhuriyeti Devleti'nin Kuruluş Belgesi: Lozan Barış Antlaşması", "Mudanya Ateşkesi silahlı mücadeleyi sona erdirdi. Lozan görüşmeleri sınırlar, kapitülasyonlar, azınlıklar, borçlar ve Boğazlar gibi başlıklarda yeni devletin uluslararası statüsünü belirledi.", ["Mudanya ile Doğu Trakya savaşılmadan alındı", "Saltanat 1 Kasım 1922'de kaldırıldı", "Lozan Barış Antlaşması: 24 Temmuz 1923"], ["Mudanya", "Lozan", "kapitülasyonlar"]),
      u("TAR201U", 7, "Atatürk Dönemi'nde İç Politikada Yaşananlar", "Cumhuriyetin ilanı, halifeliğin kaldırılması, 1924 Anayasası, çok partili hayata geçiş denemeleri ve rejime yönelik gelişmeler dönemin iç siyasetini şekillendirdi.", ["Cumhuriyet: 29 Ekim 1923", "Halifelik: 3 Mart 1924'te kaldırıldı", "Terakkiperver ve Serbest Cumhuriyet Fırkaları çok partili hayat denemeleridir"], ["Cumhuriyet", "halifelik", "çok partili hayat"]),
      u("TAR201U", 8, "Atatürk Dönemi Türk Dış Politikası (1923-1938)", "Tam bağımsızlık ve barış ilkeleri doğrultusunda Musul, nüfus mübadelesi ve Boğazlar gibi sorunlar ele alındı; Milletler Cemiyeti, Balkan Antantı ve Sadabat Paktı ile bölgesel iş birliği geliştirildi.", ["Türkiye 1932'de Milletler Cemiyeti'ne katıldı", "Montrö ile Boğazlarda Türkiye'nin egemenliği güçlendi", "Hatay 1939'da Türkiye'ye katıldı; süreç Atatürk döneminde başlatıldı"], ["Montrö", "Balkan Antantı", "Musul", "Hatay"]),
    ],
  },
  {
    code: "TAR202U",
    short: "İnkılap II",
    title: "Atatürk İlkeleri ve İnkılap Tarihi II",
    color: "#f39c55",
    source: "https://www.anadolu.edu.tr/akademik/fakulteler/ders/200412/ataturk-ilkeleri-ve-inkilap-tarihi-ii/ders-icerik",
    bookSource: "https://kitapsatis1.anadolu.edu.tr/100363-ataturk-ilkeleri-ve-inkilap-tarihi-ii.html",
    archiveSource: "https://aofsoru.com/tar202u-ataturk-ilkeleri-ve-inkilap-tarihi-2-dersi-sinav-sorulari",
    archivePeriods: "2022–2023, 2023–2024 ve 2024–2025 yaz okulu",
    verification: "8 ünite başlığı resmî Anadolu ders içeriği ve güncel kitap sayfasıyla doğrulandı.",
    units: [
      u("TAR202U", 1, "Türk İnkılabı ve İnkılap Hareketleri", "Türk İnkılabı'nın siyasal, hukuk, eğitim-kültür, toplumsal ve ekonomik alanlardaki düzenlemeleri yeni devletin çağdaşlaşma sürecini oluşturdu.", ["Saltanat 1 Kasım 1922'de, halifelik 3 Mart 1924'te kaldırıldı", "Tevhid-i Tedrisat eğitimde birliği sağladı", "Medeni Kanun, Harf İnkılabı ve ekonomik düzenlemeler birlikte değerlendirilir"], ["inkılap", "Tevhid-i Tedrisat", "Medeni Kanun", "Harf İnkılabı"]),
      u("TAR202U", 2, "Bir Devlet Kurucusu Olarak Mustafa Kemal Atatürk'ün Hayatı ve İlkeleri", "Mustafa Kemal Atatürk'ün yetişme dönemi, askerî ve siyasi hayatı ile cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik, laiklik ve inkılapçılık ilkeleri birlikte ele alınır.", ["Cumhuriyetçilik millî egemenliği esas alır", "Halkçılık kanun önünde eşitliği savunur", "İnkılapçılık yeniliklerin korunması ve sürdürülmesidir"], ["Atatürk", "altı ilke", "millî egemenlik", "laiklik"]),
      u("TAR202U", 3, "İsmet İnönü Dönemi (1939-1950)", "Türkiye II. Dünya Savaşı sırasında denge politikası izledi. Savaş koşullarının ekonomi ve toplum üzerindeki etkileri ile çok partili siyasi hayata geçiş bu dönemin temel başlıklarıdır.", ["Millî Korunma Kanunu ve Varlık Vergisi savaş koşullarının ürünüdür", "Türkiye 1945'te Birleşmiş Milletler'in kurucu üyeleri arasına girdi", "İlk çok partili genel seçim: 1946"], ["II. Dünya Savaşı", "İnönü", "çok partili hayat"]),
      u("TAR202U", 4, "Türkiye'nin Demokrat Partili Yılları (1950-1960)", "1950 seçimleriyle iktidarın demokratik yolla el değiştirmesi, Demokrat Parti'nin iç ve dış politikaları, ekonomik gelişmeler ve 27 Mayıs 1960'a giden süreç incelenir.", ["Demokrat Parti 1950 seçimlerini kazandı", "Türkiye 1952'de NATO'ya katıldı", "Dönem 27 Mayıs 1960 askerî müdahalesiyle sona erdi"], ["Demokrat Parti", "1950 seçimleri", "NATO", "27 Mayıs"]),
      u("TAR202U", 5, "Darbelerin Gölgesinde Yoluna Devam Eden Türkiye (1960-1980)", "27 Mayıs sonrası 1961 Anayasası, koalisyon hükûmetleri, 12 Mart 1971 Muhtırası, toplumsal-siyasi kutuplaşma ve 12 Eylül 1980'e uzanan süreç ele alınır.", ["1961 Anayasası 27 Mayıs sonrasında hazırlandı", "12 Mart 1971 bir muhtıradır", "Siyasi istikrarsızlık ve şiddet ortamı 1980'e kadar arttı"], ["1961 Anayasası", "12 Mart", "koalisyon", "12 Eylül"]),
      u("TAR202U", 6, "Türkiye Cumhuriyeti Siyasi Hayatında Özallı Yıllar (1980-1991)", "12 Eylül sonrasındaki yeniden yapılanma, 1982 Anayasası, 1983 seçimleri ve Turgut Özal döneminin dışa açık ekonomi politikaları bu ünitenin merkezindedir.", ["1982 Anayasası halkoyuyla kabul edildi", "Anavatan Partisi 1983 seçimlerini kazandı", "24 Ocak kararları ekonomik dönüşümün temel referansıdır"], ["1982 Anayasası", "Özal", "ANAP", "24 Ocak kararları"]),
      u("TAR202U", 7, "Türkiye'de Koalisyonlar ve Krizler Dönemi (1991-2002)", "1990'larda koalisyon hükûmetleri, ekonomik krizler, 28 Şubat süreci ve 2001 krizi Türkiye'nin siyasal ve ekonomik gündemini belirledi.", ["1991 sonrasında koalisyonlar ağırlık kazandı", "28 Şubat süreci: 1997", "2001 ekonomik krizi dönemin önemli kırılma noktasıdır"], ["koalisyon", "28 Şubat", "2001 krizi"]),
      u("TAR202U", 8, "Adalet ve Kalkınma Partisi (AK Parti) Döneminde Türkiye (2002-2018)", "2002 seçimleri sonrasında siyasal iktidar, Avrupa Birliği reformları, ekonomik ve toplumsal gelişmeler, dış politika, 15 Temmuz 2016 darbe girişimi ve 2017 anayasa değişikliği ders kitabının kapsadığı 2018'e kadar ele alınır.", ["AK Parti 2002 seçimleriyle tek başına iktidara geldi", "15 Temmuz 2016 darbe girişimi dönemin önemli kırılma noktasıdır", "2017 anayasa değişikliği halkoyuna sunuldu"], ["2002 seçimleri", "AB reformları", "15 Temmuz", "2017 referandumu"]),
    ],
  },
  {
    code: "WTK201U",
    short: "İYS",
    title: "İçerik Yönetim Sistemleri",
    color: "#6b8afd",
    source: "https://www.anadolu.edu.tr/akademik/fakulteler/ders/148851/icerik-yonetim-sistemleri/ders-icerik",
    bookSource: "https://kitapsatis1.anadolu.edu.tr/de/100146-icerik-yonetim-sistemleri.html",
    archiveSource: "https://aofsoru.com/wtk201u-icerik-yonetim-sistemleri-dersi-sinav-sorulari",
    archivePeriods: "2021–2022, 2022–2023 ve 2023–2024 yaz okulu",
    verification: "8 ünite başlığı resmî Anadolu ders içeriği ve kitap sayfasıyla doğrulandı.",
    units: [
      u("WTK201U", 1, "İYS'de Temel Kavramlar", "İçerik yönetim sistemi; dijital içeriği oluşturma, düzenleme, depolama, yayınlama ve paylaşma süreçlerini kullanıcı dostu bir arayüzle yönetir. İçerik yönetimi ile içerik sunumu farklı bileşenlerdir.", ["Dijital içerik metin, ses, görüntü ve belge olabilir", "Temel işlevler: kataloglama, format yönetimi, düzeltme takibi, yayınlama", "İYS, içerik yönetim çatısından daha az teknik bilgi ister"], ["İYS", "dijital içerik", "iş akışı", "yayınlama"]),
      u("WTK201U", 2, "İçerik Yönetim Sistemleriyle Çalışmak", "İYS kurulumu; gereksinim analizi, sunucu-veritabanı hazırlığı, kullanıcı ve rol tanımları, tema ve eklenti yapılandırması aşamalarını içerir. Güvenlik, yedekleme ve güncelleme süreklidir.", ["Yönetici, editör, yazar ve ziyaretçi rolleri farklı yetkilere sahiptir", "Tema görünümü; eklenti işlevi genişletir", "Güncelleme öncesinde yedek alınmalıdır"], ["rol", "tema", "eklenti", "yedekleme"]),
      u("WTK201U", 3, "WordPress", "WordPress PHP ve MySQL/MariaDB tabanlı, açık kaynak bir İYS'dir. Yazı, sayfa, kategori, etiket, tema, eklenti ve bileşen mantığıyla çalışır.", ["Yazılar zamana bağlı; sayfalar daha kalıcı içeriklerdir", "Kategori hiyerarşik, etiket daha serbest sınıflandırmadır", "Kalıcı bağlantılar URL yapısını belirler"], ["WordPress", "yazı", "sayfa", "kategori", "eklenti"]),
      u("WTK201U", 4, "Joomla İçerik Yönetim Sistemleri", "Joomla açık kaynaklı ve PHP tabanlı bir İYS'dir. İçerikler makale, kategori ve menü öğeleriyle düzenlenir. Bileşen, modül ve eklenti uzantı türleri farklı görevler üstlenir.", ["Bileşen sayfanın ana işlevini yürütür", "Modül sayfanın çevresel bloklarında görünür", "Menü öğesi içerik ve bileşenlere bağlantı kurar"], ["Joomla", "bileşen", "modül", "menü"]),
      u("WTK201U", 5, "Drupal", "Drupal; içerik türleri, alanlar, görünümler, taksonomi ve modüllerle esnek yapılar kurmaya yarayan açık kaynak bir İYS'dir. Ayrıntılı kullanıcı yetkilendirmesi ve yapılandırılabilir içerik modeli güçlü yanıdır.", ["Node, Drupal'daki temel içerik birimidir", "Taksonomi içerikleri sınıflandırır", "View içeriklerin sorgulanıp farklı biçimlerde gösterilmesini sağlar"], ["Drupal", "node", "taksonomi", "view"]),
      u("WTK201U", 6, "CraftCMS", "CraftCMS esnek içerik modellemesine ve geliştirici odaklı şablonlara önem verir. Bölümler, girişler, alanlar ve varlıklar üzerinden özel içerik yapıları oluşturulur.", ["Alanlar içerik veri yapısını tanımlar", "Entry bir içerik kaydıdır", "Twig şablon dili sunum katmanında kullanılır"], ["CraftCMS", "entry", "field", "Twig"]),
      u("WTK201U", 7, "DotNetNuke (DNN)", "DNN, Microsoft .NET tabanlı bir içerik yönetim platformudur. IIS üzerinde çalışır; sayfa, modül, skin/tema, kullanıcı rolü ve portal kavramlarıyla yapılandırılır.", ["DNN, .NET ve IIS ekosistemiyle ilişkilidir", "Modüller sayfalara işlev ekler", "Rol tabanlı güvenlik içerik erişimini sınırlar"], ["DNN", ".NET", "IIS", "modül"]),
      u("WTK201U", 8, "Uygulamada İçerik Yönetim Sistemleri", "Doğru İYS seçimi; kurum hedefleri, hedef kitle, bütçe, teknik ekip, destek, güvenlik, ölçeklenebilirlik ve çoklu dil gibi ihtiyaçların analizine dayanır. En pahalı ya da en özellikli sistem her zaman en uygun sistem değildir.", ["Önce ihtiyaç ve başarı ölçütü tanımlanır", "Toplam sahip olma maliyeti değerlendirilir", "Aracı kurumun vizyonu ve destek kapasitesi önemlidir"], ["gereksinim analizi", "TCO", "ölçeklenebilirlik", "destek"]),
    ],
  },
  {
    code: "WTK210U",
    short: "İnternet Prog.",
    title: "İnternet Tabanlı Programlama",
    color: "#35b89b",
    source: "https://www.anadolu.edu.tr/akademik/fakulteler/ders/148860/internet-tabanli-programlama/ders-icerik",
    bookSource: "https://kitapsatis1.anadolu.edu.tr/100568-internet-tabanli-programlama.html",
    archiveSource: "https://aofsoru.com/wtk210u-internet-tabanli-programlama-dersi-sinav-sorulari",
    archivePeriods: "2022–2023, 2023–2024 ve 2024–2025 yaz okulu",
    verification: "8 ünite başlığı resmî Anadolu ders içeriği ve kitap sayfasıyla doğrulandı.",
    units: [
      u("WTK210U", 1, "İnternet Tabanlı Programlamanın Temelleri", "Web uygulamaları istemci, sunucu, HTTP, tarayıcı, alan adı ve barındırma bileşenleriyle çalışır. Statik sayfalar hazır içeriği sunarken dinamik sayfalar isteğe ve veriye göre üretilir.", ["HTML içerik yapısını, CSS görünümü düzenler", "İstemci tarafı kod tarayıcıda; sunucu tarafı kod sunucuda çalışır", "MVC veri, görünüm ve denetimi ayırır"], ["istemci", "sunucu", "HTTP", "statik", "dinamik"]),
      u("WTK210U", 2, "PHP'ye Giriş", "PHP sunucu tarafında çalışan bir betik dilidir. Kod blokları <?php ... ?> içinde yazılır; değişkenler $ işaretiyle başlar. PHP destekli sunucu ve doğru yapılandırma gerekir.", ["PHP kodu tarayıcıya çalıştırılmış çıktı olarak gönderilir", "Değişken adları $ ile başlar", "Sabitler define() veya const ile tanımlanabilir"], ["PHP", "sunucu tarafı", "değişken", "sabit"]),
      u("WTK210U", 3, "PHP ile Dinamik Web Kodlama", "Diziler, HTML formları, koşullar, döngüler, fonksiyonlar, sınıflar ve veritabanı işlemleri PHP ile dinamik uygulamaların temelini oluşturur. Dersin haftalık içeriğinde Laravel de bu üniteyle bağlantılıdır.", ["GET veriyi URL'de; POST istek gövdesinde taşır", "foreach diziler üzerinde dolaşır", "PDO veritabanına güvenli erişim için kullanılabilir"], ["form", "GET", "POST", "PDO", "Laravel"]),
      u("WTK210U", 4, "JavaScript", "JavaScript tarayıcıda etkileşim ve dinamik davranış sağlar. DOM üzerinden HTML elemanlarına erişir; olaylar, koşullar, döngüler, fonksiyonlar ve nesnelerle sayfayı değiştirir.", ["DOM belgenin nesne modelidir", "=== hem değer hem tür eşitliğini kontrol eder", "addEventListener olay dinleyicisi ekler"], ["JavaScript", "DOM", "event", "function"]),
      u("WTK210U", 5, "JS Kütüphaneleri ile Çalışmak", "Kütüphaneler tekrar kullanılan işlevleri hazır sunar. Ders kapsamında jQuery ve jQuery Mobile; seçiciler, olaylar, efektler, DOM/CSS metotları ve mobil arayüz bileşenleriyle ele alınır.", ["jQuery seçicileri CSS seçicilerine benzer", "Kütüphane, uygulamadan çağrılan hazır kod koleksiyonudur", "Bootstrap bir CSS/arayüz çatısıdır"], ["jQuery", "kütüphane", "Bootstrap", "mobil"]),
      u("WTK210U", 6, "ASP.NET ile Dinamik Web Kodlama", ".NET ekosisteminde C# ile değişkenler, diziler, kontrol yapıları, sınıflar, web formları ve veritabanı işlemleri kullanılır. Derlenen, tür güvenli bir sunucu tarafı yaklaşımı sunar.", ["C# güçlü tür denetimine sahiptir", "ASP.NET web uygulamaları için .NET çatısını kullanır", "Sınıflar veri ve davranışı bir araya getirir"], [".NET", "C#", "ASP.NET", "sınıf"]),
      u("WTK210U", 7, "Python ve Django", "Python yorumlanan ve yüksek seviyeli bir dildir. Django, Python ile yazılmış MTV yaklaşımını kullanan bir web çatısıdır. URL, view, template ve model katmanlarıyla uygulama geliştirir.", ["Python kod bloklarını girintiyle belirler", "Django'da model veritabanı yapısını temsil eder", "Template sunum ile kodu ayırır"], ["Python", "Django", "MTV", "model", "template"]),
      u("WTK210U", 8, "Ruby ve Ruby on Rails", "Ruby nesne yönelimli, dinamik bir programlama dilidir. Ruby on Rails; MVC, convention over configuration ve DRY ilkeleriyle hızlı web geliştirmeyi amaçlar.", ["Rails MVC mimarisini kullanır", "DRY: Kendini tekrar etme", "Convention over configuration yapılandırma yükünü azaltır"], ["Ruby", "Rails", "MVC", "DRY"]),
    ],
  },
  {
    code: "YBS302U",
    short: "Ağ & Güvenlik",
    title: "Ağ Yönetimi ve Bilgi Güvenliği",
    color: "#a16ee8",
    source: "https://www.anadolu.edu.tr/akademik/fakulteler/ders/247394/ag-yonetimi-ve-bilgi-guvenligi/ders-icerik",
    archiveSource: "https://aofsoru.com/ybs302u-ag-yonetimi-ve-bilgi-guvenligi-dersi-sinav-sorulari",
    archivePeriods: "2022–2023, 2023–2024 ve 2024–2025 yaz okulu",
    verification: "8 ünite başlığı resmî Anadolu ders içeriği sayfasıyla doğrulandı.",
    units: [
      u("YBS302U", 1, "Bilgisayar Ağlarına Genel Bakış", "Ağlar cihazların kaynak ve veri paylaşmasını sağlar. LAN, MAN ve WAN kapsama alanlarına göre; istemci-sunucu ve eşler arası yapılar çalışma biçimine göre sınıflanır. OSI ve TCP/IP katmanlı iletişim modelleridir.", ["OSI 7 katmandır", "IP mantıksal, MAC fiziksel adreslemedir", "Router ağlar arasında paket yönlendirir"], ["LAN", "WAN", "OSI", "TCP/IP", "router"]),
      u("YBS302U", 2, "Ağ Yönetimi ve SNMP", "Ağ yönetimi performans, hata, yapılandırma, muhasebe ve güvenlik yönetimini kapsar. SNMP; yönetici, ajan ve MIB bileşenleriyle ağ cihazlarını izlemeye ve yönetmeye yarar.", ["MIB yönetilen nesnelerin bilgi tabanıdır", "GET bilgi okur, SET değer değiştirir", "TRAP ajan tarafından yöneticiyi olaydan haberdar eder"], ["SNMP", "MIB", "agent", "trap"]),
      u("YBS302U", 3, "Simetrik Şifreleme ve Mesaj Gizliliği", "Simetrik şifrelemede şifreleme ve çözme için aynı gizli anahtar kullanılır. Hızlıdır ancak anahtarın güvenli dağıtımı temel sorundur. AES güncel, DES ise artık yetersiz kabul edilen örneklerdendir.", ["Aynı anahtar iki tarafça paylaşılır", "AES blok şifreleme standardıdır", "Kaba kuvvet saldırısına direnç anahtar uzunluğuyla artar"], ["simetrik", "AES", "DES", "gizlilik"]),
      u("YBS302U", 4, "Açık Anahtar Şifreleme ve Mesaj Doğrulama", "Asimetrik şifrelemede açık ve özel anahtar çifti kullanılır. Dijital imza; kimlik doğrulama, bütünlük ve inkâr edememe sağlar. Özet fonksiyonları veriyi sabit uzunluklu değere dönüştürür.", ["Açık anahtar paylaşılabilir, özel anahtar korunur", "Dijital imza gizlilikten çok doğrulama ve bütünlük sağlar", "Sertifika açık anahtarı kimlikle ilişkilendirir"], ["asimetrik", "RSA", "hash", "dijital imza"]),
      u("YBS302U", 5, "Anahtar Dağıtımı ve Kullanıcı Kimlik Doğrulama", "Anahtar dağıtımı kriptografik anahtarların güvenli biçimde taraflara ulaştırılmasıdır. Kimlik doğrulama; parola, token ve biyometri gibi bildiğin, sahip olduğun ve olduğun faktörlere dayanabilir.", ["MFA birden fazla bağımsız faktör kullanır", "PKI sertifika otoritelerine dayanır", "Kerberos bilet tabanlı kimlik doğrulama sağlar"], ["MFA", "PKI", "sertifika", "Kerberos"]),
      u("YBS302U", 6, "İletim Katmanı ve Kablosuz Ağ Güvenliği", "TLS uygulamalar arasında şifreli ve doğrulanmış iletişim sağlar; HTTPS, HTTP'nin TLS ile kullanılmasıdır. Kablosuz ağlarda WPA2/WPA3, güçlü parola ve güvenli yapılandırma önemlidir.", ["TLS aktarım hâlindeki veriyi korur", "WEP güvenli kabul edilmez", "WPA3 güncel kablosuz güvenlik yaklaşımıdır"], ["TLS", "HTTPS", "WPA2", "WPA3"]),
      u("YBS302U", 7, "E-posta Güvenliği", "E-posta; kimlik avı, zararlı ek, adres sahteciliği ve istenmeyen posta saldırılarına açıktır. PGP ve S/MIME içerik şifreleme ve imzalama; SPF, DKIM ve DMARC alan adı doğrulaması için kullanılır.", ["SPF gönderim yapabilecek sunucuları belirtir", "DKIM iletiye alan adı imzası ekler", "DMARC SPF/DKIM sonuçlarına uygulanacak politikayı tanımlar"], ["phishing", "PGP", "S/MIME", "SPF", "DKIM"]),
      u("YBS302U", 8, "Sistem Güvenliği", "Sistem güvenliği; erişim kontrolü, güncelleme, zararlı yazılım önleme, günlükleme, yedekleme ve olay müdahalesini kapsar. Gizlilik, bütünlük ve erişilebilirlik bilgi güvenliğinin temel üçlüsüdür.", ["En az ayrıcalık yalnız gerekli yetkiyi verir", "ISO 27001 bilgi güvenliği yönetim standardıdır", "Solucan kendini çoğaltarak ağda yayılabilir"], ["CIA üçlüsü", "ISO 27001", "zararlı yazılım", "yedekleme"]),
    ],
  },
];

export const questions: Question[] = [
  { id: "q1", course: "TAR201U", unit: 1, prompt: "Osmanlı Devleti'nde anayasal yönetime geçişi sağlayan 1876 tarihli belge hangisidir?", options: ["Tanzimat Fermanı", "Islahat Fermanı", "Kanun-ı Esasi", "Sened-i İttifak", "Misak-ı Millî"], answer: 2, explanation: "Kanun-ı Esasi 1876'da ilan edildi ve I. Meşrutiyet dönemini başlattı." },
  { id: "q2", course: "TAR201U", unit: 2, prompt: "Trablusgarp Savaşı'nı sona erdiren antlaşma hangisidir?", options: ["Bükreş", "Uşi", "Londra", "Mondros", "Gümrü"], answer: 1, explanation: "1912 Uşi Antlaşması ile Osmanlı Devleti Trablusgarp üzerindeki hâkimiyetini kaybetti." },
  { id: "q3", course: "TAR201U", unit: 3, prompt: "İtilaf Devletlerinin güvenliklerini tehdit eden yerleri işgal etmesine dayanak yapılan Mondros maddesi hangisidir?", options: ["2. madde", "5. madde", "7. madde", "12. madde", "24. madde"], answer: 2, explanation: "Mondros'un 7. maddesi, İtilaf Devletlerine geniş bir işgal gerekçesi sağladı." },
  { id: "q4", course: "TAR201U", unit: 3, prompt: "“Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır” kararı nerede yer aldı?", options: ["Havza Genelgesi", "Amasya Genelgesi", "Erzurum Kongresi", "Sivas Kongresi", "Amasya Görüşmeleri"], answer: 1, explanation: "Bu ifade Amasya Genelgesi'nde millî egemenlik fikrini açıkça ortaya koydu." },
  { id: "q5", course: "TAR201U", unit: 4, prompt: "TBMM hangi tarihte açılmıştır?", options: ["19 Mayıs 1919", "23 Nisan 1920", "20 Ocak 1921", "1 Kasım 1922", "29 Ekim 1923"], answer: 1, explanation: "Türkiye Büyük Millet Meclisi 23 Nisan 1920'de Ankara'da açıldı." },
  { id: "q6", course: "TAR201U", unit: 5, prompt: "TBMM Hükûmetinin imzaladığı ilk uluslararası antlaşma hangisidir?", options: ["Moskova", "Kars", "Gümrü", "Ankara", "Lozan"], answer: 2, explanation: "Gümrü Antlaşması 3 Aralık 1920'de Ermenistan ile imzalandı." },
  { id: "q7", course: "TAR201U", unit: 6, prompt: "Doğu Trakya'nın savaşılmadan geri alınmasını sağlayan gelişme hangisidir?", options: ["Lozan Antlaşması", "Mudanya Ateşkesi", "Ankara Antlaşması", "Moskova Antlaşması", "Saltanatın kaldırılması"], answer: 1, explanation: "Mudanya Ateşkes Antlaşması ile Doğu Trakya'nın Türkiye'ye bırakılması kabul edildi." },
  { id: "q8", course: "TAR201U", unit: 8, prompt: "Türkiye'nin Boğazlar üzerindeki egemenliğini güçlendiren sözleşme hangisidir?", options: ["Montrö", "Balkan Antantı", "Sadabat Paktı", "Lozan", "Ankara"], answer: 0, explanation: "1936 Montrö Boğazlar Sözleşmesi Türkiye'nin Boğazlardaki yetkilerini genişletti." },
  { id: "q9", course: "TAR202U", unit: 1, prompt: "Halifelik hangi tarihte kaldırılmıştır?", options: ["1 Kasım 1922", "29 Ekim 1923", "3 Mart 1924", "17 Şubat 1926", "1 Kasım 1928"], answer: 2, explanation: "Halifelik 3 Mart 1924 tarihli düzenlemeyle kaldırıldı." },
  { id: "q10", course: "TAR202U", unit: 1, prompt: "Eğitim kurumlarını tek çatı altında toplayan kanun hangisidir?", options: ["Teşkilat-ı Esasiye", "Tevhid-i Tedrisat", "Takrir-i Sükûn", "Kabotaj", "Soyadı"], answer: 1, explanation: "Tevhid-i Tedrisat Kanunu eğitimde birliği sağladı." },
  { id: "q11", course: "TAR202U", unit: 1, prompt: "Türk karasularında taşıma hakkını Türk vatandaşlarına veren düzenleme hangisidir?", options: ["Aşarın kaldırılması", "Kabotaj Kanunu", "Medeni Kanun", "Teşvik-i Sanayi", "Millî Korunma Kanunu"], answer: 1, explanation: "1926 Kabotaj Kanunu, kıyılar arasındaki taşıma hakkını Türk vatandaşlarına verdi." },
  { id: "q12", course: "TAR202U", unit: 2, prompt: "Kanun önünde eşitlik ve ayrıcalıksız toplum anlayışı en doğrudan hangi ilkeyle ilgilidir?", options: ["Devletçilik", "Milliyetçilik", "Halkçılık", "İnkılapçılık", "Cumhuriyetçilik"], answer: 2, explanation: "Halkçılık sınıf ayrıcalıklarını reddeder ve kanun önünde eşitliği esas alır." },
  { id: "q13", course: "TAR202U", unit: 3, prompt: "Türkiye'de ilk çok partili genel seçim hangi yıl yapılmıştır?", options: ["1924", "1930", "1945", "1946", "1950"], answer: 3, explanation: "1946 seçimi çok partili ilk genel seçimdir; 1950'de iktidar seçimle el değiştirdi." },
  { id: "q14", course: "TAR202U", unit: 5, prompt: "1961 Anayasası hangi gelişmenin ardından hazırlanmıştır?", options: ["12 Mart Muhtırası", "27 Mayıs müdahalesi", "12 Eylül darbesi", "1950 seçimleri", "24 Ocak kararları"], answer: 1, explanation: "1961 Anayasası 27 Mayıs 1960 askerî müdahalesinin ardından kabul edildi." },
  { id: "q15", course: "WTK201U", unit: 1, prompt: "Aşağıdakilerden hangisi bir içerik yönetim sisteminin temel işlevlerinden biri değildir?", options: ["Kataloglama", "Format yönetimi", "Düzeltme takibi", "Yayınlama", "İşlemci hız aşırtma"], answer: 4, explanation: "İşlemci hız aşırtma donanımla ilgilidir; diğerleri İYS'nin temel içerik işlevleridir." },
  { id: "q16", course: "WTK201U", unit: 3, prompt: "WordPress'te daha kalıcı ve zamandan bağımsız içerikler için genellikle hangisi kullanılır?", options: ["Yazı", "Sayfa", "Etiket", "Yorum", "Bileşen"], answer: 1, explanation: "Hakkımızda ve İletişim gibi kalıcı içerikler çoğunlukla sayfa olarak oluşturulur." },
  { id: "q17", course: "WTK201U", unit: 4, prompt: "Joomla'da sayfanın ana işlevini yürüten uzantı türü hangisidir?", options: ["Bileşen", "Modül", "Şablon", "Dil paketi", "Menü başlığı"], answer: 0, explanation: "Bileşen, Joomla sayfasının ana içerik ve işlev alanını yönetir." },
  { id: "q18", course: "WTK201U", unit: 5, prompt: "Drupal'da içeriklerin sınıflandırılmasını sağlayan yapı hangisidir?", options: ["Cron", "Taksonomi", "Theme", "Cache", "Session"], answer: 1, explanation: "Drupal taksonomisi terimler ve sözlükler üzerinden içerikleri sınıflandırır." },
  { id: "q19", course: "WTK201U", unit: 7, prompt: "DNN en doğrudan hangi teknoloji ekosistemiyle ilişkilidir?", options: ["Java", "PHP", "Microsoft .NET", "Ruby", "Go"], answer: 2, explanation: "DNN, eski adı DotNetNuke olan .NET tabanlı bir içerik yönetim platformudur." },
  { id: "q20", course: "WTK201U", unit: 8, prompt: "İYS seçiminde ilk yapılması gereken hangisidir?", options: ["En pahalı ürünü almak", "Tüm eklentileri kurmak", "İhtiyaç ve hedef analizi yapmak", "Sunucuyu değiştirmek", "Logoyu tasarlamak"], answer: 2, explanation: "Doğru seçim, kurumun hedefleri ve ihtiyaçlarının analiz edilmesiyle başlar." },
  { id: "q21", course: "WTK210U", unit: 1, prompt: "Aşağıdakilerden hangisi istemci tarafında çalışan temel web programlama dilidir?", options: ["PHP", "SQL", "JavaScript", "Django", "ASP.NET"], answer: 2, explanation: "JavaScript temel olarak tarayıcıda, yani istemci tarafında çalışır." },
  { id: "q22", course: "WTK210U", unit: 2, prompt: "PHP'de değişken tanımları hangi işaretle başlar?", options: ["#", "$", "@", "&", "%"], answer: 1, explanation: "PHP değişkenleri $ işaretiyle başlar: $isim gibi." },
  { id: "q23", course: "WTK210U", unit: 3, prompt: "Form verisini URL üzerinde görünür biçimde taşıyan HTTP yöntemi hangisidir?", options: ["POST", "PATCH", "GET", "DELETE", "CONNECT"], answer: 2, explanation: "GET parametreleri çoğunlukla URL'nin sorgu dizesinde taşır." },
  { id: "q24", course: "WTK210U", unit: 4, prompt: "HTML belgesini düğümlerden oluşan bir nesne yapısı olarak temsil eden model hangisidir?", options: ["DNS", "DOM", "MVC", "SQL", "HTTP"], answer: 1, explanation: "DOM, Document Object Model ifadesinin kısaltmasıdır." },
  { id: "q25", course: "WTK210U", unit: 7, prompt: "Django'nun kullandığı mimari yaklaşım hangisidir?", options: ["MTV", "P2P", "OSI", "REST yalnız", "SNMP"], answer: 0, explanation: "Django, Model-Template-View (MTV) yaklaşımıyla çalışır." },
  { id: "q26", course: "WTK210U", unit: 8, prompt: "Ruby on Rails ile ilişkilendirilen “kendini tekrar etme” ilkesi hangisidir?", options: ["KISS", "DRY", "YAGNI", "SOLID", "ACID"], answer: 1, explanation: "DRY, Don't Repeat Yourself ifadesidir." },
  { id: "q27", course: "YBS302U", unit: 1, prompt: "Farklı ağlar arasında paket yönlendiren cihaz hangisidir?", options: ["Hub", "Router", "Repeater", "Modem yalnız", "Access point"], answer: 1, explanation: "Router, IP bilgilerini kullanarak ağlar arasında yönlendirme yapar." },
  { id: "q28", course: "YBS302U", unit: 2, prompt: "SNMP'de yönetilen nesnelere ilişkin bilgilerin tutulduğu yapı hangisidir?", options: ["MIB", "DNS", "NAT", "ARP", "ACL"], answer: 0, explanation: "MIB, Management Information Base yani yönetim bilgi tabanıdır." },
  { id: "q29", course: "YBS302U", unit: 3, prompt: "Aşağıdakilerden hangisi simetrik şifreleme algoritmasıdır?", options: ["RSA", "AES", "Diffie-Hellman", "DSA", "ECC"], answer: 1, explanation: "AES aynı gizli anahtarın kullanıldığı simetrik blok şifreleme algoritmasıdır." },
  { id: "q30", course: "YBS302U", unit: 4, prompt: "Dijital imza aşağıdaki güvenlik özelliklerinden hangisini doğrudan sağlamaz?", options: ["Kimlik doğrulama", "Bütünlük", "İnkâr edememe", "Gizlilik", "Kaynak doğrulama"], answer: 3, explanation: "Dijital imzanın temel amacı gizlilik değil; doğrulama, bütünlük ve inkâr edememedir." },
  { id: "q31", course: "YBS302U", unit: 5, prompt: "Parola ve telefona gelen tek kullanımlık kodun birlikte kullanılması hangisine örnektir?", options: ["Tek faktör", "Çok faktörlü kimlik doğrulama", "Simetrik şifreleme", "Hash çakışması", "Yetki yükseltme"], answer: 1, explanation: "Parola bilinen, telefon ise sahip olunan faktördür; birlikte MFA oluşturur." },
  { id: "q32", course: "YBS302U", unit: 6, prompt: "HTTPS, HTTP ile hangi güvenlik protokolünün birlikte kullanılmasıdır?", options: ["FTP", "TLS", "SNMP", "ARP", "ICMP"], answer: 1, explanation: "HTTPS, HTTP iletişimini TLS ile şifreler ve doğrular." },
  { id: "q33", course: "YBS302U", unit: 7, prompt: "E-posta alan adına ait iletilere kriptografik imza ekleyen mekanizma hangisidir?", options: ["SPF", "DKIM", "POP3", "IMAP", "FTP"], answer: 1, explanation: "DKIM, alan adı adına gönderilen e-postalara doğrulanabilir imza ekler." },
  { id: "q34", course: "YBS302U", unit: 8, prompt: "Gizlilik, bütünlük ve erişilebilirlik birlikte hangi kavramı oluşturur?", options: ["CIA üçlüsü", "OSI modeli", "AAA kaydı", "RAID dizisi", "PKI zinciri"], answer: 0, explanation: "Confidentiality, Integrity, Availability bilgi güvenliğinin CIA üçlüsüdür." },
  { id: "q35", course: "TAR202U", unit: 4, prompt: "Türkiye hangi yıl NATO'ya üye olmuştur?", options: ["1945", "1948", "1950", "1952", "1955"], answer: 3, explanation: "Türkiye, Demokrat Parti döneminde 1952 yılında NATO'ya katıldı." },
  { id: "q36", course: "TAR202U", unit: 6, prompt: "1983 genel seçimlerini kazanarak tek başına iktidar olan parti hangisidir?", options: ["SHP", "DYP", "ANAP", "DSP", "RP"], answer: 2, explanation: "Turgut Özal liderliğindeki Anavatan Partisi 1983 seçimlerini kazandı." },
  { id: "q37", course: "TAR202U", unit: 7, prompt: "1991-2002 döneminin sonlarına doğru yaşanan büyük ekonomik kriz hangi yıldadır?", options: ["1994", "1997", "1999", "2001", "2003"], answer: 3, explanation: "2001 ekonomik krizi, koalisyonlar ve krizler döneminin temel kırılma noktalarındandır." },
  { id: "q38", course: "TAR202U", unit: 8, prompt: "Ders kitabının 2002-2018 döneminde ele aldığı darbe girişimi hangi tarihte gerçekleşmiştir?", options: ["28 Şubat 1997", "27 Nisan 2007", "15 Temmuz 2016", "16 Nisan 2017", "24 Haziran 2018"], answer: 2, explanation: "15 Temmuz 2016 darbe girişimi, ünitenin kapsadığı dönemin önemli siyasi kırılma noktalarındandır." },
  { id: "q39", course: "TAR201U", unit: 7, prompt: "Cumhuriyet döneminin ilk muhalefet partisi hangisidir?", options: ["Serbest Cumhuriyet Fırkası", "Demokrat Parti", "Terakkiperver Cumhuriyet Fırkası", "Millî Kalkınma Partisi", "Hürriyet Partisi"], answer: 2, explanation: "Terakkiperver Cumhuriyet Fırkası 1924'te kurulan Cumhuriyet döneminin ilk muhalefet partisidir." },
  { id: "q40", course: "TAR201U", unit: 8, prompt: "Atatürk dönemi dış politikasında Musul sorunu ağırlıklı olarak hangi devletle yaşanmıştır?", options: ["Fransa", "İtalya", "Sovyetler Birliği", "İngiltere", "Yunanistan"], answer: 3, explanation: "Musul sorunu Türkiye ile İngiltere arasında görüşüldü; 1926 Ankara Antlaşması ile sonuçlandı." },
  { id: "q41", course: "WTK201U", unit: 2, prompt: "Bir içerik yönetim sisteminde sitenin görünümünü, renklerini ve sayfa düzenini öncelikle hangi unsur belirler?", options: ["Tema", "Eklenti", "Veritabanı tablosu", "Kullanıcı rolü", "Yedek dosyası"], answer: 0, explanation: "Tema görünümü ve sayfa düzenini belirler; eklentiler sisteme yeni işlevler kazandırır." },
  { id: "q42", course: "WTK201U", unit: 6, prompt: "CraftCMS'nin sunum katmanında kullandığı şablon dili hangisidir?", options: ["Blade", "Twig", "Razor", "JSP", "Liquid yalnız"], answer: 1, explanation: "CraftCMS, şablonlarını oluşturmak için Twig şablon dilini kullanır." },
  { id: "q43", course: "WTK201U", unit: 2, prompt: "Bir İYS güncellemesinden hemen önce yapılması gereken en güvenli işlem hangisidir?", options: ["Tüm kullanıcıları silmek", "Temayı kaldırmak", "Yedek almak", "Alan adını değiştirmek", "Önbelleği kalıcı kapatmak"], answer: 2, explanation: "Güncelleme öncesinde dosya ve veritabanı yedeği almak geri dönüş imkânı sağlar." },
  { id: "q44", course: "WTK201U", unit: 6, prompt: "CraftCMS'de tek bir içerik kaydını ifade eden temel kavram hangisidir?", options: ["Entry", "Plugin", "Route", "Cache", "Asset volume"], answer: 0, explanation: "Entry, CraftCMS içindeki tek bir içerik kaydıdır; alanlar bu kaydın veri yapısını oluşturur." },
  { id: "q45", course: "WTK210U", unit: 5, prompt: "jQuery'nin temel kullanım amacı aşağıdakilerden hangisidir?", options: ["İşletim sistemi kurmak", "DOM seçimi ve olay işlemlerini kolaylaştırmak", "Veritabanı sunucusu olmak", "PHP kodunu derlemek", "Alan adı çözümlemek"], answer: 1, explanation: "jQuery; DOM seçimi, olay yönetimi, efektler ve Ajax gibi istemci tarafı işlemlerini kolaylaştırır." },
  { id: "q46", course: "WTK210U", unit: 6, prompt: "ASP.NET uygulamalarında yaygın olarak kullanılan programlama dili hangisidir?", options: ["C#", "Ruby", "Kotlin", "Perl", "Lua"], answer: 0, explanation: "ASP.NET, .NET ekosisteminde çoğunlukla C# ile web uygulaması geliştirmek için kullanılır." },
  { id: "q47", course: "WTK210U", unit: 5, prompt: "Sayfa yenilenmeden sunucuyla veri alışverişi yapılmasını sağlayan yaklaşım hangisidir?", options: ["DNS", "Ajax", "FTP", "SMTP", "Cron"], answer: 1, explanation: "Ajax, sayfanın tamamını yenilemeden sunucuya istek gönderip yanıt işlemeyi sağlar." },
  { id: "q48", course: "WTK210U", unit: 6, prompt: "C# dilinde yalnızca sınıfın kendi içinden erişilebilen üye hangi erişim belirleyicisiyle tanımlanır?", options: ["public", "protected", "private", "internal public", "static"], answer: 2, explanation: "private üyeler yalnızca tanımlandıkları sınıfın içinden erişilebilir." },
  { id: "q49", course: "YBS302U", unit: 2, prompt: "SNMP'de bir ajanın önemli bir olayı yöneticiye kendiliğinden bildirmesine ne ad verilir?", options: ["GET", "SET", "TRAP", "MIB", "PING"], answer: 2, explanation: "TRAP, ajanın yöneticiye istek beklemeden olay veya alarm bildirimi göndermesidir." },
  { id: "q50", course: "YBS302U", unit: 5, prompt: "Bilet tabanlı kullanıcı kimlik doğrulama sistemi hangisidir?", options: ["Kerberos", "AES", "DKIM", "SNMP", "WPA3"], answer: 0, explanation: "Kerberos, güvenilir bir merkezden alınan biletlerle kimlik doğrulama sağlayan sistemdir." },
];

export const courseMap = Object.fromEntries(courses.map((course) => [course.code, course]));
