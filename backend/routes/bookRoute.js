import express from "express";
import * as bookController from "../controllers/bookController.js";

/*
PROJE MİMARİSİ: Katmanlar Arası İlişki
───────────────────────────────────────────────

Bu dosya, Express.js uygulamasında "routing" (yönlendirme) görevini üstlenir.
Yani istemciden gelen isteklerin hangi controller fonksiyonuna yönlendirileceğini belirler.

1) server.js → Uygulamanın giriş noktası
────────────────────────────────────────
  - Express uygulaması burada başlatılır.
  - Route dosyaları bu dosyada tanıtılır. Örneğin, server.js "Sen şuraya gelen istekleri al, bookRoutes dosyasına gönder" der. bookRoutes.js ise "Tamam, bana geldi. Bu URL şu fonksiyona gidecek" der. 
  - Eğer böyle bir yaklaşım tercih etmeseydik, server.js dosyası içerisinde tüm route'ları tek tek yazmak zorunda kalırdık. Bu da kodun karmaşıklaşmasına ve yönetilmesinin zorlaşmasına neden olurdu. => app.get("/api/v1/books", getAllBooks);  

  Örnek:
    import bookRoutes from "./routes/bookRoutes.js";
    app.use("/api/v1/books", bookRoutes);

  Anlamı:
    "/api/v1/books" ile başlayan tüm istekleri `bookRoutes.js` dosyasına yönlendir.

2) routes/bookRoutes.js → Bu dosya
──────────────────────────────────
  - Belirli bir URL ve HTTP metoduna göre hangi controller fonksiyonunun çalışacağını belirler.
  - Modüler yapı sağlar, her kaynak (örneğin kitaplar) için ayrı route dosyası yazılabilir.

  Örnek:
    router.get("/", bookController.getAllBooks);

  Anlamı:
    "/api/v1/books" adresine GET isteği gelirse, getAllBooks fonksiyonunu çalıştır.

  Not:
    const router = express.Router();
    - Bu satır, bir router (yönlendirici) nesnesi oluşturur.
    - Bu router, kendi içinde route'ları tanımlar ve `server.js` içinde bir base path ile birleştirilir.
    - Örneğin: server.js → app.use("/api/v1/books", bookRoutes);
      Bu durumda: router.get("/") → gerçekte "/api/v1/books"

3) controllers/bookController.js → Controller katmanı
─────────────────────────────────────────────────────
  - Veritabanı işlemleri, validation ve yanıt döndürme burada yapılır.
  - `req` (request) ve `res` (response) nesneleri burada kullanılır.
  - Her route için ilgili iş mantığı burada yazılır.

  Örnek:
    export const getAllBooks = async (req, res) => { ... };

───────────────────────────────────────────────
Özet Akış:
İstemci → server.js → bookRoutes.js → bookController.js → Mongoose/Veritabanı → Yanıt

Bu yapı, RESTful API geliştirme sürecinde temiz, sürdürülebilir ve ölçeklenebilir mimari sağlar.
*/

const router = express.Router();

/*
Route: /api/v1/books
──────────────────────────────
→ GET     /api/v1/books        → Tüm kitapları getir.
→ POST    /api/v1/books        → Yeni kitap oluştur.
*/
router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createABook);

// router.get("/", bookController.getAllBooks);
// router.post("/", bookController.createABook);

/*
Route: /api/v1/books/:id
──────────────────────────────
→ GET     /api/v1/books/:id    → Belirli kitabı getir.
→ PUT     /api/v1/books/:id    → Belirli kitabı güncelle.
→ DELETE  /api/v1/books/:id    → Belirli kitabı sil.
*/
router
  .route("/:id")
  .get(bookController.getABook)
  .put(bookController.updateABook)
  .delete(bookController.deleteABook);

// router.get("/:id", bookController.getABook);
// router.put("/:id", bookController.updateABook);
// router.delete("/:id", bookController.deleteABook);

export default router;
