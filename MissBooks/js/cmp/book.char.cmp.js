Vue.component('long-text', {
    props: ['desc'],

    template: `
    <div>
        <p> {{start}}<span id="dots">...</span><span id="more"></span></p>
        <button v-on:click="toggleLength()" id="myBtn">Read more</button> </li>
    </div>           
`,


    data() {
        return {
            start: this.desc,
        }

    },

    computed: {
     
        toggleLength(){
            var dots = document.getElementById("dots");
            var moreText = document.getElementById("more");
            var btnText = document.getElementById("myBtn");
          
            if (dots.style.display === "none") {
              dots.style.display = "inline";
              btnText.innerHTML = "Read more"; 
              moreText.style.display = "none";
            } else {
              dots.style.display = "none";
              btnText.innerHTML = "Read less"; 
              moreText.style.display = "inline";
            }
        },

    }

});