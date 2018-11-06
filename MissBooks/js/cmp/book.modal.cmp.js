Vue.component('modal', {
    props: ['book', 'showing'],

    template: `
                <div class="modal" v-bind:class="{'is-active':showing}">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <h1 >{{book.title}}</h1>
                            <img v-bind:src="book.thumbnail">
                            <ul>
                                <li>book.id</li>
                                <li>book.subtitle</li>
                                <li>book.authors</li>
                                <li>book.publishedDate</li>
                                <li>book.description</li>
                                <li>book.pageCount</li>
                                <li>book.categories</li>
                                <li>book.thumbnail</li>
                                <li>book.language</li>
                                <li>book.listPrice</li>
                                <li>book.isOnSale</li>

                            </ul>
                            <button v-on:click="$emit('closeModal')" >Switch Users</button>
                        </div>
                    </div>
                    
                </div>    
`,
});

// <li v-for="detail in book" v-if="book.hasOwnProperty(detail)" v-text=" detail"></li>