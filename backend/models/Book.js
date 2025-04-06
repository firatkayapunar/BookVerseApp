// MongoDB ile çalışmak için mongoose kütüphanesini import ediyoruz.
import mongoose from "mongoose";

/*
---------------------------
MongoDB ve Mongoose Nedir?
---------------------------

1. MongoDB, collection bazlı bir veritabanıdır.
   - Her collection'ın içinde birden fazla document bulunur.
   - Her document, örneğin bir kitabı temsil eden JSON-benzeri bir yapıdır.

2. Mongoose, Node.js ortamında MongoDB ile çalışmayı kolaylaştıran bir ODM (Object Data Modeling) kütüphanesidir.
   - Schema tabanlı yapı sunarak, verilerin nasıl görüneceğini tanımlar ve kontrol altında tutar.

3. Mongoose kullanmadan da doğrudan MongoDB ile çalışmak mümkündür.
   - Bunun için MongoDB'nin resmi Node.js istemcisi olan 'mongodb' (Native Driver) kullanılabilir.
   - Native Driver, veritabanına doğrudan bağlanmamızı sağlayan resmi istemci kütüphanesidir.

---------------------------
MongoDB’nin Çalışma Mantığı
---------------------------

- Collection: İlişkisel veritabanlardaki "tablo" yapısının karşılığıdır.
- Document: Tek bir veri öğesini temsil eder. İlişkisel veritabanlarındaki "satır" yapısına denktir.

Temel fark:
- MSSQL (SQL Server): Tablo tabanlıdır, veriler farklı tablolarda tutulur ve ilişkilerle (JOIN) birleştirilir.
- MongoDB: Document tabanlıdır, ilişkili tüm veriler tek bir document içinde tutulabilir. Bu yapı, daha hızlı okuma/yazma işlemleri sağlar.

Sonuç:
- MSSQL: Veriler parçalı ve ilişkilidir.
- MongoDB: Veriler bütünleşik ve bağımsızdır.
*/

/*
---------------------------------
Mongoose ve Doğrulama (Validation)
---------------------------------

Mongoose ile veriler için şema tanımlanabilir. 
Şema sayesinde:
- Her alanın tipi belirlenebilir.
- Zorunluluklar (required) ve varsayılan değerler (default) tanımlanabilir.
- Metinler için minimum ve maksimum karakter sayısı ayarlanabilir.
- Sayılar için min ve max sınırları konabilir.
- Boşluk temizleme (trim) yapılabilir.
*/

// Kitaplar için schema tanımı yapıyoruz.
const bookSchema = new mongoose.Schema(
  {
    // Book title
    title: {
      type: String,
      required: [true, "Book title is required."],
      trim: true,
      minlength: [2, "Book title must be at least 2 characters."],
      maxlength: [200, "Book title must be at most 200 characters."],
    },
    // Book author
    author: {
      type: String,
      required: [true, "Author name is required."],
      trim: true,
    },
    // Book description
    description: {
      type: String,
      trim: true,
      default: "No description available.",
    },
    // Total number of pages
    pageNumber: {
      type: Number,
      required: [true, "Page number is required."],
      min: [1, "A book must have at least 1 page."],
    },
    // User rating (0–10)
    rating: {
      type: Number,
      required: [true, "Book rating is required."],
      min: [0, "Rating cannot be less than 0."],
      max: [10, "Rating cannot be more than 10."],
      default: 5,
    },
  },
  {
    // createdAt ve updatedAt alanlarını otomatik olarak ekler.
    timestamps: true,
  }
);

/*
---------------------------------------
mongoose.model() Fonksiyonunun Mantığı
---------------------------------------

Bir model, belirli bir collection içindeki document'ları temsil eder.

Genel kullanım:
  const ModelAdı = mongoose.model("ModelAdı", schema);

Parametreler:
1. Model adı:
   - Tekil (singular) olarak yazılır.
   - Mongoose bu ismi küçük harfe çevirip çoğul (plural) hale getirerek ilgili collection adını otomatik oluşturur.
   - Örneğin: "Book" → MongoDB'de "books" adında bir collection oluşur.

2. Şema:
   - Modelin hangi şemayı kullanacağını belirtir.
   - Bu şema, document'ların yapısını ve kurallarını tanımlar.
*/

// Book modeli, MongoDB’deki "books" collection'ındaki her bir document’i temsil eder.
const Book = mongoose.model("Book", bookSchema);

export default Book;
