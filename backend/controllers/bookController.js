import Book from "../models/Book.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
  }
};

const createBook = async (req, res) => {
  try {
    /*
    req.body içindeki title ve author değerlerini değişkenlere atar.

    Olmasa ne olurdu?
    const title = req.body.title;
    const author = req.body.author;
    
    Teknik adı → Destructuring Assignment (Nesne Yapılandırma Ataması) (ES6 (ECMAScript 2015))
    */
    const { title, author } = req.body;

    /* 
    Yukarıda destructuring ile aldığımız title ve author değişkenlerini bir nesne içinde MongoDB sorgusuna gönderiyoruz.
    
    Yani aslında şu nesneyi oluşturuyoruz: { title: "1984", author: "George Orwell" }

    Bu özellik JavaScript'te Shorthand Property Names (Kısa Nesne Özellikleri) olarak adlandırılır. ES6 (ECMAScript 2015) ile gelmiştir ve bir nesne oluştururken key ve value isimleri aynı olduğunda, kısa yazım (shorthand) kullanmamıza olanak tanır.
    */

    /* 
    Book → Mongoose modelidir ve MongoDB'deki books koleksiyonuna bağlıdır.
    .findOne({...}) → MongoDB'de belirtilen kriterlere uyan ilk kaydı getirir.
    */
    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      /* 
      res.status(400), HTTP yanıt kodunu 400 (Bad Request) olarak ayarlar.
      İstemci (kullanıcı veya API çağrısı), yanlış veya eksik bir veri gönderdiğinde kullanılır.
      Sunucu isteği anlayamıyorsa veya işleyemiyorsa bu hata kodu döndürülür. 
      res.json() zaten istemciye bir yanıt gönderiyor, ama return eklememizin nedeni fonksiyonun çalışmasını durdurmak.
      */
      return res.status(400).json({
        error: "A book with same title and author already exist!",
      });
    }

    /* 
    Book → MongoDB'deki books koleksiyonuna bağlı olan Mongoose modeli
    .create(data) → Yeni bir belge (document) oluşturur ve veritabanına kaydeder.
    */
    const newBook = await Book.create(req.body);

    /* 
    201 HTTP durum kodu, "Created" (Oluşturuldu) anlamına gelir.
    Sunucu başarılı bir şekilde bir kaynak oluşturduysa kullanılır.
    Yanıtla birlikte genellikle oluşturulan kaynağın bilgileri döndürülür.
    */
    return res
      .status(201)
      .json({ message: "Book created succesfully", book: newBook });
  } catch (error) {
    /*
    Eğer error nesnesinin name değeri "ValidationError" ise, bu, Mongoose’un doğrulama (validation) hatası fırlattığını gösterir.Yani veritabanına kayıt olmaya çalışırken hatalar oldu!
    Örneğin, eğer title boşsa ve author 2 karakterden azsa, Mongoose otomatik olarak bir ValidationError oluşturur. Bu hatanın name değeri "ValidationError" olur ve bu if bloğu çalışır.
    */
    if (error.name === "ValidationError") {
      // Boş bir object oluşturuyoruz. Hataları bu nesnenin içine kaydedeceğiz.
      const validationErrors = {};
      // error.errors içinde hangi alanların (title, author) hatalı olduğu bilgisini saklar.
      for (let field in error.errors) {
        /*
        Eğer Mongoose doğrulama hataları şu şekildeyse:
        {
          "errors": {
            "title": {
              "message": "Title is required"
            },
            "author": {
              "message": "Author must be at least 3 characters"
            }
          }
        }

        Döngü şu şekilde çalışır:

        field = "title"
        validationErrors["title"] = "Title is required";

        Şimdi validationErrors şu hale geldi:
        {
          "title": "Title is required"
        }

        field = "author"
        validationErrors["author"] = "Author must be at least 3 characters";

        Şimdi validationErrors şu hale geldi:
        {
          "title": "Title is required",
          "author": "Author must be at least 3 characters"
        }
        */
        validationErrors[field] = error.errors[field].message;
      }
      /*
      Hata varsa, 400 Bad Request kodu döndürülüyor.
      Hata mesajları validationErrors nesnesine kaydediliyor.
      İstemciye şu JSON yanıtı gönderiliyor:
      {
        "error": "Validation error",
        "validationErrors": {
          "title": "Title is required",
          "author": "Author must be at least 3 characters"
        }
      }
      */
      return res
        .status(400)
        .json({ error: "Validation error", validationErrors });
    } else {
      /* 
      500 HTTP durum kodu, sunucunun isteği işleyemediğini veya beklenmeyen bir hata aldığını gösterir.
      Bu hata, istemcinin değil, sunucunun içinde bir sorun olduğunu ifade eder.
      Genellikle yazılım hataları, veritabanı bağlantı sorunları, null referanslar veya beklenmeyen istisnalar nedeniyle oluşur.
      */
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
};

export { getAllBooks, createBook };
