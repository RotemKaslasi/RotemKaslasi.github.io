// import bookService from '../services/book.service.js'
import eventBus, { SHOW_USER_MSG } from '../event-bus.js'

export default {
    template: `
        <section class="user-msg" :class="msg.type" >
        <h5>
        <button @click="closeMsg">x</button>
        {{msg.txt}}

        <router-link v-if="msg.link" :to="msg.link" >Check it out</router-link>
        </h5>
        </section>
    
    `,
    data() {
        return {
            msg: {
                txt: '',
                type: '',
            },
        }
    },
    created() {
        eventBus.$on(SHOW_USER_MSG, msg=>{
            this.msg = msg;
            setTimeout(()=>{
                this.msg = {txt:'', type:''};
            }, 3000)
        });
    },
    methods: {
        closeMsg() {
            this.msg.type = '';
        }
    }
}

