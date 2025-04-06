<template>
    <section>
        <!-- isLoading true ise bu kısmı gösterilir. -->
        <div class="container" v-if="isLoading">
            <p>Yükleniyor...</p>
        </div>

        <!-- Hata varsa bu kısmı gösterilir. -->
        <div class="container" v-else-if="error">
            <p class="text-danger">{{ error }}</p>
        </div>

        <!-- Yüklenme bitti, hata yok ise bu kısım gösterilir. -->
        <div class="container" v-else>
            <!-- Eğer selectedBook null ise 'Seçili kitap yok' gibi bir mesaj gösterilebilir. -->
            <div v-if="!selectedBook">
                <p>Seçili kitap bulunamadı.</p>
            </div>

            <!-- Kitap bulunduysa detaylarını gösteriyoruz. -->
            <div v-else>
                <SectionHeader :title="selectedBook.title" :text="selectedBook.author" />

                <!-- 
                `:icon` prop'u, `FontAwesomeIcon` component'ine hangi icon'un gösterileceğini bildirir.
                Component bu değeri alır ve library.add(...) ile eklenen ikonları kontrol eder. (main.js)
                -->
                <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" style="cursor:pointer"
                    @click="goToBookList" />

                <div class="row mb-4">
                    <!--
                    Bu durumda, büyük ekranlarda iki div yan yana gelir ve her biri ekranın %50’sini kaplar. 
                    Küçük ve orta ekranlarda div otomatik olarak 12 sütunun tamamını kaplar. (Bootstrap Grid System)
                    -->
                    <div class="col-lg-6">
                        <img class="card-img-top" src="../../src/assets/images/b1.jpg" alt="Book Image" />
                    </div>

                    <div class="col-lg-6 details-wrapper">
                        <p class="lead description">
                            {{ selectedBook.description }}
                        </p>

                        <div class="mb-4">
                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6">
                                    <strong>Sayfa Sayısı</strong>
                                </div>
                                <div class="col-lg-6">
                                    {{ selectedBook.pageNumber }}
                                </div>
                            </div>

                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6">
                                    <strong>Kategori</strong>
                                </div>
                                <div class="col-lg-6">
                                    Fiction
                                </div>
                            </div>

                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6">
                                    <strong>Puan</strong>
                                </div>
                                <div class="col-lg-6">
                                    {{ selectedBook.rating }}
                                </div>
                            </div>

                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6">
                                    <strong>Yüklenme Tarihi</strong>
                                </div>
                                <div class="col-lg-6">
                                    {{ selectedBook.updatedAt }}
                                </div>
                            </div>
                        </div>

                        <div class="comments-section">
                            <h3 class="display-6 mb-2">Yorumlar</h3>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <p>Lorem ipsum dolor sit amet...</p>
                                    <div class="d-flex justify-content-between">
                                        <p class="fw-bold fst-italic">John Doe</p>
                                        <div class="d-flex align-items-center">
                                            <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                            <p class="ps-2 mb-0"><strong>8</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Diğer yorumlar burada listelenebilir. -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useBookStore from "@/stores/bookStore";

import SectionHeader from "@/components/SectionHeader.vue";

export default {
    name: "BookDetailView",
    methods: {
        // loadBooks() {
        //  const store = useBookStore();
        //  return store.loadBooks();
        // }

        // selectBook(id) {
        //  const store = useBookStore();
        //  return store.selectBook(id);
        // }

        // Kısa Yol
        ...mapActions(useBookStore, ["loadBooks", "selectBook"]),
        goToBookList() {
            // $router.push() Vue Router'da "books" adlı route'a yönlendirir. "index.js" içinde tanımlanan routes dizisinde "name" değeri "books" olan route'u bulur ve ilgili component'i yükler.
            this.$router.push({ name: "books" });
        },
    },
    computed: {
        // books() {
        //   const store = useBookStore();
        //   return store.books;
        // }

        // isLoading() {
        //   const store = useBookStore();
        //   return store.isLoading;
        // }

        // error() {
        //   const store = useBookStore();
        //   return store.error;
        // }

        // selectedBook() {
        //   const store = useBookStore();
        //   return store.selectedBook;
        // }

        // Kısa Yol
        ...mapState(useBookStore, ["books", "isLoading", "error", "selectedBook"]),
    },
    components: {
        SectionHeader,
    },
    created() {
        // $route, Vue Router tarafından sağlanan dinamik route parametrelerini içerir. Vue Router, URL’ye bağlı olarak bu parametreleri ilgili Vue component instance'ına otomatik olarak aktarır.
        const bookId = this.$route.params.id;

        // Eğer kitap listesi henüz store'da mevcut değilse (örneğin sayfa doğrudan detay linkiyle açıldıysa), önce tüm kitaplar asenkron olarak yüklenir, ardından ilgili kitap seçilir.
        if (!this.books.length) {
            this.loadBooks().then(() => {
                this.selectBook(bookId);
            });
        } else {
            // Kitaplar zaten yüklüyse, doğrudan seçimi gerçekleştirilir.
            this.selectBook(bookId);
        }
    },
};
</script>

<style scoped>
.details-wrapper {
    max-height: 740px;
    display: flex;
    flex-direction: column;
}

/*
overflow-y: auto
Eğer içerik max-height sınırını aşarsa, otomatik olarak scrollbar çubuğu ekler.
Eğer içerik taşmazsa, scrollbar görünmez. 
*/
.description {
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
}

.comments-section {
    overflow-y: auto;
}
</style>
