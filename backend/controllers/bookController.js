import Book from "../models/Book.js";
import { isValidObjectId, findDocumentById } from "../utils/index.js";

const getAllBooks = async (req, res) => {
  try {
    /*
      Book, Mongoose modelidir ve MongoDB'deki "books" collection'ına bağlıdır.

      find(filter): 
        - Verilen filtreye uyan TÜM document'ları bir Array olarak döner.
        - Eğer filtre verilmezse, tüm kayıtları getirir.
        - Eğer hiçbir kayıt bulunamazsa boş bir dizi ([]) döner.
    */
    const books = await Book.find();

    // 200 HTTP durum kodu, sunucunun isteği başarıyla işlediğini belirtir.
    return res.status(200).json(books);
  } catch (error) {
    /*
      Eğer bir hata oluşursa (örneğin veritabanına bağlanılamazsa), 500 HTTP durum kodu döner.
      Bu hata, sunucu tarafında beklenmedik bir durum olduğunu ifade eder.

      || Ne demek?
      Eğer error.message tanımlıysa, yani bir değeri varsa (örneğin boş olmayan bir string), onu kullan.
      Eğer error.message falsy bir değer ise (örneğin undefined, null, "", 0, false), o zaman "Internal Server Error." string'ini kullan.
    */
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error." });
  }
};

const getABook = async (req, res) => {
  // URL parametresinden gelen id alınır.
  // (ES6(ECMAScript 2015) Destructuring assignment (Nesne parçalayıcı atama))
  const { id } = req.params;

  // ID geçerli bir MongoDB ObjectId mi? (utils/index.js'den import ettik.)
  if (!isValidObjectId(id)) {
    /* 
      400 (Bad Request) HTTP durum kodu, istemcinin (kullanıcı veya API) hatalı veya eksik veri gönderdiğini gösterir. Sunucu, gelen isteği anlayamaz veya geçersiz olduğu için işleyemez. Genellikle eksik alanlar, hatalı formatlar veya geçersiz ID'lerde kullanılır. 
    */
    return res.status(400).json({ error: "Object Id is not valid." });
  }

  try {
    // Kitabı veritabanından bulmaya çalışıyoruz. (utils/index.js'den import ettik.)
    const book = await findDocumentById(Book, id);

    // Kitap bulunamadıysa 404 Not Found döndürür. Bu durum, istemcinin geçerli ancak veritabanında bulunmayan bir kaynağa erişmeye çalıştığını ifade eder.
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error." });
  }
};

