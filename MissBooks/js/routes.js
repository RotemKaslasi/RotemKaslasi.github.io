import bookPage from './pages/book.app.cmp.js';
import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookDetails from './cmp/book.details.cmp.js';





var myRoutes = [
    {path: '/home', component: homePage },
    {path: '/about', component: aboutPage },
    {path: '/book', component: bookPage },
    {path: '/book/:bookId', component: bookDetails },
]

export default myRoutes;

