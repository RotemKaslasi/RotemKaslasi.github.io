import {bookService} from './services/book.service.js'
import bookApp from './pages/book.app.cmp.js'
import myRoutes from './routes.js'
import userMsg from './cmp/user-msg.cmp.js';
import navBar from './cmp/nav-bar.cmp.js';


var books = bookService.query();
console.log('books',books)


Vue.use(VueRouter);
const myRouter = new VueRouter({routes: myRoutes})




new Vue({
    el: '#root',
    router: myRouter,
    components: {
        bookApp,
        userMsg,
        navBar
    }
})