const createABook = async (req, res) => {
  try {
    /*
      req.body içindeki title ve author değerlerini değişkenlere atar.

      Olmasa ne olurdu?
      - const title = req.body.title;
      - const author = req.body.author;
    */
    const { title, author } = req.body;

    /* 
      Yukarıda destructuring ile aldığımız title ve author değişkenlerini bir nesne içinde MongoDB sorgusuna gönderiyoruz.
    
      Yani aslında şu nesneyi oluşturuyoruz: { title: "1984", author: "George Orwell" }

      Bu özellik JavaScript'te Shorthand Property Names (Kısa Nesne Özellikleri) olarak adlandırılır. ES6 (ECMAScript 2015) ile gelmiştir ve bir nesne oluştururken key ve value isimleri aynı olduğunda, kısa yazım (shorthand) kullanmamıza olanak tanır.
    */

    /*
      findOne(filter), verilen filtreye uyan ilk document'ı (belgeyi) getirir. Birden fazla eşleşme varsa ilk bulduğu document döner. Hiç eşleşme yoksa null döner.
    */
    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        error: "A book with same title and author already exist!",
      });
    }

    /*
      Book.create(req.body)
      ─────────────────────
      
      1. İstemciden gelen veriyi (req.body) alır.
       - Bu veri POST isteğiyle gönderilir.
       - Örnek veri: { title: "1984", author: "George Orwell", ... }

      2. Mongoose, bu veriyi schema üzerinden doğrular. (validation)
       - Zorunlu alanlar (required) kontrol edilir.
       - Veri tipleri (String, Number, Boolean vs.) kontrol edilir.
       - Min/max değerler veya karakter sınırları uygulanır.
       - Eğer geçersizse ValidationError fırlatılır.

      3. Verinin doğrulaması başarılıysa, Mongoose veriyi MongoDB'ye kaydeder.
       - Mongoose, veriyi BSON formatına çevirir.
       - MongoDB'ye yeni bir document olarak kaydeder.
       - MongoDB otomatik olarak:
          - _id alanı oluşturur.
          - createdAt ve updatedAt gibi timestamp'leri ekler. (eğer schema'da timestamps: true varsa)

      4. MongoDB, BSON formatındaki kayıt sonucunu döner.
       - Mongoose, bunu tekrar JavaScript nesnesine çevirir.
       - `newBook` değişkeni bu yeni kitabı temsil eden JS nesnesini tutar.
    */

    const newBook = await Book.create(req.body);

    /* 
      201 Created HTTP durum kodu, sunucunun yeni bir veri kaydını (örneğin bir kitap) başarıyla oluşturduğunu ifade eder.
      Genellikle yanıtla birlikte oluşturulan verinin kendisi (örneğin yeni kitap verisi) ve bilgilendirici bir mesaj (örneğin "Book created succesfully" mesajı) gönderilir.
    */
    return res.status(201).json({
      success: true,
      message: "Book created succesfully.",
      book: newBook,
    });
  } catch (error) {
    /*
      Eğer error nesnesinin name değeri "ValidationError" ise, bu, Mongoose’un validation hatası fırlattığını gösterir.Yani veritabanına kayıt olmaya çalışırken hatalar oldu!
      Örneğin, eğer title boşsa ve author 2 karakterden azsa, Mongoose otomatik olarak bir ValidationError oluşturur. Bu hatanın name değeri "ValidationError" olur ve bu if bloğu çalışır.
    */
    if (error.name === "ValidationError") {
      const errorResponse = checkValidationError(error); // (utils/index.js'den import ettik.)
      /*
      Mongoose validation hatası oluştuğunda 400 (Bad Request) HTTP durum kodu döndürüyoruz.

      Dönen örnek yanıt::
      {
        "error": "Validation error",
        "validationErrors": {
          "title": "Title is required",
          "author": "Author must be at least 3 characters"
        }
      }
      */
      return res.status(400).json(errorResponse);
    }

    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

const updateABook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageNumber, rating } = req.body;

  if (!isValidObjectId(id))
    return res.status(400).json({ error: "Object Id is not valid." });

  try {
    const book = await findDocumentById(Book, id, res); // (utils/index.js'den import ettik.)

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    /*
      Nullish Coalescing Operator (??) kullanımı
      ───────────────────────────────────────────
      - Bu operatör, yalnızca `null` veya `undefined` durumlarında sağdaki değeri kullanır.
      - ES2020 (ECMAScript 11) ile JavaScript'e eklenmiştir.
      
      Amaç:
      - Güncelleme sırasında yalnızca gönderilen alanlar değiştirilir.
      - Gönderilmeyen alanlar (undefined) veya null değerler eski haliyle korunur.
      - 0, false veya "" gibi falsy ama geçerli değerler korunur.
      
      Eğer || kullanılsaydı:
      - 0, "", false gibi değerleri de geçersiz sayardı. (istenmeyen bir durum)
      
      Örnek:
        title = undefined  → book.title eski değerini korur.
        rating = 0         → book.rating = 0 (çünkü geçerli bir değerdir.)
    */

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.pageNumber = pageNumber ?? book.pageNumber;
    book.rating = rating ?? book.rating;

    // Değişiklikleri MongoDB'ye kaydeder.
    await book.save();

    res.status(200).json({ message: "The book updated succesfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error." });
  }
};

const deleteABook = async (req, res) => {
  // URL parametresinden gelen id değerini alıyoruz.
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Object Id is not valid." });
  }

  try {
    // Kitap veritabanından sorgulanır. (utils/index.js'den import ettik.)
    const book = await findDocumentById(Book, id);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Kitap bulunduysa silinir.
    await book.deleteOne();

    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error." });
  }
};

export { getAllBooks, getABook, createABook, updateABook, deleteABook };
