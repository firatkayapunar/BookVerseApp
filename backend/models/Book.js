// MongoDB ile çalışmak için mongoose kütüphanesini içe aktarıyoruz.
import mongoose from "mongoose";

/*
---------------------------
MongoDB ve Mongoose Nedir?
---------------------------

1. MongoDB, collection (koleksiyon) bazlı bir veritabanıdır.
  - Her koleksiyonun içinde document (belgeler) bulunur ve her belge, tek bir veriyi (örneğin bir kitabı) temsil eder.

2. Mongoose, Node.js ortamında MongoDB veritabanı ile çalışmayı kolaylaştıran bir ODM (Object Data Modeling) kütüphanesidir.
  - Bir nevi MongoDB ile MSSQL arasındaki farkı azaltır, çünkü şema tabanlı bir yapı sağlar.

3. Ancak, Mongoose kullanmadan da doğrudan MongoDB ile çalışmak mümkündür.
  - Bu durumda, MongoDB'nin resmi Node.js istemci kütüphanesi olan 'mongodb' kullanılabilir. 'mongodb' bir native olarak olarak adlandırılır. Native Driver, bir veritabanına doğrudan bağlanmamızı sağlayan resmi istemci kütüphanesidir.

---------------------------
MongoDB’nin Çalışma Mantığı
---------------------------
Collection (Koleksiyon):
  - MongoDB’de koleksiyonlar, ilişkisel veritabanlarındaki tabloların karşılığıdır.
Document (Belge):
  - Her belge, JSON-benzeri bir veri yapısına sahip tekil bir öğedir. İlişkisel veritabanlarında satırların karşılığıdır.

En büyük fark:
    - MSSQL (SQL Server): Tablo tabanlıdır ve veriler arasındaki bağlantıları (ilişkileri) JOIN gibi işlemlerle birleştirir.
    - MongoDB: Doküman tabanlıdır ve veriler JSON-benzeri nesneler (BSON) olarak saklanır. JOIN işlemi yoktur, çünkü tüm veriler tek bir dokümanda tutulabilir.

Özetle:
    - MSSQL (SQL Server): Veri parçalarını farklı tablolara böler ve ilişkileri kullanarak birleştirir.
    - MongoDB: Veriyi tek bir dokümanda saklar, bu yüzden daha hızlı okuma/yazma yapabilir.

----------------------
Örnek MongoDB Yapısı
----------------------

Bir "books" koleksiyonundaki belgeler şu şekilde olabilir:

[
  {
    "_id": "605c72ac8f1b2c001f6444b1",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "pageNumber": 310,
    "rating": 9,
    "createdAt": "2025-03-16T10:00:00.000Z",
    "updatedAt": "2025-03-16T10:00:00.000Z"
  },
  {
    "_id": "605c72ac8f1b2c001f6444b2",
    "title": "1984",
    "author": "George Orwell",
    "pageNumber": 328,
    "rating": 8,
    "createdAt": "2025-03-16T11:00:00.000Z",
    "updatedAt": "2025-03-16T11:00:00.000Z"
  }
]

----------------------------
MongoDB Veriyi Nasıl Saklar?
----------------------------

1. Uygulamadan Veri Gönderirken:
   - Uygulamamızda veriler genellikle JSON formatında hazırlanır.
   - JSON, insan tarafından kolayca okunabilen ve yazılabilen bir veri formatıdır.
   Örnek JSON verisi:
   {
     "title": "The Hobbit",
     "author": "J.R.R. Tolkien",
     "pageNumber": 310,
     "rating": 9
   }
   
2. MongoDB'ye Veri Gönderimi:
   - Bu JSON verisi, uygulamamız tarafından MongoDB'ye gönderilir.
   - MongoDB, gönderilen bu JSON verisini alır.

3. MongoDB'nin Saklama İşlemi (BSON Dönüşümü):
   - MongoDB, veriyi alır almaz, JSON verisini daha verimli olan BSON (Binary JSON) formatına dönüştürür.
   - BSON, JSON'a çok benzer fakat bilgisayarlar tarafından daha hızlı işlenebilen ikili (binary) bir formattır.
   - Ayrıca, MongoDB veriye bazı ek bilgileri (örneğin, otomatik oluşturulan _id, tarih bilgileri) ekler.
   
   Örnek olarak, yukarıdaki JSON verisinin MongoDB’de saklanmış hali şu şekildedir:
   {
     "_id": ObjectId("605c72ac8f1b2c001f6444b1"),
     "title": "The Hobbit",
     "author": "J.R.R. Tolkien",
     "pageNumber": NumberInt(310),
     "rating": NumberInt(9),
     "createdAt": ISODate("2025-03-16T10:00:00.000Z"),
     "updatedAt": ISODate("2025-03-16T10:00:00.000Z")
   }
   
4. Veri Alırken (Geri Okuma İşlemi):
   - MongoDB'den veri çekildiğinde, veriler aslında BSON formatındadır.
   - Ancak, MongoDB (ve Mongoose) bu veriyi uygulamamızın anlayabileceği JSON yapıya çevirir.
   - Böylece, uygulamamız JSON ile rahatça çalışır.

Özetle:
- Gönderirken: Uygulamamız JSON formatında veri oluşturur ve MongoDB'ye gönderir.
- Saklanırken: MongoDB bu JSON verisini otomatik olarak daha hızlı ve verimli işlenebilen BSON formatına dönüştürür.
- Alırken: MongoDB veriyi BSON formatından JSON formata çevirip uygulamamıza sunar.

Bu süreç, verilerin hem veritabanında hızlı saklanmasını hem de uygulamamız tarafından kolayca kullanılmasını sağlar.
*/

