<template>
    <section class="full-section-height">
        <div class="container">
            <!-- 
            Props, Parent (ebeveyn) component'ten Child (alt) component'e veri göndermek için kullanılır.
            Eğer sabit (statik) bir değer gönderiyorsak ":" kullanmaya gerek yok.

            Örneğin:
            title="Books" statik string olduğu için : kullanılmaz.
            -->
            <SectionHeader title="Books" text="We declare long prop names using camelCase because this avoids" />
            <!-- 
            Burada BookList component'ine, computed property olan paginatedBooks'u prop olarak iletiyoruz.
            ":" işareti, v-bind'in kısaltmasıdır: :books="paginatedBooks" → v-bind:books="paginatedBooks" 
            -->
            <BookList :books="paginatedBooks" />

            <!-- 
            currentPage ve totalPages değerlerini prop olarak iletiyoruz.

            Ayrıca v-on:page-changed="updatePage" kısmında:
            - "page-changed" → PaginationWidget component'inde $emit('page-changed', page) şeklinde tanımlı bir custom event'tir.
            - "updatePage" → Bu component içindeki methods altında tanımlı bir fonksiyondur.
            - Yani child component'ten emit ile gelen veriyi (page) yakalayıp, burada parent component olarak updatePage() fonksiyonuna yönlendiriyoruz.
            -->
            <PaginationWidget :currentPage="currentPage" :totalPages="totalPages" v-on:page-changed="updatePage" />

        </div>
    </section>
</template>

<script>
import { mapState } from "pinia";
import { useBookStore } from "@/stores/bookStore";

import SectionHeader from '@/components/SectionHeader.vue';
import BookList from '@/components/BookList.vue';
import PaginationWidget from '@/components/widgets/PaginationWidget.vue';

export default {
    name: "BooksView",
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 8
        }
    },
    methods: {
        // PaginationWidget component'inden emit edilen 'page-changed' event'ine yanıt verir.
        updatePage(page) {
            this.currentPage = page;
        }
    },
    // Hesaplanmış veriyi elde edeceğiz.
    computed: {
        // Pinia store'daki "books" state'ini bu component içine dahil ediyoruz. Bu kullanımı BookDetail.vue içerisinde detaylı olarak incelemiştik.
        ...mapState(useBookStore, ['books']),
        totalPages() {
            /* 
            Math.ceil() → Sonucu yukarı yuvarlar.

            Örnek:
            10 kitap / 3 kitaplık sayfa = 3.33
            Math.ceil(3.33) → 4
            Sonuç: 4 sayfa gerekiyor.
            */
            return Math.ceil(this.books.length / this.itemsPerPage);
        },
        paginatedBooks() {
            // Örnek:

            // itemsPerPage => 4

            // 0 * 4 = 0 (Index)
            // 1 * 4 = 4 (Index)
            // 2 * 4 = 8 (Index)
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;

            // 0 + 4 = 4  (Index)
            // 4 + 4 = 8  (Index)
            // 8 + 4 = 12 (Index)
            const endIndex = startIndex + this.itemsPerPage;

            // Slice metodu endIndex değerine kadar alır ve o değeri dahil etmez.
            return this.books.slice(startIndex, endIndex);
        }
    },
    components: {
        SectionHeader,
        BookList,
        PaginationWidget
    }
}
</script>

<style scoped></style>
