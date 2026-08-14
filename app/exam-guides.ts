export type ExamGuide = {
  lesson: string[];
  signals: string[];
  patterns: string[];
  trap: string;
  hook: string;
};

const g = (lesson: string[], signals: string[], patterns: string[], trap: string, hook: string): ExamGuide => ({ lesson, signals, patterns, trap, hook });

export const examGuides: Record<string, ExamGuide> = {
  "TAR201U-1": g(
    [
      "Türk İnkılabı bir anda ortaya çıkmadı. Osmanlı Devleti'nin merkezî otorite kaybı, askerî yenilgiler, ekonomik bağımlılık ve milliyetçilik hareketleri 19. yüzyılda reform arayışlarını hızlandırdı. Tanzimat ve Islahat fermanları hakları genişletmeye çalışırken 1876 Kanun-ı Esasi anayasal yönetime geçişi, I. Meşrutiyet ise meclisli düzeni temsil eder.",
      "Bu ünitede olayları yalnız tarihle değil, sebep–sonuçla öğren: Avrupa'daki güç dengesi ve fikir akımları Osmanlı toplumunu etkiledi; içerideki yönetim sorunları da yenileşme ihtiyacını büyüttü. Sınav, bir düzenlemenin hangi soruna cevap verdiğini veya bir gelişmenin Osmanlı siyasal yapısındaki sonucunu sorabilir."
    ],
    ["II. Osman ve merkezî otorite", "31 Mart Vakası", "Tanzimat–Islahat", "Kanun-ı Esasi", "meşrutiyet"],
    ["Bir olayın 'ilk' veya ayırt edici sonucunu bulma", "Reform–amaç eşleştirmesi", "Nedenlerden biri değildir"],
    "Tanzimat bir ferman, Kanun-ı Esasi bir anayasa; I. Meşrutiyet ise bu anayasanın açtığı yönetim dönemidir.",
    "1839 → Tanzimat, 1856 → Islahat, 1876 → Kanun-ı Esasi ve I. Meşrutiyet."
  ),
  "TAR201U-2": g(
    [
      "II. Meşrutiyet sonrasında İttihat ve Terakki'nin etkisi arttı; Trablusgarp ve Balkan savaşları Osmanlı'nın askerî ve toprak kayıplarını derinleştirdi. Trablusgarp Savaşı Uşi Antlaşması'yla sona erdi. Balkan savaşları Rumeli'deki hâkimiyeti büyük ölçüde bitirdi.",
      "Birinci Dünya Savaşı'nın sonunda imzalanan Mondros Ateşkesi, özellikle 7. maddesiyle işgallere geniş bir gerekçe sağladı. Sevr ise Osmanlı Devleti'ni siyasi, askerî ve ekonomik bakımdan parçalayan bir antlaşmaydı; uygulanamaması Millî Mücadele'nin başarısıyla ilgilidir."
    ],
    ["Trablusgarp–Uşi", "Balkan Savaşları", "I. Dünya Savaşı cepheleri", "Mondros 7. madde", "Sevr"],
    ["Savaş–antlaşma eşleştirmesi", "Antlaşma hükmünü tanıma", "Savaşın nedeni/sonucu değildir"],
    "Mondros bir ateşkes ve işgal zemini; Sevr ise ağır bir barış tasarısıdır. İkisini aynı işlevde düşünme.",
    "Uşi → Trablusgarp biter; Mondros → silahlar susar ve işgal başlar; Sevr → parçalama planı."
  ),
  "TAR201U-3": g(
    [
      "Mondros sonrasında işgallere karşı yerel müdafaa-i hukuk cemiyetleri kuruldu. Yararlı cemiyetlerin ortak amacı bölgesel hakları savunmaktı; Sivas Kongresi'nde Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti çatısı altında birleştiler. Mustafa Kemal'in Samsun'a çıkışı, Havza ve Amasya genelgeleri, Erzurum ve Sivas kongreleri mücadeleyi yerelden ulusala taşıdı.",
      "Amasya Genelgesi mücadelenin gerekçesini ve yöntemini ortaya koydu: bağımsızlığı milletin azim ve kararı kurtaracaktı. Erzurum bölgesel toplanmasına rağmen ulusal kararlar aldı; Sivas ise ulusal nitelikliydi ve cemiyetleri birleştirdi. Misak-ı Millî bu birikimin siyasal hedefini somutlaştırdı."
    ],
    ["yararlı–zararlı cemiyetler", "Wilson ilkeleri ve plebisit", "Amasya Genelgesi", "Erzurum–Sivas", "Misak-ı Millî"],
    ["Cemiyetin Millî Mücadele'yi destekleyip desteklemediği", "Karar–kongre eşleştirmesi", "İlk kez ulusal egemenlik vurgusu"],
    "Erzurum'un toplanışı bölgesel, kararları ulusaldır; Sivas hem toplanış hem karar bakımından ulusaldır.",
    "Samsun başlangıç, Amasya yöntem, Erzurum karar, Sivas birleşme."
  ),
  "TAR201U-4": g(
    [
      "İstanbul'un işgal edilip Meclis-i Mebusan'ın dağıtılması üzerine TBMM 23 Nisan 1920'de açıldı. Meclis olağanüstü şartlarda yasama ve yürütme yetkilerini kendinde topladı; meclis hükûmeti sistemi benimsendi. Bu yapı İstanbul Hükûmeti'ne bağlı değil, millî iradenin tek temsilcisiydi.",
      "1921 Teşkilat-ı Esasiye Kanunu 'egemenlik kayıtsız şartsız milletindir' anlayışını hukukileştirdi. Kuva-yı Milliye işgali yavaşlatan yerel direnişti; ortak komuta ve disiplin eksikliği düzenli orduya geçişi zorunlu kıldı."
    ],
    ["TBMM'nin özellikleri", "23 Nisan ve Hâkimiyet-i Milliye", "1921 Anayasası", "Kuva-yı Milliye", "meclis hükûmeti"],
    ["TBMM'nin özelliği değildir", "Tarih–olay eşleştirmesi", "Kuva-yı Milliye'nin yararı ve eksikliği"],
    "TBMM, İstanbul Hükûmetiyle koordineli çalışan bir kurul değildir; egemenliğin yeni ve bağımsız merkezidir.",
    "23 Nisan → meclis; 1921 → egemenliğin millete ait olduğunun anayasal ifadesi."
  ),
  "TAR201U-5": g(
    [
      "İstiklal Harbi Doğu, Güney ve Batı cephelerinde yürütüldü. Gümrü, TBMM Hükûmeti'nin ilk uluslararası antlaşmasıdır ve Doğu Cephesi'yle ilişkilidir. Batı Cephesi'nde İnönü savaşları düzenli ordunun meşruiyetini güçlendirdi; Kütahya–Eskişehir geri çekilmesinin ardından Sakarya savunması geldi.",
      "Sakarya'da savaş tek bir çizgiye değil bütün vatan sathına yayılan savunma anlayışıyla yürütüldü. Büyük Taarruz ve Başkomutanlık Meydan Muharebesi askerî sonucu belirledi; Mudanya Ateşkesi silahlı dönemi kapattı."
    ],
    ["Gümrü Antlaşması", "düzenli ordu", "İnönü", "Sakarya", "Büyük Taarruz"],
    ["Söz–muharebe eşleştirmesi", "Cephe–antlaşma eşleştirmesi", "Olayları kronolojik sıralama"],
    "Gümrü askerî mücadele içindeki ilk uluslararası antlaşma; Mudanya ise savaşın sonunda ateşkestir.",
    "İnönü güven, Sakarya dönüm, Büyük Taarruz sonuç."
  ),
  "TAR201U-6": g(
    [
      "Mudanya Ateşkesi ile Doğu Trakya savaşılmadan geri alındı ve askerî mücadele sona erdi. Lozan Konferansı'na Ankara ve İstanbul hükûmetlerinin birlikte çağrılması saltanatın kaldırılmasını hızlandırdı. Lozan'da kapitülasyonlar, azınlıklar, borçlar, sınırlar ve Boğazlar yeni devletin bağımsızlığı açısından ele alındı.",
      "Lozan yalnız bir sınır antlaşması değildir; Türkiye'nin uluslararası hukuk bakımından tanınmasının temel belgesidir. Bazı meseleler hemen çözülemedi: Musul daha sonra İngiltere ile görüşüldü; Boğazlar rejimi 1936 Montrö Sözleşmesi'yle Türkiye lehine yeniden düzenlendi."
    ],
    ["Mudanya ve Doğu Trakya", "saltanatın kaldırılması", "Lozan heyeti", "kapitülasyonlar", "Boğazlar"],
    ["Lozan'da taviz verilmeyecek konu", "Mudanya–Lozan ayrımı", "Çözülen/ertelenen mesele"],
    "Mudanya ateşkes, Lozan barış antlaşmasıdır; Montrö ise daha sonra Boğazlar rejimini değiştirir.",
    "Mudanya silahı susturur; Lozan yeni devleti tanıtır."
  ),
  "TAR201U-7": g(
    [
      "Cumhuriyetin ilanı hükûmet kurma sorununu çözdü ve rejimin adını koydu. Halifeliğin kaldırılması, TBMM dışında ikinci bir siyasal otorite ihtimalini ortadan kaldırdı. 1924 Anayasası yeni devletin kurumsal çerçevesini belirledi.",
      "Terakkiperver Cumhuriyet Fırkası ve Serbest Cumhuriyet Fırkası çok partili hayat denemeleridir. Şeyh Sait İsyanı ve Menemen olayı rejim güvenliği bağlamında ele alınır. Dokuz Umde ise Halk Fırkası'nın kuruluş sürecindeki programatik esaslardır."
    ],
    ["Cumhuriyetin ilanı", "halifeliğin kaldırılma nedenleri", "Dokuz Umde", "Kubilay–Menemen", "çok partili hayat"],
    ["Nedenlerden biri değildir", "Olay–parti/dönem eşleştirmesi", "Rejime yönelik gelişmeyi tanıma"],
    "Saltanat devlet yönetimiyle, halifelik dinî-siyasal temsil iddiasıyla ilgilidir; farklı tarihlerde kaldırıldılar.",
    "1922 saltanat, 1923 Cumhuriyet, 1924 halifelik."
  ),
  "TAR201U-8": g(
    [
      "Atatürk dönemi dış politikası gerçekçilik, barışçılık ve tam bağımsızlık ilkelerine dayanır. Türkiye sorunlarını mümkün olduğunca görüşme ve uluslararası hukuk yoluyla çözmeye çalıştı. Musul İngiltere ve Irak'la, nüfus mübadelesindeki 'etabli' sorunu Yunanistan'la, Küçük Ağrı meselesi İran'la ilişkilerde öne çıktı.",
      "Türkiye 1932'de Milletler Cemiyeti'ne katıldı. Balkan Antantı ve Sadabat Paktı bölgesel güvenlik arayışlarıdır. Montrö ile Boğazlarda egemenlik güçlendi; Hatay'ın Türkiye'ye katılma süreci Atatürk döneminde yürütülüp 1939'da tamamlandı."
    ],
    ["Musul Komisyonu", "etabli/mübadele", "Küçük Ağrı–İran", "Milletler Cemiyeti", "Montrö–Hatay"],
    ["Sorun–ülke eşleştirmesi", "Kuruluş–amaç eşleştirmesi", "Dış politika ilkesini tanıma"],
    "Musul sorunu İngiltere ve Irak'la ilgilidir: 1926 Ankara Antlaşması'yla Musul Irak'ta kaldı. Etabli sorunu Yunanistan'la ilgilidir: nüfus mübadelesinde İstanbul'da yerleşik sayılacak Rumlar tartışıldı. Küçük Ağrı sorunu İran'la ilgilidir: 1932 sınır düzenlemesiyle Küçük Ağrı Türkiye'ye bırakıldı.",
    "Yurtta sulh dışarıda hukuk: sorunları önce ülke, sonra çözüm belgesiyle eşleştir."
  ),

  "TAR202U-1": g(
    [
      "Türk İnkılabı siyasal değişikliklerle sınırlı değildir. Tevhid-i Tedrisat eğitimde birliği; Medeni Kanun hukuk ve aile hayatındaki dönüşümü; Harf İnkılabı ve dil çalışmaları kültürel dönüşümü temsil eder. Ekonomide İzmir İktisat Kongresi ve Misak-ı İktisadi, millî ve üretken ekonomi hedefini ortaya koydu.",
      "Sınav bu ünitede kurumların eski–yeni adlarını, kanunların amaçlarını ve ekonomik girişimleri ayırmayı sever. Darülbedayi'nin İstanbul Şehir Tiyatrosuna dönüşmesi, Teşvik-i Sanayi düzenlemeleri, İş Bankası ve Sanayi ve Maadin Bankası gibi örnekler kültür ve ekonomi başlıklarının ayrıntılarıdır."
    ],
    ["Tevhid-i Tedrisat", "Medeni Kanun", "İzmir İktisat Kongresi", "Teşvik-i Sanayi", "Darülbedayi"],
    ["Kurumun yeni adını bulma", "Kanun–amaç eşleştirmesi", "İnkılap alanını sınıflandırma"],
    "Siyasal, hukuk, eğitim-kültür, toplumsal ve ekonomik inkılapları aynı listede ezberleme; önce alanına ayır.",
    "Eğitimde birlik, hukukta vatandaşlık, ekonomide millî üretim."
  ),
  "TAR202U-2": g(
    [
      "Atatürk'ün askerî tecrübesi Trablusgarp, Çanakkale, Kafkas ve Suriye-Filistin cephelerinden Millî Mücadele liderliğine uzanır. Nutuk, 1919–1927 sürecini siyasal bir hesap ve belge düzeni içinde anlatır; askerî eserleri ise eğitim, taktik ve muharebe değerlendirmeleri içerir.",
      "Altı ilke birbirini tamamlar: cumhuriyetçilik millî egemenliği, milliyetçilik ortak aidiyeti, halkçılık eşitliği, devletçilik karma ekonomik müdahaleyi, laiklik din ve devlet işlerinin ayrımını, inkılapçılık yeniliklerin sürdürülmesini vurgular."
    ],
    ["Nutuk", "Atatürk'ün eserleri", "savaştığı cepheler", "inkılap tanımı", "altı ilke"],
    ["Eser değildir", "Söz–ilke eşleştirmesi", "Cepheleri seçme"],
    "Devletçilik bütün ekonominin devletçe yürütülmesi değildir; özel girişimi reddetmeyen tamamlayıcı bir yaklaşımdır.",
    "İlkeyi ezberlemek yerine sorudaki fiili yakala: egemenlik–cumhuriyetçilik, eşitlik–halkçılık, yenilik–inkılapçılık."
  ),
  "TAR202U-3": g(
    [
      "İnönü döneminin merkezinde II. Dünya Savaşı'nın Türkiye'ye getirdiği güvenlik ve ekonomi baskısı vardır. Türkiye savaşa fiilen girmemeye dönük denge politikası izledi; Millî Korunma Kanunu, Varlık Vergisi ve karne uygulamaları savaş ekonomisinin sonuçlarıdır.",
      "Savaş sonrasında ABD ve Sovyetler Birliği iki süper güç olarak öne çıktı. Truman Doktrini güvenlik yardımı, Marshall Planı ekonomik toparlanma çerçevesidir. İçeride Demokrat Parti'nin kurulması ve 1946 seçimi çok partili hayata geçişi hızlandırdı."
    ],
    ["Millî Korunma Kanunu", "Varlık Vergisi", "ABD–Sovyet güç dengesi", "Truman–Marshall", "Demokrat Partinin kuruluşu"],
    ["Savaş ekonomisi uygulaması değildir", "Doktrin–amaç eşleştirmesi", "Çok partili hayata geçiş sırası"],
    "Truman askerî-siyasal çevreleme; Marshall ekonomik yardım ve kalkınmadır.",
    "Savaşta denge ve kıtlık; savaş sonrasında Batı ittifakı ve çok partili hayat."
  ),
  "TAR202U-4": g(
    [
      "14 Mayıs 1950 seçimleriyle iktidarın barışçıl biçimde CHP'den Demokrat Parti'ye geçmesi 'Beyaz İhtilal' olarak anılır. DP'nin ilk yıllarında tarımsal mekanizasyon, traktörleşme, dış kredi ve yol yatırımları büyümeyi destekledi; sonraki yıllarda döviz ve enflasyon sorunları ağırlaştı.",
      "Türkiye 1952'de NATO'ya girdi. Kıbrıs konusunda bir dönem taksim tezi savunuldu. 6–7 Eylül 1955 olayları İstanbul'daki Rumlara yönelik saldırılardır ve dönemin siyasal-toplumsal gerilimini gösterir."
    ],
    ["Beyaz İhtilal", "traktör devrimi", "Yabancı Sermayeyi Teşvik", "6–7 Eylül", "Kıbrıs–taksim"],
    ["Ekonomi politikası–alan eşleştirmesi", "Olayın nedenini/sonucunu bulma", "Dönemde gerçekleşmeyen gelişme"],
    "6–7 Eylül'ü Kıbrıs sorununun genel seyriyle karıştırma; olay İstanbul'daki saldırıları ifade eder.",
    "1950 sandıkta değişim; 1952 NATO; 1955 6–7 Eylül."
  ),
  "TAR202U-5": g(
    [
      "27 Mayıs 1960 müdahalesinden sonra Millî Birlik Komitesi yönetime el koydu ve 1961 Anayasası hazırlandı. Bu anayasa kuvvetler ayrılığı, Anayasa Mahkemesi ve çift meclis gibi kurumlarla daha çoğulcu bir yapı kurdu; aynı zamanda müdahale sonrasının askerî vesayet tartışmalarını başlattı.",
      "1960'larda koalisyonlar, Yön ve Forum gibi düşünce çevreleri, öğrenci ve işçi hareketleri öne çıktı. 12 Mart 1971 muhtırası ve 1970'lerde artan siyasi şiddet, 12 Eylül 1980 darbesine giden ortamın parçalarıdır."
    ],
    ["Millî Birlik Komitesi", "1961 Anayasası", "Yön Dergisi", "12 Mart Muhtırası", "12 Eylül'ün nedenleri"],
    ["Anayasa özelliği", "Müdahale–tarih eşleştirmesi", "Darbeyi hazırlayan neden değildir"],
    "27 Mayıs bir askerî darbe; 12 Mart doğrudan hükûmet kurmak yerine verilen muhtıradır.",
    "1960 darbe → 1961 anayasa → 1971 muhtıra → 1980 darbe."
  ),
  "TAR202U-6": g(
    [
      "24 Ocak 1980 kararları dışa açık, ihracata dayalı ve piyasa mekanizmasını güçlendiren ekonomik dönüşümün başlangıcıdır. 12 Eylül sonrasındaki 1983 seçimlerini ANAP kazandı; Turgut Özal döneminde döviz, dış ticaret ve finans piyasaları serbestleşti.",
      "Faizlerin serbest bırakılması banker sisteminin büyümesi ve ardından krizlerle ilişkilidir. Özal dış politikada ekonomik karşılıklı bağımlılığa önem verdi; Körfez Savaşı, Türk dünyası ve Orta Doğu ilişkileri dönemin dış politika başlıkları arasındadır."
    ],
    ["24 Ocak Kararları", "ANAP–Özal", "liberal ekonomi", "banker krizi", "Körfez Savaşı"],
    ["Program–ekonomi yaklaşımı eşleştirmesi", "Sonucun nedeni", "Özal dönemi dış politika hedefi"],
    "24 Ocak kararları 1980'de alındı; Özal döneminde uygulama çizgisi güçlendi. Kararları 1983'te başlamış sanma.",
    "24 Ocak: kuralları değiştir; 1983 ANAP: uygulamayı siyasete taşı."
  ),
  "TAR202U-7": g(
    [
      "1991–2002 arasında tek parti çoğunluğu yerine DYP–SHP/CHP, Refah–Yol ve DSP–MHP–ANAP gibi koalisyonlar öne çıktı. Yeşil Kart sosyal güvencesi olmayanların sağlık giderlerine erişimini sağladı; Gümrük Birliği 1996'da yürürlüğe girdi.",
      "28 Şubat 1997 süreci Refah–Yol hükûmetinin sona ermesiyle bağlantılıdır. Kardak krizi Türkiye ile Yunanistan'ı savaşın eşiğine getirdi. 1999 AGİT Zirvesi, Bakü–Tiflis–Ceyhan hattı ve 2001 ekonomik krizi dönemin diğer ayırt edici gelişmeleridir."
    ],
    ["Yeşil Kart", "Gümrük Birliği", "28 Şubat", "Kardak krizi", "DSP–MHP–ANAP"],
    ["Koalisyon–uygulama eşleştirmesi", "Kriz–ülke eşleştirmesi", "Aynı dönemde olan gelişmeler"],
    "Gümrük Birliği tam AB üyeliği değildir; malların dolaşımına ilişkin ekonomik bütünleşme adımıdır.",
    "90'lar: koalisyon, kart, gümrük, 28 Şubat, kriz."
  ),
  "TAR202U-8": g(
    [
      "2002 seçimleriyle AK Parti tek başına iktidara geldi. İlk dönemde AB uyum paketleri ve ekonomik istikrar programları öne çıktı. 1 Mart 2003 tezkeresinin reddi Türkiye–ABD ilişkilerinde belirleyici bir başlıktır; 2007'deki 367 krizi cumhurbaşkanı seçimiyle ilgilidir.",
      "Türk Konseyi'nin kurumsal temeli 2009 Nahçıvan Antlaşması'dır. 2010 sonrası bölgesel krizler, 15 Temmuz 2016 darbe girişimi ve 2017 anayasa değişikliği dönemin temel siyasal kırılmalarıdır."
    ],
    ["1 Mart Tezkeresi", "367 krizi", "Nahçıvan Antlaşması", "AK Parti–ABD ilişkileri", "2017 anayasa değişikliği"],
    ["Kriz hangi seçimle ilgili", "Antlaşma–kuruluş eşleştirmesi", "Dönem dışı gelişmeyi bulma"],
    "367 krizi hükûmet kurma veya erken seçim hesabı değil, TBMM'deki cumhurbaşkanı seçimi toplantı yeter sayısı tartışmasıdır.",
    "2003 tezkere, 2007 cumhurbaşkanı, 2009 Türk Konseyi."
  ),

  "WTK201U-1": g(
    [
      "İçerik yönetim sistemi; metin, görsel, video ve belgelerin üretilmesi, düzenlenmesi, sürümlenmesi ve yayımlanmasını ortak bir arayüzden yönetir. İçerik yönetim çatısı daha geniş ve geliştirici odaklı bir üst yapı olabilir; İYS ise son kullanıcının içerik iş akışını kolaylaştırır.",
      "Açık kaynak İYS ekosisteminde LAMP sık sorulur: Linux işletim sistemi, Apache web sunucusu, MySQL veritabanı ve PHP programlama dili. Windows bu açılımda yer almaz; Windows tabanlı karşılık çoğunlukla WAMP olarak anılır."
    ],
    ["LAMP bileşenleri", "kaynak kod", "öğrenme nesnesi", "İYS türleri", "içerik yönetim çatısı"],
    ["Bileşen değildir", "Tanımdan kavramı bulma", "Kullanım alanına göre tür değildir"],
    "LAMP içindeki ilk harf işletim sistemidir: Linux. Apache sunucu, MySQL veri, PHP koddur.",
    "L-A-M-P = Linux–Apache–MySQL–PHP."
  ),
  "WTK201U-2": g(
    [
      "Bir İYS'de yönetici sistem ayarları ve kullanıcı yetkileri üzerinde en geniş kontrole sahiptir. Editör içeriği gözden geçirip yayımlar; yazar içerik üretir; ziyaretçi veya abone daha sınırlı haklarla sistemi kullanır. Rol tabanlı yetkilendirme, herkese yalnız ihtiyaç duyduğu yetkiyi vermeyi amaçlar.",
      "Kurulumda sunucu, veritabanı ve yazma izinleri hazırlanır; ardından tema, eklenti, kullanıcı ve yayın akışı yapılandırılır. Güncelleme öncesi yedek, güçlü yönetici hesabı ve eklenti kaynağının güvenilirliği temel güvenlik adımlarıdır."
    ],
    ["yönetici–editör–yazar", "rol ve yetki", "tema–eklenti", "kurulum sırası", "yedekleme"],
    ["En yetkili kullanıcı", "Rolün yapabildiği işlem", "Kurulum adımlarını sıralama"],
    "Tema görünümü değiştirir; eklenti yeni işlev ekler. Kullanıcı rolü ise erişim sınırını belirler.",
    "Görünüm tema, işlev eklenti, izin rol."
  ),
  "WTK201U-3": g(
    [
      "WordPress PHP ile çalışır ve verileri MySQL/MariaDB'de tutar; phpMyAdmin veritabanını tarayıcıdan yönetmek için kullanılan araçtır. Yazılar tarihsel akış ve kategori/etiket yapısıyla, sayfalar daha kalıcı içeriklerle ilişkilidir.",
      "Yayın yönetimi yazıyı zamanlama, eski sürümleri görme ve yorumları yönetme gibi işlemleri kapsar. Görsel ve video dosyaları Ortam menüsünden yüklenir. TinyMCE Advanced gibi eklentiler düzenleyici yeteneklerini genişletir."
    ],
    ["PHP–MySQL", "phpMyAdmin", "yayın yönetimi", "Ortam menüsü", "TinyMCE Advanced"],
    ["Araç–işlev eşleştirmesi", "Yazı ve sayfa ayrımı", "Eklentiyi tanıma"],
    "phpMyAdmin WordPress'in kendisi veya veritabanı değildir; MySQL/MariaDB'yi yöneten web aracıdır.",
    "Kod PHP, veri MySQL, veri yönetimi phpMyAdmin."
  ),
  "WTK201U-4": g(
    [
      "Joomla'da makaleler kategorilerle düzenlenir ve menü öğeleri kullanıcıyı içeriğe veya bir bileşene götürür. Bileşen sayfanın ana işini, modül çevresel kutuları, eklenti ise belirli olaylarda çalışan genişletmeyi temsil eder.",
      "Yönetim panelindeki Sistem Bilgileri alanı işletim sistemi, PHP ve veritabanı sürümü gibi teknik ayrıntıları gösterir. Yardım menüsü dış kaynaklara yönlendirebilir; modüller ise arşiv, ilişkili makale veya giriş gibi özel görevler üstlenir."
    ],
    ["makale–kategori–menü", "bileşen–modül–eklenti", "Sistem Bilgileri", "Yardım menüsü", "makale modülleri"],
    ["Modülün görevini bulma", "Panel seçeneği–bilgi eşleştirmesi", "Ulaşılamayan yardım özelliği"],
    "Bileşen ana gövde, modül yan blok, eklenti olay temelli davranıştır.",
    "Joomla sayfasını tiyatro gibi düşün: bileşen sahne, modül dekor, eklenti sahne arkası mekanizması."
  ),
  "WTK201U-5": g(
    [
      "Drupal'ın temel gücü yapılandırılabilir içerik modelidir. İçerik türleri ve alanlar verinin biçimini, node içerik kaydını, taksonomi terimleri sınıflandırmayı, Views ise kayıtların sorgulanıp listelenmesini sağlar.",
      "Yönetim panelindeki Raporlar bölümü sistem olaylarına ve günlüklere erişmek için kullanılır. Modüller yetenek ekler; kullanıcı izinleri ayrıntılı biçimde tanımlanabilir. Drupal çoğunlukla MySQL/MariaDB veya PostgreSQL gibi ilişkisel veritabanlarıyla kullanılır."
    ],
    ["taksonomi/sözlük", "node", "içerik türleri", "Raporlar günlüğü", "veritabanı"],
    ["Sözlüğü oluşturan yapı", "Günlüğe hangi sekmeden erişilir", "İçerik türü ifadelerini değerlendirme"],
    "Taksonomi sınıflandırır; Views görüntülemek üzere sorgular. İkisi aynı araç değildir.",
    "Node içerik, taksonomi etiket düzeni, Views liste."
  ),
  "WTK201U-6": g(
    [
      "CraftCMS geliştirici odaklı, esnek içerik modeline sahip bir İYS'dir. Alanlar veri yapısını, entry içerik kaydını, section ise kayıtların örgütlenme biçimini belirler. Şablonlar Twig ile hazırlanır.",
      "Kurulum sorularında dosya ve klasör adları öne çıkar: veritabanı bağlantı ayarları config/db.php içinde; tablo ön eki tablePrefix alanında bulunur. Web'e açık giriş noktası public/index.php'dir. .htaccess yönlendirme kurallarıyla index.php'ye trafik aktarabilir; rebrand klasörü giriş logosu ve site ikonu gibi marka dosyalarıyla ilişkilidir."
    ],
    ["db.php", "tablePrefix", "public/index.php", ".htaccess", "rebrand"],
    ["Dosya–görev eşleştirmesi", "Klasör konumunu bulma", "Yapılandırma alanı"],
    "db.php bağlantı ayarıdır; .htaccess yönlendirmedir; public/index.php uygulamanın web girişidir.",
    "DB veri, htaccess rota, public giriş, rebrand görünür marka."
  ),
  "WTK201U-7": g(
    [
      "DotNetNuke/DNN, ASP.NET ve IIS ekosisteminde çalışan bir içerik yönetim platformudur. Sayfalar hücrelere ayrılır, HTML ve diğer modüller bu alanlara eklenir. Portal, site ve modül yönetimi rol tabanlı izinlerle yürütülür.",
      "Süper kullanıcı hem DNN kurulumunu hem de barındırılan siteleri yönetebilir; site yöneticisinin kapsamı kendi portalıyla sınırlıdır. HTTPS'in varsayılan bağlantı noktası 443'tür. DNN sınavlarında işlem sırası ve hangi rolün hangi panele eriştiği özellikle sorulur."
    ],
    ["ASP.NET/DNN", "süper kullanıcı", "HTML modülü", "HTTPS 443", "portal yönetimi"],
    ["Rol–yetki eşleştirmesi", "Modül ekleme adımlarını sıralama", "Varsayılan port"],
    "80 HTTP, 443 HTTPS'tir. Süper kullanıcı kurulum düzeyinde; yönetici site düzeyinde düşünülür.",
    "DNN = .NET; süper kullanıcı = bütün platform; HTTPS = 443."
  ),
  "WTK201U-8": g(
    [
      "İYS seçimi yalnız ürün özelliklerini saymak değildir. İçerik hacmi, kullanıcı sayısı, güvenlik, çoklu dil, teknik ekip, entegrasyon, ölçeklenebilirlik ve toplam sahip olma maliyeti birlikte değerlendirilir. Verisi hassas kurum, kontrolü kendi altyapısında tutmak için dahili barındırmayı tercih edebilir.",
      "Performans tarafında önbellek sık kullanılan veriyi işlemciye veya uygulamaya yakın tutar; yük dengeleme istekleri birden fazla sunucuya dağıtır. Anlamsal web, verinin makinelerce anlamlandırılıp farklı uygulamalar arasında yeniden kullanılabilmesini hedefler."
    ],
    ["önbellek", "yük dengeleme", "dahili barındırma", "veri güvenliği", "anlamsal web"],
    ["Senaryoya uygun barındırma", "Teknoloji–performans etkisi", "Tanımdan yeni eğilimi bulma"],
    "Önbellek veriyi yakında tutar; yük dengeleme trafiği dağıtır. İkisi farklı performans araçlarıdır.",
    "Yakında tut = önbellek; dağıt = yük dengeleme; anlamlandır = anlamsal web."
  ),

  "WTK210U-1": g(
    [
      "İnternet tabanlı uygulamada istemci istek gönderir, sunucu isteği işler ve HTTP üzerinden yanıt döndürür. HTML sayfanın yapısını, CSS görünümünü, JavaScript tarayıcı etkileşimini oluşturur. PHP, ASP.NET, Python ve Ruby gibi teknolojiler sunucu tarafında dinamik çıktı üretebilir.",
      "Alan adlarında .com ticari/genel kullanım, .gov kamu kurumları, .edu eğitim kurumlarıyla ilişkilidir. Localhost geliştiricinin kendi bilgisayarındaki yerel sunucuyu ifade eder; değişiklikler uzak sunucuya yüklenmeden önce burada denenebilir."
    ],
    ["istemci–sunucu", "HTTP/FTP/e-posta protokolleri", "alan adı uzantıları", "statik–dinamik", "localhost"],
    ["Protokol–işlev eşleştirmesi", "Domain kullanım amacı", "İstemci/sunucu tarafını ayırma"],
    "XAMPP/WAMP yerel sunucu paketidir; localhost ise kendi makinenizi gösteren adres/ortam kavramıdır.",
    "HTML yapı, CSS görünüm, JS etkileşim; sunucu dili dinamik çıktı."
  ),
  "WTK210U-2": g(
    [
      "PHP kodu <?php ... ?> etiketleri arasında yazılır ve sunucuda çalıştırılır. echo çıktı üretir; değişkenler $ ile başlar; sabitler define veya const ile tanımlanır. php.ini çalışma ayarlarının, phpinfo() ise mevcut yapılandırma bilgilerinin görülmesiyle ilişkilidir.",
      "Koşullar ve döngüler akışı kontrol eder; fonksiyonlar tekrar eden kodu isimlendirilmiş bir blokta toplar. Sınavda küçük kod parçalarının adım adım çalıştırılması istenir: atama ile eşitlik karşılaştırmasını, sayı ile metin birleştirmesini ayır."
    ],
    ["<?php ?>", "echo", "değişken–sabit", "php.ini/phpinfo", "fonksiyon"],
    ["Kod çıktısını bulma", "Tanımdan fonksiyonu seçme", "Yapılandırma dosyası"],
    "phpinfo() ayarı gösterir; php.ini ayarın tutulduğu ve değiştirildiği dosyadır.",
    "Göster = phpinfo; değiştir = php.ini; yazdır = echo."
  ),
  "WTK210U-3": g(
    [
      "PHP dizilerinde array_merge dizileri birleştirir, array_push sona eleman ekler, array_pop sondaki elemanı çıkarır. rand(min, max) belirtilen aralıkta rastgele sayı üretir. Fonksiyon parametrelerinde ... işareti değişken sayıda argüman alınmasını sağlar.",
      "Formlarda GET veriyi URL sorgusunda görünür biçimde, POST ise istek gövdesinde taşır. $_REQUEST her ikisinden veri okuyabilse de kaynağı belirsizleştirebilir. MySQLi bağlantısında tipik sıra sunucu, kullanıcı, parola, veritabanıdır; gerçek uygulamada hazırlanmış sorgular tercih edilir."
    ],
    ["array_merge/push/pop", "rand", "... değişken parametre", "GET–POST", "MySQLi bağlantısı"],
    ["Fonksiyonun sonucunu bulma", "Form yöntemi ifadesi doğru/yanlış", "Bağlantı parametresini tanıma"],
    "POST şifreleme sağlamaz; yalnız veriyi adres çubuğuna eklemez. Gizlilik için HTTPS gerekir.",
    "GET URL'de, POST gövdede; güvenli taşıma HTTPS ile."
  ),
  "WTK210U-4": g(
    [
      "JavaScript tarayıcıda çalışan etkileşim dilidir. DOM, HTML belgesini düğümlerden oluşan bir nesne ağacı gibi temsil eder. onload yükleme bitince, onclick tıklamada, ondblclick çift tıklamada çalışır; window.alert uyarı penceresi gösterir.",
      "Boolean tür true/false değerlerini tutar. ! mantıksal değeri tersine çevirir; && 've', || 'veya' işlemidir. Sınav küçük kodlarda operatörün sonucunu veya olayın ne zaman tetiklendiğini sorar."
    ],
    ["DOM", "onload/onclick", "window.alert", "Boolean", "! && ||"],
    ["Olay–tetiklenme eşleştirmesi", "Operatör sonucunu bulma", "Metodu tanıma"],
    "! değili, != eşit değildir karşılaştırmasıdır; tek başına ünlemle karşılaştırma yapılmaz.",
    "Yüklenince onload, tıklayınca onclick, uyarı için alert."
  ),
  "WTK210U-5": g(
    [
      "jQuery, DOM seçme ve değiştirme işlemlerini kısa sözdizimiyle yapar. append/prepend seçilen öğenin içine; before/after öğenin dışına içerik ekler. css stil değiştirir, remove öğeyi kaldırır, empty içeriğini boşaltır.",
      "Olay metotları click, dblclick ve keyup gibi kullanıcı davranışlarına bağlanır. Ajax, sayfanın tamamını yenilemeden sunucuyla veri alışverişi yapılmasını sağlar. jQuery Mobile'daki transition değerleri mobil sayfa geçiş efektlerini belirler."
    ],
    ["append/prepend/before/after", "dblclick", "Ajax", "DOM silme", "jQuery Mobile transition"],
    ["DOM'a veri eklemeyen metod", "Kod satırından olayı bulma", "Ajax tanımı"],
    "append ve prepend öğenin içine; before ve after öğenin yanına ekler. css veri ekleme metodu değildir.",
    "İçeri: append/prepend; dışarı: before/after; yenilemeden veri: Ajax."
  ),
  "WTK210U-6": g(
    [
      "C# güçlü tür denetimli bir dildir. for döngüsünde başlangıç bir kez, koşul her turdan önce, artış her turun sonunda çalışır. Bu yüzden i=0; i<5; i++ döngüsü 0,1,2,3,4 olmak üzere beş kez döner.",
      "Sınıflar veri ve davranışı birleştirir. private üye yalnız sınıfın içinden erişilebilir; public dışarıya açıktır; protected sınıf ve türeyen sınıflarla ilişkilidir. Kalıtım, bir sınıfın özellik ve metotlarını başka sınıfa aktarmasını sağlar."
    ],
    ["for döngüsü", "dizi tanımlama", "private/public", "kalıtım", "sınıf"],
    ["Ekrana kaç kez yazar", "Geçerli dizi tanımını bulma", "Erişim belirleyici"],
    "i<5 koşulu 5'i içermez. Başlangıç 0 ise beş, 1 ise dört tur çalışır.",
    "private içeride; public dışarıda; miras özellikleri aşağı taşır."
  ),
  "WTK210U-7": g(
    [
      "Python'da int, float, string ve boolean temel veri türleridir; len ise bir fonksiyondur. print fonksiyonundaki sep parametresi birden çok değerin arasına konacak ayırıcıyı belirler. Girinti kod bloklarının sınırıdır.",
      "Django'da model veritabanı yapısını, view istek mantığını, template sunumu temsil eder. ORM sayesinde SQL yazmadan nesneler üzerinden filtreleme yapılabilir: Ogrenci.objects.filter(...) bunun tipik örneğidir."
    ],
    ["Python veri tipleri", "print sep", "Django template", "ORM/filter", "model–view–template"],
    ["Veri tipi değildir", "Kod çıktısını bulma", "Django özelliğini tanıma"],
    "Python'da len tür değil fonksiyondur. Django view, klasik MVC'deki görünüm kelimesiyle bire bir aynı rolü çağrıştırmayabilir.",
    "Model veri, view işlem, template ekran; ORM SQL'i nesne diline çevirir."
  ),
  "WTK210U-8": g(
    [
      "Ruby dinamik ve nesne yönelimli bir dildir. Dizilerde push sona ekler, pop varsayılan olarak son elemanı çıkarır; reverse bir dizinin veya metnin sırasını tersine çevirir. length eleman ya da karakter sayısını verir, downcase küçük harfe dönüştürür.",
      "Ruby on Rails MVC düzenini ve 'convention over configuration' yaklaşımını kullanır. DRY ilkesi aynı bilgiyi veya kodu gereksiz tekrar etmemeyi hedefler. Sınavda çoğunlukla bir diziye art arda uygulanan işlemlerin son hâli sorulur."
    ],
    ["push/pop", "reverse", "length/downcase", "Ruby dizileri", "Rails MVC/DRY"],
    ["İşlem sırası sonunda dizi", "Metot–işlev eşleştirmesi", "Rails ilkesini tanıma"],
    "push ekler, pop çıkarır. reverse sonucu her dilde aynı biçimde yerinde değiştirmeyebilir; sorudaki atama ve çağrı biçimine dikkat et.",
    "Push it, pop it, reverse it: işlemleri soldan sağa tek tek yaz."
  ),

  "YBS302U-1": g(
    [
      "Bilgisayar ağları cihazların veri ve kaynak paylaşmasını sağlar. Protokol, mesaj biçimi ve iletim sırası gibi iletişim kurallarının bütünüdür. LAN yerel, WAN geniş alan ağıdır; ADSL telefon hattında ses ve veriyi farklı frekanslarda taşır.",
      "Topolojide yıldız merkezi cihaza, halka kapalı çevrime, örgü ise düğümler arası çoklu bağlantıya dayanır. Örgü topolojisi alternatif yollar sayesinde hata dayanıklıdır. Tekrarlayıcı zayıflayan sinyali güçlendirir; switch aynı ağdaki çerçeveleri, router farklı ağlar arasındaki paketleri yönlendirir."
    ],
    ["ADSL", "protokol", "ARPANET", "ağ topolojileri", "repeater–switch–router"],
    ["Tanımdan cihaz/topoloji bulma", "İlk paket anahtarlamalı ağ", "Ağ cihazı değildir"],
    "Repeater yalnız sinyali yeniler; switch MAC'e, router IP'ye göre yönlendirme yapar.",
    "Yenile=repeater, yerel dağıt=switch, ağlar arası=router."
  ),
  "YBS302U-2": g(
    [
      "Ağ yönetimi FCAPS başlıklarıyla hatırlanabilir: hata, yapılandırma, muhasebe, performans ve güvenlik yönetimi. Arızayı kaydetmek ve aksiyon almak hata yönetimi; kapasite, verim ve çıktı ölçmek performans yönetimidir.",
      "SNMP'de yönetici merkezden istek gönderir, ajan cihaz üzerindeki bilgiyi sunar, MIB yönetilen nesnelerin bilgi tabanıdır. GET okur, SET değiştirir, TRAP ise ajan tarafından beklenmedik olayı yöneticiye bildirir."
    ],
    ["hata yönetimi", "performans yönetimi", "yapılandırma", "SNMP", "MIB–agent–trap"],
    ["Senaryodan yönetim türü", "Bileşen–görev eşleştirmesi", "GET/SET/TRAP ayrımı"],
    "Arıza ve alarm hata yönetimi; hız, kapasite ve verim performans yönetimidir.",
    "FCAPS: Fault, Configuration, Accounting, Performance, Security."
  ),
  "YBS302U-3": g(
    [
      "Simetrik şifrelemede gönderen ve alan aynı gizli anahtarı kullanır. Hızlı olduğu için büyük veride etkilidir; temel zorluk anahtarın güvenli biçimde paylaşılmasıdır. Açık metin şifrelenmemiş özgün veri, şifreli metin algoritma çıktısıdır.",
      "AES 128 bit anahtarda 10, 192 bitte 12, 256 bitte 14 tur uygular. DES'in 56 bit etkin anahtarı günümüzde yetersizdir. Sezar şifresi harfleri sabit miktarda öteler; modern güvenlik için uygun değildir ama temel mantığı öğretir."
    ],
    ["açık metin", "simetrik anahtar", "AES tur sayıları", "DES", "Sezar şifresi"],
    ["Anahtar uzunluğu–tur sayısı", "Tanımdan şifreyi bulma", "Açık/şifreli metin"],
    "AES'te 14 tur sorulursa cevap 256 bittir; 128 bit 10 turdur.",
    "AES 128–10, 192–12, 256–14."
  ),
  "YBS302U-4": g(
    [
      "Asimetrik şifreleme açık ve özel anahtar çifti kullanır. Bir kişinin açık anahtarıyla şifrelenen veri yalnız onun özel anahtarıyla çözülebilir. Dijital imzada ise gönderen özel anahtarıyla imzalar; alıcı açık anahtarla doğrular.",
      "Hash fonksiyonu veriyi sabit uzunluklu özete dönüştürür. İmza kimlik doğrulama, bütünlük ve inkâr edememe sağlar; tek başına gizlilik sağlamaz. Ortadaki adam saldırısında saldırgan iki tarafın arasına girerek anahtar veya mesaj alışverişini manipüle eder."
    ],
    ["açık–özel anahtar", "dijital imza", "hash", "inkâr edememe", "ortadaki adam"],
    ["Kullanım amacı değildir", "Saldırı tanımını bulma", "İmzanın sağladığı özellik"],
    "Şifreleme gizlilik; imza doğrulama ve bütünlüktür. Açık anahtarlı sistem ikisini de farklı yönde anahtar kullanarak yapabilir.",
    "Gizlilikte alıcının açık anahtarı; imzada gönderenin özel anahtarı."
  ),
  "YBS302U-5": g(
    [
      "PKI, açık anahtarları kimliklerle ilişkilendiren sertifika ve sertifika otoritesi düzenidir. Sertifikada seri numarası, veren, geçerlilik tarihleri, öznenin bilgisi, açık anahtar ve imza algoritması gibi alanlar bulunur. Kerberos ise bilet tabanlı kimlik doğrulama yaklaşımıdır.",
      "Kimlik doğrulama bildiğin şey (parola), sahip olduğun şey (token/telefon) ve olduğun şey (biyometri) faktörlerine dayanabilir. Ses ve imza davranışsal; retina, parmak izi ve el geometrisi fizyolojik biyometri örnekleridir. Güçlü parola uzun, benzersiz ve tahmini zor olmalıdır."
    ],
    ["PKI", "sertifika alanları", "davranışsal biyometri", "güçlü parola", "çok faktörlü doğrulama"],
    ["Sertifika alanı değildir", "Biyometri türü", "Güçlü parolayı seçme"],
    "Ses çoğu ders sınıflamasında davranışsal; retina ve el geometrisi fizyolojiktir.",
    "Bil–sahip ol–ol: parola, token, biyometri."
  ),
  "YBS302U-6": g(
    [
      "TLS istemci ile sunucu arasında şifreli, bütünlüğü doğrulanan iletişim kurar; HTTPS, HTTP'nin TLS ile birlikte kullanılmasıdır. El sıkışmada taraflar algoritmalar üzerinde anlaşır, sunucu sertifikası doğrulanır ve oturum anahtarları üretilir.",
      "OSI modelinde sunum katmanı veri biçimleme, kodlama, sıkıştırma ve şifrelemeyle ilişkilidir. Kablosuz ağlarda WEP zayıf; WPA2 ve özellikle WPA3 daha güncel yaklaşımlardır. IEEE 802.11 çerçevesindeki FCS alanı iletim hatalarını tespit eder."
    ],
    ["TLS/HTTPS", "el sıkışma", "OSI sunum katmanı", "802.11 FCS", "WPA2/WPA3"],
    ["HTTPS hangi iki yapının birleşimi", "Katman–görev eşleştirmesi", "Çerçeve alanının görevi"],
    "HTTPS ayrı bir şifreleme algoritması değildir; HTTP trafiğinin TLS üzerinden taşınmasıdır.",
    "HTTP + TLS = HTTPS; biçimleme/şifreleme = sunum katmanı."
  ),
  "YBS302U-7": g(
    [
      "Spam filtresinde spam iletiye 'normal' denmesi yanlış negatif; normal iletiye 'spam' denmesi yanlış pozitiftir. Yanlış pozitif meşru iletinin kaybolmasına yol açabileceği için kritik kabul edilir. Phishing, güvenilir kurum görünümüyle parola veya finansal bilgi çalmaya çalışır.",
      "SPF hangi sunucuların alan adı adına posta gönderebileceğini belirtir. DKIM mesaja alan adı imzası ekler; DMARC SPF/DKIM sonuçlarına göre alıcının ne yapacağını söyler. PGP ve S/MIME ise ileti içeriğini şifreleme ve imzalamayla ilgilidir."
    ],
    ["yanlış pozitif/negatif", "phishing", "SPF", "DKIM–DMARC", "PGP/S-MIME"],
    ["Filtreleme hatasını bulma", "Sahte banka e-postası senaryosu", "Protokolün temel amacı"],
    "Normal posta çöpe gittiyse yanlış pozitif; spam içeri girdiyse yanlış negatiftir.",
    "Pozitif = spam kararı. Karar yanlışsa gerçek sınıfın tersini söyle."
  ),
  "YBS302U-8": g(
    [
      "Donanım bilgisayarın fiziksel ve elektronik bileşenleridir; yazılım program ve verilerden oluşur. Solucan kendini ağ üzerinden otomatik çoğaltır; Truva atı yararlı görünerek arka kapı açabilir; virüs yayılmak için çoğu zaman bir dosya veya kullanıcı eylemine bağlanır.",
      "Güvenlik duvarı ağ trafiğini kurallara göre izinli veya engelli olarak ayırır; antivirüsle aynı şey değildir. Risk, bir tehdidin açıklıktan yararlanıp zarar verme olasılığı ve etkisiyle ilişkilidir. Güncelleme, yedekleme, en az ayrıcalık ve günlükleme temel savunmalardır."
    ],
    ["donanım", "solucan", "Truva atı", "güvenlik duvarı", "tehdit–açıklık–risk"],
    ["Zararlı yazılım tanımı", "Güvenlik aracının amacı", "Tanımdan riski bulma"],
    "Firewall trafiği süzer; antivirüs zararlı yazılımı tespit etmeye çalışır. Biri diğerinin yerine geçmez.",
    "Tehdit kapıyı zorlar, açıklık kapının zayıflığıdır, risk içeri girip zarar verme ihtimalidir."
  )
};

