import bookPreview from'../cmp/book.preview.cmp.js'
import bookFilter from  '../cmp/book.filter.cmp.js';

export default{
    props: ['books'],

    template: `
        <section>
        
            <book-filter @set-filter="setFilter"></book-filter>
            <ul class="book-list" >
                    <book-preview v-for="currentBook in booksForDisplay" v-bind:book="currentBook">
                    </book-preview>
            </ul>
        </section>

    `,

    data() {
        return {
            filter:null,            
            // books: bookService.query()
         
        }
    },


    computed: {
        booksForDisplay() {
            
            if (!this.filter) return this.books;
            return this.books
                    .filter(book => book.title.includes(this.filter.byTitle))
                    .filter(book => !this.filter.maxPrice || (book.listPrice.amount <   this.filter.maxPrice && book.listPrice.amount > this.filter.minPrice))

        }

    },
    created() {
        console.log('book-List was created!');
    },

    methods: {
        setFilter(filter) {
            this.filter = filter
        }
    },
    components: {
        bookPreview,
        bookFilter
    }

  
};



