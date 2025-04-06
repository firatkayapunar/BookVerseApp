<!-- Pagination (Sayfalandırma) -->

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
    name: "PaginationWidget",
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
        /*
        1. Computed Properties
        Computed, reactive verilere bağımlıdır ve bu verileri otomatik olarak (dependency tracking) izler.
        İlk render sırasında çalışır ve sonucu cache içerisine alır.
        Bağımlı olduğu veriler değişmediği sürece tekrar hesaplanmaz; bu sayede aynı sonucu doğrudan önbellekten döner.
        Bu mekanizma sayesinde performans avantajı sağlar ve gereksiz hesaplamaların önüne geçilir.

        2. Methods
        Template içinde çağrıldığında, her render sırasında fonksiyon tekrar çalıştırılır.
        Her seferinde yeniden hesaplama yapılır; cache mekanizması yoktur.
        Dependency tracking yapılmaz, yani kullanılan veriler değişmiş mi değişmemiş mi kontrol edilmeden her çağrıda fonksiyon çalışır.
        */
        goToPage(page) {
            /*
            Vue One-Way Data Flow ve $emit Kullanımı
            Vue içerisinde props'lar yalnızca readonly olduğu için, One - Way Data Flow prensibine göre çalışırız.
            Yani veriler sadece Parent (ebeveyn) bileşenden Child (çocuk) bileşene doğru akar.
            Bu yüzden Child bileşeni içinde props'ları doğrudan güncelleyemeyiz. İşte burada $emit devreye girer!

            $emit Ne İşe Yarar ?
            $emit, child bileşenden parent bileşene bir event göndermemizi sağlar.
            Olay şu şekilde işler:
            - Child bileşen, Parent bileşene bir mesaj yollar:
            - "Ebeveynim, bana gönderdiğin veri burada değiştirilemiyor. Sen bunu güncelle, ben de kullanayım!"
            - Parent bileşen, gelen event'i dinler ve gerekli güncellemeyi yapar.
            Böylece veri akışı One - Way Data Flow prensibine uygun bir şekilde korunmuş olur.
            
            $ İşaretinin Anlamı Nedir ?
            Vue, kendi özel metotlarını ve özelliklerini ayırt etmek için $ işaretini kullanır.
            Diyelim ki kendi bileşenimizde emit adında bir metod oluşturduk.
            Eğer Vue'nun kendi emit metodu ile çakışırsa karışıklık olabilir.
            İşte bu yüzden Vue, kendi metotlarını $emit, $refs, $nextTick gibi $ işaretiyle tanımlar.
            */
            this.$emit("page-changed", page)
        }
    }
}
</script>

<style scoped></style>