/*
---------------------------------
Mongoose ve Validation (Doğrulama)
---------------------------------

Mongoose, MongoDB ile çalışırken schema kullanmamızı sağlar.
Schema, veritabanına kaydedilecek verilerin nasıl olması gerektiğini belirler.
Böylece yanlış veya eksik veri kaydedilmesini önleyebiliriz.

Mongoose validation kuralları ile:
- Zorunlu alanları belirtebiliriz. (required)
- Metin uzunluğu sınırları koyabiliriz. (minlength, maxlength)
- Sayılar için minimum ve maksimum değerler tanımlayabiliriz. (min, max)
- Varsayılan değerler atayabiliriz. (default)
- Boşlukları otomatik temizleyebiliriz. (trim)

Şimdi kitaplar (books) koleksiyonu için bir şema oluşturalım.
*/
const bookSchema = new mongoose.Schema(
  {
    // "title" (başlık) alanı kitabın adını içerir.
    title: {
      type: String, // Veri tipi: Metin (String)
      required: [true, "Kitap başlığı zorunludur."], // Zorunlu alan
      trim: true, // Boşlukları temizler
      minlength: [2, "Kitap başlığı en az 2 karakter olmalıdır."], // Minimum uzunluk
      maxlength: [200, "Kitap başlığı en fazla 200 karakter olabilir."], // Maksimum uzunluk
    },

    // "author" (yazar) alanı kitabın yazarını tutar.
    author: {
      type: String, // Yazar adı metin (String) olarak saklanacak.
      required: [true, "Yazar adı zorunludur."], // Zorunlu alan
      trim: true, // Boşlukları temizler
    },

    // "description" (açıklama) alanı kitabın içeriğini tanımlar.
    description: {
      type: String, // Açıklama metin olarak saklanır.
      trim: true, // Boşlukları temizler.
      default: "Açıklama bulunmamaktadır.", // Varsayılan değer
    },

    // "pageNumber" (sayfa sayısı) kitabın toplam sayfa sayısını tutar.
    pageNumber: {
      type: Number, // Sayısal (Number) bir alan
      min: [1, "Kitabın en az 1 sayfası olmalıdır."], // Minimum değer
      required: [true, "Sayfa sayısı zorunludur."], // Zorunlu alan
    },

    // "rating" (puan) kitabın aldığı kullanıcı puanını temsil eder.
    rating: {
      type: Number, // Sayısal (Number) bir alan
      required: [true, "Kitap puanı zorunludur."], // Zorunlu alan
      min: [0, "Puan 0'dan küçük olamaz."], // Minimum değer
      max: [10, "Puan 10'dan büyük olamaz."], // Maksimum değer
      default: 5, // Varsayılan değer
    },
  },
  {
    // "timestamps: true" seçeneği, MongoDB'nin her belgeye otomatik olarak "createdAt" ve "updatedAt" alanlarını eklemesini sağlar.
    timestamps: true,
  }
);

/*
---------------------------------------
mongoose.model() Fonksiyonunun Mantığı
---------------------------------------

Mongoose'da bir model, belirli bir collection içindeki documentleri temsil eder.
Bir collection, MongoDB'de saklanan documentlerden oluşur demiştik.
Mongoose ile MongoDB'de bir collection oluşturmak ve yönetmek için model tanımlarız.

Genel Kullanım:
- const ModelAdı = mongoose.model("ModelAdı", schemaAdı);

Bu fonksiyon, belirtilen schema ile MongoDB'deki collection arasında bağlantı kurar.
Model, MongoDB'de veri **ekleme, güncelleme, silme ve sorgulama** işlemlerini yapmamızı sağlar.

Parametreler:
1. Parametre ("ModelAdı") → Modelin Adı
  - Model adı tekil (singular) olarak yazılır.
  - Mongoose, bu ismi küçük harfe çevirir ve çoğul (plural) hale getirir.
  - Örneğin: `"Book"` olarak yazarsak, MongoDB'de "books" collection'ını oluşturur.

2. Parametre (schemaAdı) → Kullanılacak Schema
  - Modelin hangi schema ile çalışacağını belirler.
  - Schema, documentlerin içereceği alanları, veri tiplerini ve doğrulama (validation) kurallarını tanımlar demiştik.
*/
const Book = mongoose.model("Book", bookSchema);

export default Book;
