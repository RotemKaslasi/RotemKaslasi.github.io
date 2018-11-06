
export default {
    template: `
    <section class="home">
        <h3 class="greet-home">Hello and Welcome to...</h3>
        <h1 class="logo-title">MISS BOOK</h1>

      


    </section> 
    `,


    methods: {
        addReviewBook() {
            
            console.log('REF',this.$refs.myInput);

            this.$refs.myInput.focus()
            bookService.save(this.book)
                .then(updatedBook => {
                    console.log('book: ', updatedBook.id, 'saved');

                    eventBus.$emit(SHOW_USER_MSG, {type: 'success', txt: 'Review Saved'});

                    
                })
        },

    },
}