import info from '../cmp/books.js';
import bookList from '../cmp/book.list.cmp.js';
// import bookDetails from '../cmp/book.preview.cmp.js';
// import bookFilter from '../cmp/book.filter.cmp.js';

export default{   
    template: `
        <section>
            <h1 class="title-miss">Miss Book</h1>
                <ul class="book-list" >
                   <book-list :books="books"></book-list>
                </ul> 
        </section>

    `,

    data() {
        return {
        books: info,
        filter:null,
        book: {
            title: '',
            amount: 0,
        }
         
        }
    },
    created(){
        console.log('books data created')
        
    },
    computed: {
        booksToShow() {
            console.log(this.books)
            if (!this.filter) return this.books;
            return this.books
                .filter(book => book.title.includes(this.filter.bookTitle))
                .filter(book => book.listPrice.amount < this.filter.maxPrice || !this.filter.maxPrice)
                .filter(book => this.book.listPrice.amount > this.filter.minPrice || !this.filter.minPrice)
        }
    },
    methods: {
        setFilter(filter) {
            this.filter = filter
        }
    },
    components: {
        info,
        bookList,
    }

}
