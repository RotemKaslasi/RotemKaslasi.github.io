import '../cmp/book.char.cmp.js';
import {bookService} from '../services/book.service.js';

export default {
    props: ['showing',],
    template: 
`
    <div class="modal is-active" v-if="book">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h1 >{{book.title}}</h1>
                <img v-bind:src="book.thumbnail">
                <ul>
                    <li>ID:{{book.id}}</li>
                    <li>Subtitle: {{book.subtitle}}</li>
                    <li>Authors: {{book.authors}}</li>
                    <li>PublishedDate: {{book.publishedDate}} {{publishedDate}}</li>
                    <li>Description: <long-text :desc="this.book.description"></long-text>
                    <li>Pages: {{book.pageCount}} {{experiencePageCount}}</li>
                    <li>Categories:{{book.categories}}</li>
                    <li>Thumbnail: {{book.thumbnail}}</li>
                    <li>Language: {{book.language}}</li>
                    <li :class="colorPrice" >Price: {{book.listPrice.amount}} {{amountCurrency}}</li>
                    <li :v-show="this.book.isOnSale" >Sale</li>

                </ul>
                <router-link to="/car">Back to List</router-link>
                <button @click="backToList" class="modal-close is-large" aria-label="close">Back</button>

                
            </div>
        </div>
        
    </div>    `
    ,
    data() {
        return {

            book: null,
            isRed:'',
            isGreen:'',
            
        }
    },
    computed: {
        experiencePageCount() {
            var {pageCount} = this.book;

            if (pageCount > 500) {
                return 'You have a Long reading';
            }
            else if (pageCount > 200) {
                return 'You have a Decent reading';
            }
            else if (pageCount < 100) {
                return 'you have a Light reading';
            }
            else return '';
        },

        publishedDate() {
            var {publishedDate} = this.book;
            var today = new Date();
            var currYear = today.getFullYear();
            if (currYear - publishedDate > 10) return 'Veteran Book';
            else if (currYear - publishedDate <= 1) return 'New Book';
            else return '';

        },
        amountCurrency() {
            if (this.book.listPrice.currencyCode === 'EUR') return '€';
            else if (this.book.listPrice.currencyCode === 'ILS') return '₪';
            else return '$';
        },
        colorPrice(){
            if(this.book.listPrice.amount > 150) return 'is-red';
            else if(this.book.listPrice.amount <20 ) return 'is-green';
        }

    },

    mounted() {
      

    },
    created() {
        
        let bookById = this.$route.params.bookId;
        console.log('the bookId is: ',bookById);
        // debugger
        this.book = bookService.getBookById(bookById)
        // .then(book => {
        //     console.log({ book });

        //     this.book = book
        //     console.log('check if this id the',this.book)
        // });
        
    },

    methods: {
        backToList() {
            this.$router.push('/book')
        }
    },

};