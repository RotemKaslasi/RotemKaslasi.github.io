
export default {
    template: `
    <section class="about">
        <div class="partA">
            <h1>About ME </h1>
            <p> I'm Rotem Kaslasi, the creator of this store. <br>
            Welcome! <br> stay tuned it will look better. <br>I <strong>promise</strong> (LOL! get it?)     </p>
        </div>
        <h2>|</h2>
        <div class="part B">
            <h1>About "Miss-Book" </h1>
            <p> the site is under construction :)</p>
        </div>

        <div class="tik-tok"> Since you clicked you are {{numOfSec}} seconds older</div>
        
    </section> 
    `,

    data(){
        return{
            numOfSec:0,
            timeInterval:''
        }
    },
    created() {
        this.timeInterval = setInterval(()=>{
            this.numOfSec++;
        }, 1000)
    },
    destroyed() {
        clearInterval(this.timeInterval)
        
    },
}