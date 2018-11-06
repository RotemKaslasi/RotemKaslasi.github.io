import bookDetails from './book.details.cmp.js'


export default {
    props: ['book'],
    template: `
        <li class=""> 
            <div class="card " style="width: 13rem;">
                <img class="card-img-top"  v-bind:src="book.thumbnail" alt="Card image cap">
                    <div class="card-body">
                    <router-link :to="bookDetailsLink">{{book.id}}</router-link>
                        <h5 class="card-title">{{book.title}}</h5>
                            <p class="card-text">{{book.listPrice.amount}} {{amountCurrency}}</p>
                            <a @click="showTheModal=true" class="btn btn-primary">Book Details</a>
                            <book-details :showing="showTheModal" :symbol-currency="amountCurrency" @closeModal="showTheModal = false"></book-details>
                    </div>
            </div>
        </li>

        
   
    `,
    // <img class="img-book" v-bind:title="book.name" v-bind:src="book.thumbnail" />
    data(){
        return{
            showTheModal: false,


        }
    },

    computed:{
        amountCurrency(){
            if (this.book.listPrice.currencyCode === 'EUR')  return '€';
            else if (this.book.listPrice.currencyCode === 'ILS')  return '₪';
            else  return'$';
        },
        bookDetailsLink() {
            return `/book/${this.book.id}`;
        },
    
    },    

    mounted(){
        // this.amountCurrency();        
    },
    components:{
        bookDetails
    },
   


    
};





