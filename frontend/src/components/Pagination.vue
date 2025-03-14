<!-- Pagination => Sayfalandırma -->
<template>
    <nav aria-label="Page navigation example">
        <!-- 
        display: flex özelliği pagination class içerisinde mevcut olduğu için eklemedik.
        -->
        <ul class="pagination justify-content-end">
            <li :class="{ disabled: currentPage === 1 }" class="page-item">
                <a class="page-link" v-on:click="goToPage(currentPage - 1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li :class="{ active: currentPage === page }" class="page-item" v-for="page in totalPages" :key="page"><a
                    class="page-link" v-on:click="goToPage(page)">{{ page }}</a></li>

            <li :class="{ disabled: currentPage === totalPages }" class="page-item">
                <!-- 
                v-on: ile click eventini bir metoda bağlıyoruz. @click ifadesini de kullanabiliriz.
                -->
                <a class="page-link" v-on:click="goToPage(currentPage + 1)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        // Computed Properties (Önbellek Kullanımı - Cache)
        // Reaktif verileri takip eder.Eğer içinde kullanılan reaktif veri değişmezse Vue computed'ı tekrar çalıştırmaz, önbellekten (cache) okunur.
        // İlk render’da çalışır ve sonucu önbelleğe alır.
        // Eğer bağımlı olduğu (dependency) veri değişirse computed tekrar hesaplanır.
        // Performans avantajı sağlar, gereksiz tekrar hesaplamaları önler.

        // Methods (Her Render’da Çalışır)
        // Bir template içinde çağrıldığında her render’da tekrar çalıştırılır.
        // Önbellekleme (caching) yapmaz, her çağrıldığında fonksiyon çalışır ve sonucu döndürür.
        // Bağımlılık takibi(dependency tracking) yoktur.Kullanılan verinin değişip değişmediğini önemsemez.

        goToPage(page) {
            // Vue One-Way Data Flow ve $emit Kullanımı
            // Vue içerisinde props'lar yalnızca okunabilir (readonly) olduğu için, One - Way Data Flow prensibine göre çalışırız.
            // Yani veriler sadece Parent (ebeveyn) bileşenden Child (çocuk) bileşene doğru akar.
            // Bu yüzden Child bileşeni içinde props'ları doğrudan güncelleyemeyiz. İşte burada $emit devreye girer!

            // $emit Ne İşe Yarar ?
            // $emit, child bileşenden parent bileşene bir olay göndermemizi sağlar.
            // Olay şu şekilde işler:
            // Child bileşen, Parent bileşene bir mesaj yollar:
            // "Ebeveynim, bana gönderdiğin veri burada değiştirilemiyor. Sen bunu güncelle, ben de kullanayım!"
            // Parent bileşen, gelen olayı dinler ve gerekli güncellemeyi yapar.
            // Böylece veri akışı One - Way Data Flow prensibine uygun bir şekilde korunmuş olur.

            // $ İşaretinin Anlamı Nedir ?
            // Vue, kendi özel metodlarını ve özelliklerini ayırt etmek için $ işaretini kullanır.
            // Diyelim ki kendi bileşenimizde emit adında bir metod oluşturduk.
            // Eğer Vue'nun kendi emit metodu ile çakışırsa karışıklık olabilir.
            // İşte bu yüzden Vue, kendi metodlarını $emit, $refs, $nextTick gibi $ işaretiyle tanımlar.

            this.$emit("page-changed", page)
        }
    }
}
</script>

<style scoped></style>