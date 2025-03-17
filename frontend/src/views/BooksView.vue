<template>
    <section class="full-section-height">
        <div class="container">
            <!-- 
            Props
            Parent Component içerisinden Child Component içerisine bir veri iletişim metotudur.  
            -->

            <SectionHeader title="Books" text="We declare long prop names using camelCase because this avoids" />
            <BookList :books="paginatedBooks" />

            <!-- 
            Burada updatePage metoduna parametre olarak bir değer göndermiyorum ama metodu incelediğimizde bir parametre
            bekliyorum. Bu parametre değeri emit metodundan geliyor. (this.$emit("page-changed", page))
            Ayrıca v-on dedikten sonra yazdığımız page-changed de emit metodundan geliyor. 
            -->
            <Pagination :currentPage="currentPage" :totalPages="totalPages" v-on:page-changed="updatePage" />

        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import BookList from '@/components/BookList.vue';
import Pagination from '@/components/Pagination.vue';
import books from "@/db.js"

export default {
    name: "BooksView",
    data() {
        return {
            books: books,
            currentPage: 1,
            itemsPerPage: 8
        }
    },
    components: {
        SectionHeader: SectionHeader,
        BookList: BookList,
        Pagination: Pagination
    },
    // Hesaplanmış veriyi elde edeceğiz.
    computed: {
        totalPages() {
            // data metodu içerisindeki döndürelcek object'in içindeki property isimleri ile buradakiler aynı olmamalı. Aksi halde çakışma meydana gelebilir ve hata alabiliriz.

            // Math.ceil() → Sonucu yukarı yuvarlar.
            // Örnek:
            // 10 kitap / 3 kitaplık sayfa = 3.33
            // Math.ceil(3.33) → 4
            // Sonuç: 4 sayfa gerekiyor.
            return Math.ceil(this.books.length / this.itemsPerPage);
        },
        paginatedBooks() {
            // Örnek:

            // itemsPerPage => 4

            // 0 * 4 = 0 (Index)
            // 1 * 4 = 4 (Index)
            // 2 * 4 = 8 (Index)
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;

            // 0 + 4 = 4(Index)
            // 4 + 4 = 8(Index)
            // 8 + 4 = 12(Index)
            const endIndex = startIndex + this.itemsPerPage;

            // Slice metodu endIndex değerine kadar alır ve o değeri dahil etmez.
            return this.books.slice(startIndex, endIndex);
        }
    },
    methods: {
        updatePage(page) {
            this.currentPage = page;
        }
    }
}
</script>

<style scoped></style>
