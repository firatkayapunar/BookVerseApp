import { defineStore } from "pinia";
import axios from "axios";

/*
Yeni bir Pinia store'u oluşturmak için kullanılan fonksiyondur. 
Bu fonksiyon 3 temel yapı içerir:

1. Store ID → global olarak store'a ulaşılmasını sağlar.
2. state() → reactive data tanımlar.
3. actions & getters → veri işleme ve türetilmiş değerleri yönetir.

!!! Bu store'un çalışması için uygulama başlangıcında app.use(createPinia()) çağrısı yapılmalıdır. Çünkü useBookStore() çağrıldığında aktif olan Pinia instance’ı kullanılarak store instance oluşturulur. Bu işlem arka planda gerçekleşir ve biz geliştirici olarak bu süreci manuel olarak yönetmeyiz.
*/
export const useBookStore = defineStore("bookStore", {
  // Uygulamada reactive olarak izlenecek veriler burada tanımlanır.
  state: () => ({
    books: [], // API'den gelen kitap listesi
    isLoading: false, // Yüklenme durumu
    error: null, // API hataları
    selectedId: null, // Detay için seçilen kitap ID'si
  }),

  /*
  State üzerinde doğrudan değişiklik yapan ve genellikle async olan işlemleri tanımlar.
  Axios ile API çağrıları burada gerçekleştirilir.
  */
  actions: {
    /*
    Kitap verilerini backend API'den alır.
    HTTP GET isteği gönderilir.
    isLoading true yapılır, işlem sonunda false olur.
    Hata olursa error state'e yazılır.

    CORS hatırlatması:
    - Frontend ile backend farklı portlarda (örn: 5173 → 3000) çalıştığı için, tarayıcı CORS nedeniyle isteği engeller.
    Bu durumda backend tarafında CORS konfigürasyonu yapılmalıdır.
    */
    async fetchBooks() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get("http://localhost:3000/api/v1/books");
        this.books = response.data;
      } catch (err) {
        this.error =
          "An error occurred while loading books. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    // Belirli bir kitabın detayını göstermek için ID'yi state'e kaydeder.
    selectBook(id) {
      this.selectedId = id;
    },

    // Store içeriğini sıfırlar.Yani Store'u varsayılan hâline döndürür.
    resetStore() {
      this.books = [];
      this.isLoading = false;
      this.error = null;
      this.selectedId = null;
    },
  },
  /*
  State reactive olduğu için, state değiştiğinde getter otomatik olarak güncellenir.
  Caching özelliği sayesinde gereksiz hesaplamaların önüne geçilir.
  */
  getters: {
    // Store içindeki selectedId'ye göre ilgili kitabı döndürür.
    selectedBook: (state) => {
      return state.books.find((book) => book._id === state.selectedId) || null;
    },

    // books dizisindeki toplam kitap sayısını döndürür.
    bookCount: (state) => state.books.length,

    // API'den veri başarıyla gelmiş, hata yok ve isLoading false ise true döner.
    isLoaded: (state) =>
      !state.isLoading && !state.error && state.books.length > 0,
  },
});

export default useBookStore;
