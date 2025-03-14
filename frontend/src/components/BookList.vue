<template>
    <!-- row class sayesinde divlerimiz yatay düzlemde sıralanacak. Çünkü row class içerisinde display: flex değerini barındırıyor. -->
    <div class="row">
        <div class="col-sm-6 col-md-4 col-xl-3 mb-5" v-for="book in books" :key="book.id">
            <!-- 
            Vue mantığında One Way Data Flow şeklinde bir veri akışı var. 
            Parent => Child şeklinde veriler akıyor. 

            Props'lar readonly'dir. Değiştirilemez (immutable). BookItem tarafında buradan gönderilen veriyi yani prop değerini değiştirmeye kalktığımız an hata alırız.
            -->
            <RouterLink :to="'/books/' + book.id">
                <BookItem :book="book" />
                <!-- 
                Ayrıca aşağıdaki gibi aynı isim kullandığımız için Vue anlayabilir. Ama bu kadar esneklik proje büyüdükçe kafa karıştırabilir.
                <BookItem :book/> 
                -->
            </RouterLink>
        </div>
    </div>
</template>

<script>
import BookItem from '@/components/BookItem.vue';

export default {
    name: "BookList",
    components: {
        BookItem
    },
    props: {
        books: {
            type: Array,
            default: () => ([])
        }
    }
}
</script>

<style scoped></style>