const patternAnswers: Record<string, string[]> = {
  "TAR201U-1": ["İlk anayasa 1876 Kanun-ı Esasi; ilk meclisli dönem I. Meşrutiyet'tir.", "Tanzimat hak ve güvence, Islahat gayrimüslim hakları, Kanun-ı Esasi anayasal yönetimdir.", "Olayla doğrudan ilgisi olmayan veya dönem dışı seçenek elenir."],
  "TAR201U-2": ["Trablusgarp–Uşi; I. Dünya Savaşı–Mondros; parçalama tasarısı–Sevr.", "Mondros 7. madde işgale zemin hazırladı; Sevr Osmanlı'yı parçaladı.", "Savaşın tarihine, taraflarına veya doğrudan sonucuna uymayan seçenek elenir."],
  "TAR201U-3": ["Yararlı millî cemiyetler destekler; zararlı ve azınlık cemiyetleri desteklemez. Yararlı cemiyetler Sivas'ta birleşti.", "Amasya gerekçe-yöntem; Erzurum bölgesel toplanıp ulusal karar; Sivas ulusal kongre ve birleşmedir.", "Ulusal egemenlik ilk kez Amasya Genelgesi'ndeki ‘milletin azim ve kararı’ sözüyle açıkça vurgulandı."],
  "TAR201U-4": ["TBMM millî iradeye dayanır, yasama-yürütmeyi toplar ve İstanbul'a bağlı değildir.", "23 Nisan 1920 TBMM; 20 Ocak 1921 Teşkilat-ı Esasiye Kanunu'dur.", "Kuva-yı Milliye işgali yavaşlattı; disiplinsizliği düzenli orduyu gerekli kıldı."],
  "TAR201U-5": ["‘Hattı müdafaa yoktur, sathı müdafaa vardır’ sözü Sakarya'ya aittir.", "Doğu–Gümrü; Batı–Mudanya; Güney–Ankara Antlaşması eşleşir.", "I. İnönü → II. İnönü → Kütahya-Eskişehir → Sakarya → Büyük Taarruz → Mudanya."],
  "TAR201U-6": ["Kapitülasyonlar ve Ermeni yurdu reddedildi; tam bağımsızlıktan taviz verilmedi.", "Mudanya ateşkes, Lozan barış antlaşmasıdır.", "Kapitülasyonlar çözüldü; Musul ertelendi, Boğazlar 1936 Montrö ile değişti."],
  "TAR201U-7": ["Gerçek nedenlerle ilgisiz veya olaydan sonra gerçekleşen seçenek elenir.", "Terakkiperver 1924; Serbest Cumhuriyet Fırkası ve Menemen 1930'dur.", "Şeyh Sait İsyanı ve Menemen Olayı rejime yönelik gelişmelerdir."],
  "TAR201U-8": ["Musul–İngiltere/Irak; etabli–Yunanistan; Küçük Ağrı–İran; Hatay–Fransa/Suriye.", "Balkan Antantı batı, Sadabat Paktı doğu güvenliği; Montrö Boğaz egemenliğidir.", "Gerçekçilik, barışçılık ve tam bağımsızlık temel dış politika ilkeleridir."],
  "TAR202U-1": ["Darülbedayi İstanbul Şehir Tiyatrosu; Darülelhan İstanbul Konservatuvarı oldu.", "Tevhid eğitim birliği; Medeni Kanun hukuk-aile; Teşvik-i Sanayi üretim desteğidir.", "Tevhid eğitim, Medeni Kanun hukuk, Harf kültür, İzmir İktisat Kongresi ekonomidir."],
  "TAR202U-2": ["Nutuk Atatürk'ün eseridir; başka yazara ait eser seçeneği elenir.", "Egemenlik–cumhuriyetçilik; eşitlik–halkçılık; ekonomi–devletçilik; yenilik–inkılapçılık.", "Trablusgarp, Çanakkale, Kafkas ve Suriye-Filistin cephelerinde görev yaptı."],
  "TAR202U-3": ["Millî Korunma, Varlık Vergisi ve karne savaş ekonomisidir; Marshall savaş sonrasıdır.", "Truman güvenlik yardımı; Marshall ekonomik yardımdır.", "1945 Millî Kalkınma → 1946 Demokrat Parti ve seçim → 1950 iktidar değişimi."],
  "TAR202U-4": ["Traktörleşme tarım; kara yolu ulaşım; yabancı sermaye ekonomi alanındadır.", "6–7 Eylül, Kıbrıs gerilimi ortamında İstanbul Rumlarına yönelik saldırılardır.", "1950–1960 DP dönemine ait olmayan gelişme seçilir."],
  "TAR202U-5": ["1961 Anayasası kuvvetler ayrılığı, Anayasa Mahkemesi ve çift meclis getirdi.", "27 Mayıs 1960 darbe; 12 Mart 1971 muhtıra; 12 Eylül 1980 darbedir.", "Siyasi şiddet, istikrarsızlık ve ekonomik kriz darbeyi hazırlayan nedenlerdir."],
  "TAR202U-6": ["24 Ocak dışa açık, ihracata dayalı, piyasa ağırlıklı ekonomi programıdır.", "Faiz serbestliği ve denetimsiz banker büyümesi banker krizine yol açtı.", "Özal dışa açılma, ekonomik karşılıklı bağımlılık ve aktif bölgesel ilişkilere önem verdi."],
  "TAR202U-7": ["Yeşil Kart DYP–SHP; Gümrük Birliği 1996; 28 Şubat Refah–Yol dönemindedir.", "Kardak krizi Türkiye ile Yunanistan arasında yaşandı.", "Gümrük Birliği, 28 Şubat, Kardak, AGİT ve 2001 krizi bu dönemdedir."],
  "TAR202U-8": ["367 krizi 2007 cumhurbaşkanı seçimi toplantı yeter sayısıyla ilgilidir.", "2009 Nahçıvan Antlaşması Türk Konseyi'nin temelidir.", "1 Mart 2003; 367 krizi 2007; Nahçıvan 2009; 15 Temmuz 2016; değişiklik 2017."],
  "WTK201U-1": ["LAMP: Linux, Apache, MySQL, PHP; Windows bileşen değildir.", "İçerik üretme, düzenleme ve yayımlama işlevi İYS'yi anlatır.", "Portal, kurumsal, e-ticaret ve öğrenme İYS türleridir."],
  "WTK201U-2": ["En yetkili yönetici; editör yayımlar, yazar içerik üretir.", "Yönetici ayar-yetki; editör kontrol-yayın; yazar içerik üretimi yapar.", "Sunucu/veritabanı → izinler → kurulum → tema/eklenti → kullanıcı ve yayın ayarı."],
  "WTK201U-3": ["phpMyAdmin veritabanı; Ortam dosya; TinyMCE düzenleyici yönetir.", "Yazılar tarih-kategori akışında; sayfalar kalıcı içeriktir.", "TinyMCE Advanced düzenleyiciyi geliştiren eklentidir."],
  "WTK201U-4": ["Bileşen ana iş, modül çevresel kutu, eklenti olay temelli görevdir.", "İşletim sistemi, PHP ve veritabanı sürümü Sistem Bilgileri'nde görülür.", "Yardım dış kaynağa gider; modüller arşiv, giriş veya ilişkili makale gösterebilir."],
  "WTK201U-5": ["Taksonomi sözlük ve terimlerden oluşur.", "Günlüklere Raporlar sekmesinden erişilir.", "İçerik türü şablon, alan özellik, node tek içerik kaydıdır."],
  "WTK201U-6": ["db.php bağlantı; .htaccess yönlendirme; public/index.php web girişidir.", "Ayar config/db.php; marka rebrand; giriş public/index.php konumundadır.", "Tablo ön eki tablePrefix alanındadır."],
  "WTK201U-7": ["Süper kullanıcı tüm kurulumu; yönetici yalnız kendi portalını yönetir.", "Sayfa → hücre/pane → modül → içerik ve izin ayarları.", "HTTPS 443; HTTP 80 portunu kullanır."],
  "WTK201U-8": ["Hassas veri için dahili; düşük teknik yük için bulut barındırma uygundur.", "Önbellek yakında tutar; yük dengeleme istekleri dağıtır.", "Makinenin veriyi anlamlandırması anlamsal webdir."],
  "WTK210U-1": ["HTTP web, FTP dosya, SMTP e-posta gönderimiyle ilgilidir.", ".com ticari/genel, .gov kamu, .edu eğitim içindir.", "HTML-CSS-JS istemci; PHP, ASP.NET, Python ve Ruby sunucu tarafıdır."],
  "WTK210U-2": ["echo çıktı verir; değişken $ ile başlar; kod sırayla işletilir.", "Fonksiyon tekrar kullanılan kodu isimli blokta toplar.", "Yapılandırma php.ini; ayarları gösteren phpinfo()'dur."],
  "WTK210U-3": ["push sona ekler, pop sondan çıkarır, merge birleştirir.", "GET URL'de, POST gövdede taşır; POST şifreleme değildir.", "MySQLi sırası sunucu, kullanıcı, parola, veritabanıdır."],
  "WTK210U-4": ["onload yüklenince, onclick tıklayınca, ondblclick çift tıklayınca çalışır.", "! tersler, && ikisi de doğruysa, || biri doğruysa true verir.", "alert uyarı gösterir; DOM belgeyi nesne ağacı olarak temsil eder."],
  "WTK210U-5": ["css veri eklemez; append/prepend içeri, before/after dışarı ekler.", "click tıklama, dblclick çift tıklama, keyup tuş bırakmadır.", "Ajax sayfayı yenilemeden sunucuyla veri alışverişidir."],
  "WTK210U-6": ["i=0; i<5; i++ döngüsü 0–4 arasında 5 kez yazar.", "Geçerli örnek: int[] sayilar = {1, 2, 3};", "private sınıf içi, protected sınıf ve türeyenler, public dış erişimdir."],
  "WTK210U-7": ["len tür değil fonksiyondur; int, float, string ve boolean türdür.", "sep değerler arasına yazılan ayırıcıdır.", "Model veri, view işlem, template ekran; ORM nesneyle sorgudur."],
  "WTK210U-8": ["push ekler, pop çıkarır, reverse tersine çevirir; sırayla uygula.", "length uzunluk, downcase küçük harf, reverse ters çevirir.", "Rails MVC kullanır; DRY tekrarları azaltır."],
  "YBS302U-1": ["Merkezî cihaz yıldız, kapalı çevrim halka, çoklu bağlantı örgüdür.", "İlk paket anahtarlamalı ağ ARPANET'tir.", "Repeater, switch ve router ağ cihazıdır; ağ görevi olmayan aygıt elenir."],
  "YBS302U-2": ["Arıza-alarm hata; hız-kapasite performans; ayar değişikliği yapılandırmadır.", "Manager yönetir, agent bilgi sunar, MIB nesneleri tutar.", "GET okur, SET değiştirir, TRAP olay bildirir."],
  "YBS302U-3": ["AES 128–10, 192–12, 256–14 turdur.", "Aynı gizli anahtar simetrik; harf öteleme Sezar şifresidir.", "Açık metin özgün veri, şifreli metin algoritma çıktısıdır."],
  "YBS302U-4": ["Dijital imza gizlilik sağlamaz; doğrulama, bütünlük ve inkâr edememe sağlar.", "Araya girip mesajı değiştiren saldırı ortadaki adamdır.", "İmza kimlik doğrulama, bütünlük ve inkâr edememe sağlar."],
  "YBS302U-5": ["Sertifikada açık anahtar bulunur; özel anahtar bulunmaz.", "Ses-imza davranışsal; retina-parmak izi-el geometrisi fizyolojiktir.", "Güçlü parola uzun, benzersiz ve tahmini zordur."],
  "YBS302U-6": ["HTTPS = HTTP + TLS.", "Biçimleme, sıkıştırma ve şifreleme sunum katmanıdır.", "FCS iletim hatasını tespit eder."],
  "YBS302U-7": ["Normal postaya spam denmesi yanlış pozitif; spam'e normal denmesi yanlış negatiftir.", "Sahte banka e-postasıyla bilgi çalma phishing'dir.", "SPF yetkilendirir, DKIM imzalar, DMARC politika bildirir."],
  "YBS302U-8": ["Ağda çoğalan solucan; yararlı görünen Truva atı; dosyaya bağlanan virüstür.", "Firewall trafiği süzer; antivirüs zararlı yazılımı bulur.", "Risk, tehdidin açıklıktan yararlanıp zarar verme olasılığı ve etkisidir."]
};

export function getPatternAnswer(unitId: string, patternIndex: number) {
  return patternAnswers[unitId]?.[patternIndex] ?? "Bu kalıbın cevabı ünitenin kısa tekrar bölümünde özetlenmiştir.";
}
