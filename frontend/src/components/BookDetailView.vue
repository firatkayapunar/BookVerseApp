<template>
    <section>
        <div class="container">

            <SectionHeader :title="book.name" :text="book.author" />

            <!-- 
            Burada ne oluyor?
            Vue içinde :icon prop’u, FontAwesomeIcon bileşenine hangi ikonu göstereceğini bildirir.
            Bileşen bu değeri alır ve library.add(...) ile eklenen ikonları kontrol eder. (main.js)
            -->
            <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" class="mb-2" style="cursor:pointer"
                v-on:click="goToBackBooks" />

            <div class="row mb-4">
                <!--
                col-lg-6;
                Bu durumda, büyük ekranlarda iki div yan yana gelir ve her biri ekranın %50’sini kaplar. 
                Küçük ve orta ekranlarda div otomatik olarak 12 sütunun tamamını kaplar. (Bootstrap Izgara Sistemi)
                -->
                <div class="col-lg-6">
                    <img class="card-img-top" src="../../template/images/b_detail.jpg">
                </div>
                <div class="col-lg-6 details-wrapper">
                    <p class="lead description">
                        {{ book.description }}
                    </p>
                    <div class="mb-4">
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6">
                                <strong>
                                    Page
                                </strong>
                            </div>
                            <div class="col-lg-6">
                                {{ book.page }}
                            </div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6">
                                <strong>
                                    Category
                                </strong>
                            </div>
                            <div class="col-lg-6">
                                Fiction
                            </div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6">
                                <strong>
                                    Rating
                                </strong>
                            </div>
                            <div class="col-lg-6">
                                {{ book.rating }}
                            </div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6">
                                <strong>
                                    Upload Date
                                </strong>
                            </div>
                            <div class="col-lg-6">
                                {{ book.uploadDate }}
                            </div>
                        </div>
                    </div>
                    <div class="comments-section">
                        <h3 class="display-6 mb-2">
                            Comments
                        </h3>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nisi unde ullam
                                    iste iusto vitae, deleniti magnam nam fuga delectus optio alias dolores! Neque
                                    vero ullam repudiandae deserunt eos facere.
                                </p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">
                                        John Doe
                                    </p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0">
                                            <strong>
                                                8
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import books from '@/db';

export default {
    name: "BookDetailView",
    data() {
        return {
            book: null,
            currentPage:1
        }
    },
    methods: {
        goToBackBooks() {
            // $router.push() Vue Router'da "books" adlı route'a yönlendirir. 
            // "index.js" içinde tanımlanan routes dizisinde "name" değeri "books" olan route'u bulur ve ilgili bileşeni yükler.
            this.$router.push({ name: "books" });
        }
    },
    components: {
        SectionHeader
    },
    created() {
        // $route Vue Router tarafından sağlanan dinamik route parametresidir. Vue Router, sayfanın URL’sine bağlı olarak bu parametreleri Vue bileşenine aktarır.
        // Url üzerinden String şeklinde gelen id değerini alacağız. Ardından parseInt metodu ile bir int değerine çevireceğiz.
        const bookId = this.$route.params.id;
        this.book = books.find(book => book.id === parseInt(bookId));
    }
}
</script>

<style scoped>
.details-wrapper {
    max-height: 740px;
    display: flex;
    flex-direction: column;
}

/*
overflow-y: auto
Eğer içerik max-height sınırını aşarsa, otomatik olarak dikey kaydırma çubuğu ekler.
Eğer içerik taşmazsa, scrollbar görünmez. 
*/
.comments-section {
    overflow-y: auto;
}

/* 
overflow-y: auto
Eğer içerik 250px’ten fazla olursa, kaydırma çubuğu ekler.
Eğer içerik azsa, kaydırma çubuğu çıkmaz. 
*/
.description {
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
}
</style>
