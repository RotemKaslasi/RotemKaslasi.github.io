
import routes from '../routes.js'

export default {
    template: `
    <nav>
        <router-link exact to="/home">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link exact to="/book">Book List</router-link> |
    </nav>
     
    `,

    data(){
        return{
            
        }
    },

    components: {
        routes,
    }
   
}




   