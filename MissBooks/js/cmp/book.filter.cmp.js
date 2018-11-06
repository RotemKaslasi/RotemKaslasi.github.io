import eventBus, { SHOW_USER_MSG } from '../event-bus.js'

export default{
    template: `
     <section>
        <h4 class="search-book"> Which BOOK you want? </h4>
            <form > 
                 Name:<input type="text" @input="setFilter" v-model="filter.byTitle"/>
                 From Price: <input type="text" v-model.number="filter.minPrice"/>
                 To Price: <input type="text" v-model.number="filter.maxPrice"/>
                 <button @click.prevent="setFilter" type="submit">Search</button>
            </form>

                
     </section>
   
    `,
    data() {
        return {
            filter: {
                byTitle: '',
                minPrice:0,
                maxPrice: 0
            },
        }
    },
    methods: {
        setFilter() {
            // console.log('The Filter Is:' , this.filter);
            this.$emit('set-filter', this.filter);  
           
        }
    },
    foundBook() {
        console.log('winter is coming')
        eventBus.$emit(SHOW_USER_MSG, { type: 'success', txt: 'SEARCHING' }); 
             


            
    },
};



