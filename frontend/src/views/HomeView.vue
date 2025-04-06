<template>
    <section>
        <CarouselWidget :items="carouselItems" height="500px" />
    </section>
    <!--
    my-5
    Üst (margin-top) ve alt (margin-bottom) yaklaşık 3 rem (48px) boşluk verir.
    -->
    <section class="my-5" style="">
        <div class="container">
            <SectionHeader title="Books" text="We declare long prop names using camelCase because this avoids" />
            <div class="row">
                <div class="col-md-4">
                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action"
                            :class="{ active: selectedFilter === 'latest' }" @click="selectFilter('latest')">
                            Latest Books
                        </button>
                        <button type="button" class="list-group-item list-group-item-action"
                            :class="{ active: selectedFilter === 'best' }" @click="selectFilter('best')">
                            Best Ratings
                        </button>
                    </div>
                </div>
                <div class="col-md-8">
                    <div v-if="isLoading" class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div v-else class="accordion">
                        <div class="accordion-item" v-for="(book, index) in filteredBooks" :key="index">
                            <h2 class="accordion-header">
                                <!-- 
                                Eğer bu accordion öğesi açık değilse, .collapsed sınıfı eklenir. 
                                Bu sınıf, Bootstrap'te başlık butonunun kapalı olduğunu stil olarak gösterir.
                                İçeriğin görünürlüğünü asıl belirleyen şey ise .show sınıfının eklenip eklenmediğidir.
                                -->
                                <button :class="{ collapsed: openAccordionIndex !== index }"
                                    @click="toggleAccordion(index)" class="accordion-button" type="button">
                                    <strong>
                                        {{ book.title }} - {{ book.description }}
                                    </strong>
                                </button>
                            </h2>
                            <div :class="{ show: openAccordionIndex === index }" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <!-- 
                                            img-fluid 
                                            Genişliği otomatik %100'e ayarlar 
                                            -->
                                            <img src="../assets/images/b1.jpg" class="img-fluid" />
                                        </div>
                                        <!-- 
                                        d-flex
                                        Bu sütunu Flexbox yapar.
                                        
                                        flex-column
                                        Flex yönünü dikey yapar.
                                        
                                        justify-content-center
                                        İçeriği dikeyde ortalar.
                                        -->
                                        <div class="col-md-8 d-flex flex-column justify-content-center">
                                            <p>
                                                {{ book.description }}
                                            </p>
                                            <!-- 
                                            align-self-start
                                            Flex-column yönünde hizalanan bir yapıda, yalnızca bu öğeyi yatayda sola
                                            hizalar. 
                                            -->
                                            <div class="badge align-self-start"
                                                style="background-color: var(--secondary-color);">
                                                {{ book.rating }}
                                            </div>
                                        </div>
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
import CarouselWidget from "@/components/widgets/CarouselWidget.vue";
import SectionHeader from "@/components/SectionHeader.vue";

import { mapState } from "pinia";
import { useBookStore } from "@/stores/bookStore";

import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';

export default {
    name: "HomeView",
    data: () => {
        return {
            carouselItems: [
                {
                    imageUrl: hero_1,
                    subtitle: 'Liberte',
                    title: 'Lorem Ipsum Dolor Sit Amet',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                },
                {
                    imageUrl: hero_2,
                    subtitle: 'Egalite',
                    title: 'Excepteur Sint Occaecat Cupidatat',
                    description:
                        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    imageUrl: hero_3,
                    subtitle: 'Fraternite',
                    title: 'Neque Porro Quisquam Est',
                    description:
                        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
                },
            ],
            selectedFilter: 'latest',
            openAccordionIndex: 0
        };
    },
    methods: {
        selectFilter(filter) {
            this.selectedFilter = filter;
        },
        toggleAccordion(index) {
            // Toggle (Geçiş)
            if (this.openAccordionIndex == index) {
                // Eğer aynı index’e tekrar tıklanırsa kapatılır. (-1 atanır)
                this.openAccordionIndex = -1;
            }
            else {
                // Farklı bir index’e tıklanırsa o yeni index açılır.
                this.openAccordionIndex = index;
            }
        }
    },
    computed: {
        ...mapState(useBookStore, ['books', 'isLoading']),
        filteredBooks() {
            const copiedBooks = [...this.books];

            if (this.selectedFilter === "latest") {
                // sort() ile JavaScript dizinin içindeki elemanları ikili olarak karşılaştırır. Yani a ve b arasındaki sıralamayı belirler.
                // Bu fonksiyona otomatik olarak, a: Birinci eleman - b: İkinci eleman gönderilir.

                // Date diye bir veri tipi JSON'da yoktur! Yani backend (örneğin .NET, Node.js, Django) bize bir tarih göndermek istediğinde onu string olarak serialize eder. JavaScript’te bu tarih string’ini new Date(...) diyerek Date objesine çevirebiliriz.

                // .slice(0, 4), sıralanmış listenin sadece ilk 4 elemanını alır. (0'dan başlayarak 4’e kadar (0,1,2,3 indexleri))
                return copiedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
            }
            else if (this.selectedFilter === "best") {
                return copiedBooks.sort((a, b) => b.rating - a.rating).slice(0, 4);
            }
        }
    },
    components: {
        CarouselWidget: CarouselWidget,
        SectionHeader: SectionHeader
    }
}
</script>

<style scoped>
.list-group-item.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.accordion-button {
    color: var(--primary-color);
}

/* 
:not(.collapsed)
Bu seçim, accordion butonunun açık durumda olduğunu ifade eder.
*/
.accordion-button:not(.collapsed) {
    background-color: var(--secondary-color);
    color: #ffffff;
}

.accordion-button:focus {
    outline: none;
    box-shadow: none;
}
</style>