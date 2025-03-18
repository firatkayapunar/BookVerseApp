import express from "express";
import bookRoute from "./routes/bookRoute.js";
import connectDB from "./config/db.js";

/*
Nedir?
Bu satır, Express adlı bir "araç seti" kullanarak yeni bir web uygulaması oluşturur. Yani, Express bizim dükkânının kapısını açar.

Neden Önemli?
Bu app nesnesi, uygulamanın tamamını kontrol eden ana nesnedir. Tüm istekleri (müşterilerin) dinlemek, bu istekleri işlemek (ne yapacaklarına karar vermek) ve cevap göndermek (müşteriye hizmet vermek) için bu nesneyi kullanırız.
*/
const app = express();

/*
Nedir?
Bu satır, uygulamanın hangi "kapıdan" (port) müşterileri kabul edeceğini belirler. Burada 3000 numaralı kapı seçilmiş durumda.

Neden Önemli?
İnternette bir bilgisayarın birçok kapısı (portu) olabilir. Uygulamanın hangi kapıdan çalışacağını bilmek, müşterilerin (istemcilerin) doğru adrese ulaşmasını sağlar.
Mesela, dükkânın kapısı 3000 numaralı kapıysa, insanlar http://localhost:3000 adresine geldiklerinde dükkâna ulaşırlar.
*/
const port = 3000;

/*
====================================================================
Express.js Nedir ve Web Sunucusu Barındırır mı?
====================================================================

Express.js nedir?
1. Express.js, Node.js üzerinde çalışan ve yalnızca backend (sunucu tarafı) geliştirme için kullanılan esnek bir web application framework’tür. Uygulamaya Express eklemek için "npm install express" komutu kullanılır.
2. Node.js'in yerleşik http modülü üzerine kuruludur; bu sayede HTTP istek ve yanıtlarını kolaylıkla yönetebilir.
3. Express.js; kolay route yönetimi, middleware entegrasyonu ve JSON verilerinin otomatik parse edilmesi gibi kolaylıklar sunar. Bu sayede geliştirme süreci daha hızlı, modüler ve bakımı daha kolay hale gelir.

!!! Node.js ile tek başına da web application yapılabilir, ancak Express.js geliştirme sürecinde yukarıda bahsedilen kolaylıkları sağlayarak işleri çok daha basitleştirir.

Express.js kendi başına bir web sunucusu mudur?
- Hayır, Express.js tek başına bir web sunucusu değildir.
- Asıl sunucu görevi Node.js'in http modülü tarafından yerine getirilir.

Özet:
- Node.js + http modülü: Temel HTTP istek-yanıt yönetimi sağlar. Bu yöntem, rota ve veri yönetiminin manuel yapılmasını gerektirdiğinden büyük projelerde zor yönetilir.
- Node.js + http modülü + Express.js: Daha kolay route tanımlama, middleware kullanımı, JSON yönetimi ve modüler geliştirme kolaylıkları sunar.
*/

/*
====================================================================
Express.js'in İşletim Sistemine Kaydı
====================================================================

Express.js uygulamamızda `app.listen(3000, ...)` ifadesini kullandığınızda, şu adımlar gerçekleşir:
1. TCP Port Açma Talebi
   - Node.js, yerleşik http modülü üzerinden işletim sistemine 3000 numaralı portu açma talebinde bulunur.
2. İşletim Sistemi Onayı
   - İşletim sistemi, bu talebi inceler; eğer 3000 numaralı port başka bir uygulama tarafından kullanılmıyorsa, portu açar ve Express.js uygulamamıza tahsis eder.
   - Ayrıca, localhost üzerinden gelen istekler doğrudan bilgisayarımıza yönlendirileceği için, işletim sistemi mevcut uygulamalar arasında hangi uygulamaya portun tahsis edildiğini kontrol eder.)
3. HTTP İsteklerinin Yönlendirilmesi
   - Artık 3000 portu dinlenmeye başlar. Bu port üzerinden gelen tüm HTTP istekleri, Express.js uygulamanıza ulaşır ve tanımlı route'lar ile middleware'ler aracılığıyla işlenir. Böylece, Express.js uygulaması işletim sistemine "ben 3000 numaralı portu dinleyeceğim" diyerek kaydedilir ve bu port üzerinden gelen trafiği yönetir.
*/
 
/*
====================================================================
Express ile HTTP İstek İşleme Adımları, Middleware Zinciri ve Şeması
====================================================================

Express.js, Node.js’in yerleşik http modülü tarafından oluşturulan request ve response nesnelerini alır ve geliştirir. Bu sayede, uygulamamızdaki route handler’lar ve middleware’ler, HTTP isteklerini daha zengin özelliklere sahip nesneler üzerinden işleyebilir.

------------------------------------------------------------
1. Request (req) Nesnesi
------------------------------------------------------------

Express, gelen HTTP isteğiyle Node.js’in http modülü tarafından oluşturulan "req" nesnesini genişleterek aşağıdaki özellikleri ekler:
- req.body    : Gönderilen veriyi (JSON, form verisi vb.) içerir.
- req.params  : URL’deki dinamik parametreleri barındırır (örn: /books/:id).
- req.query   : URL query string parametrelerini içerir (örn: ?page=2).
- req.cookies : İstemciden gönderilen çerezleri yönetir.
- req.ip      : İstek yapan istemcinin IP adresini verir.
- req.get()   : Belirli bir HTTP başlığının değerini döndürür.

------------------------------------------------------------
2. Response (res) Nesnesi
------------------------------------------------------------

Node.js’in http modülü, her HTTP isteğine karşılık bir "res" nesnesi oluşturur. Express, bu nesneyi genişleterek aşağıdaki yardımcı metotları ekler:
- res.json(data)   : Veriyi JSON formatında gönderir.
- res.send(data)   : HTML, JSON veya düz metin şeklinde yanıt döner.
- res.status(code) : HTTP durum kodunu ayarlar (örn: res.status(404).send("Bulunamadı")).
- res.redirect(url): İstemciyi belirli bir URL’ye yönlendirir.
- res.set(header, value) : Yanıt başlıklarını ayarlar.
- res.cookie(name, value): İstemciye çerez gönderir.

Önemli Not:
- Hem req hem de res nesneleri, HTTP isteği geldiğinde Node.js'in http modülü tarafından oluşturulur ve Express tarafından genişletilir. Bu genişletme, Express’in ek metotlar ve özellikler ekleyerek geliştirilmiş bir API sunmasını sağlar.
- Express, req ve res nesnelerini middleware’ler ve route handler’lar arasında otomatik olarak taşır.

------------------------------------------------------------
3. Middleware Nedir?
------------------------------------------------------------

Middleware, Express uygulamasında request ile response arasında çalışarak çeşitli işlemleri gerçekleştiren fonksiyonlardır. Yani, bir request'in server'a ulaşması ya da response gönderilmeden önce araya girip, processing, validation, logging veya authentication gibi görevleri yerine getirir.

Processing: 
- Gelen veriyi parse etmek (örneğin, express.json()).

Validation: 
- Request içerisindeki verilerin doğruluğunu kontrol etmek.

Logging: 
- Request ve response bilgilerini kaydetmek.

Authentication: 
- Kullanıcının yetkili olup olmadığını kontrol etmek.

Direct Response: 
- Bazı durumlarda middleware, doğrudan response üreterek zinciri sonlandırabilir.

------------------------------------------------------------
4. Middleware Types
------------------------------------------------------------

Express’te iki ana middleware türü vardır:

a. Global Middleware
Uygulamanın tüm request'lerinde çalışması gereken işlemleri gerçekleştirmek.

Örnek:
- app.use(express.json());
- Bu kullanım, tüm request'lerde gelen JSON verisini otomatik olarak parse eder ve req.body'ye aktarır.

Özellikler:
- Uygulama seviyesinde tanımlandığından, server başlatıldığında devreye girer.
- Her request üzerinde çalıştığı için tek bir tanımlamayla global olarak uygulanır.

******************************

b. Route-based (Custom) Middleware
Sadece belirli bir route veya route group üzerinde çalışarak, ilgili işlemleri gerçekleştirmek.

Örnek:
- app.use("/api/v1/books", bookRoute);
- Bu kullanım, yalnızca URL'si "/api/v1/books" ile başlayan request'leri bookRoute içindeki middleware ve route handler’lara yönlendirir.

Özellikler:
- Sadece belirli URL pattern'lerine uygulanır.
- İlgili route'a özel işlemleri (örneğin, authentication veya logging) yapar.
- Global middleware'e göre daha seçici çalışır ve gereksiz yük oluşturmaz.

------------------------------------------------------------
5. Genel İşleyiş (Request-Response Cycle)
------------------------------------------------------------

a. Request'in Alınması
- Node.js’in http module’ü, client tarafından gönderilen HTTP request’i alır.
- Bu request, Express uygulamasına iletilir. Burada request, URL, method (GET, POST, vb.), header bilgileri ve body (varsa) gibi veriler içerir.

!!! req ve res Nesnelerinin Oluşumu:
- Node.js, gelen HTTP isteği için req (request) ve res (response) nesnelerini oluşturur.
- Express, bu nesneleri alır ve kendi özelliklerini ekleyerek kullanıma hazır hale getirir. Böylece, Express içinde req ve res nesneleri üzerinde ek methodlar (örn: res.send(), res.json(), vs.) bulunur.

******************************

b. Global Middleware’lerin Çalışması
- Express uygulamasında, tüm request’ler için geçerli olan global middleware’ler tanımlanmıştır.
- Örneğin, app.use(express.json()) global middleware’i, gelen request’lerin body kısmında JSON verisi varsa bunu otomatik olarak parse eder.

!!! Sıralama ve Nesnelerin Taşınması:
- Global middleware’ler, tanımlandıkları sıraya göre çalışır. Yani, dosyanızda bu middleware’leri nereye koyduysanız, o noktadan itibaren gelen tüm isteklerde etkili olur.
- req ve res nesneleri, middleware zinciri boyunca aynı referans olarak aktarılır; bu sayede her middleware, önceki işlemlerden gelen veriye erişebilir veya ek bilgiler ekleyebilir.

******************************

c. URL Eşleşmesi ve Route-based Middleware’e Yönlendirme
- Express, request’in URL’sini kontrol eder.
- Eğer URL, belirli bir rota için tanımlı route-based middleware ile eşleşiyorsa, örneğin app.use("/api/v1/books", bookRoute) tanımında olduğu gibi, Express bu isteği bookRoute adlı modüle yönlendirir.
- Eğer URL eşleşmiyorsa, Express sonraki middleware’e geçer veya eşleşmeyen istekler için 404 hatası üretebilir.

!!! Nesnelerin Devamlılığı:
- Route-based middleware’e geçişte, req ve res nesneleri önceden yapılan global işlemleri taşır ve aynı referans üzerinden devam eder. "Global işlemler", global middleware'ler tarafından tüm isteklerde uygulanan ve req nesnesinde yapılan düzenlemeleri ifade eder. 

******************************

d. BookRoute’un Amacı
- BookRoute, uygulamanın genel rotası altında belirli bir URL deseniyle (örneğin, /api/v1/books) eşleşen istekleri karşılamak üzere oluşturulan bir modüldür. Bu modül içinde, ilgili isteklere özel işlemler yapmak için custom middleware’ler ve route handler’lar yer alır. 
- Route modülü (örneğin, bookRoute) içinde tanımlı custom middleware’ler, ek işlemleri gerçekleştirir (logging, authentication, validation).

******************************

e. Route Handler ve Response Metotları
- İlgili route handler, işlemleri tamamladıktan sonra res.send(), res.json() veya res.end() gibi method’ları kullanarak yanıt üretir.
- Yanıt üretildikten sonra, middleware zinciri burada sonlanır ve oluşturulan yanıt client’a iletilir.
- Eğer middleware zincirinin sonunda herhangi bir route handler veya middleware response üretmez ve zincir tamamlanırsa, Express otomatik olarak 404 (Not Found) hatası döner. Middleware zinciri hiç tamamlanmaz ve bir yerde takılırsa, request sonsuza kadar bekleme durumunda kalabilir.
 
*/

app.use(express.json());

app.use("/api/v1/books", bookRoute);

/*
Veritabanı Bağlantısı ve Sunucu Başlatma:
- connectDB() fonksiyonu, veritabanı bağlantısını kurar.
- Bağlantı başarılı ise, app.listen() ile sunucu belirtilen portta dinlemeye başlar.
- Hata durumunda, process.exit(1) çağrılarak uygulama sonlandırılır.
*/
try {
  // Veritabanına bağlanılıyor.
  await connectDB();

  // Sunucu belirtilen portta başlatılıyor.
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
  });
} catch (error) {
  /* 
  Node.js, "process.exit(1);" gördüğünde şu adımları sırasıyla uygular:
  - Node.js, programın çalışmasını hemen keser.
  - Geri kalan hiçbir kod çalıştırılmaz.
  */
  process.exit(1);
}
