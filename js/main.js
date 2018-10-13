console.log('Starting up');




var gProjs = [
    {
        id: "Minesweeper ",
        name: "Minesweeper ",
        title: "Minesweeper ",
        desc: "The classic Minesweeper game with my touch",
        url: "img/portfolio/‏‏MineSweeper thumbnail.jpg ",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"]
    },

    {
        id: "In-Picture Game ",
        name: "In-Picture Game ",
        title: "In-Picture Game ",
        desc: "In-Picture Game for kids ",
        url: "img/portfolio/‏‏in_pictures_thumbnail.jpg",
        publishedAt: 1448693940000,
        labels: ["Images", "keyboard events"]
    },

    {
        id: "Touch Nums ",
        name: "Touch Nums ",
        title: "Touch Nums ",
        desc: "Touch Nums cognitive game  ",
        url: "img/portfolio/‏‏Tuch_nums_thumbnail.jpg",
        publishedAt: 1448693940000,
        labels: ["Numbers", "keyboard events", "Matrixes"]
    },

    {
        id: "Ball Board",
        name: "Ball Board ",
        title: "Ball Board ",
        desc: "Ball Board platform game  ",
        url: "img/portfolio/Ball Board thumbnail.jpg",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events", "Sound"]
    },

    {
        id: "Chess",
        name: "Chess",
        title: "Chess",
        desc: "Classic Chess game  ",
        url: "img/portfolio/‏‏Chess thumbnail.jpg",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events", "ASCII symbols"]
    },

    {
        id: " Books Shop",
        name: " Books Shop",
        title: " Books Shop",
        desc: "Internet Books Shop",
        url: "img/portfolio/‏‏Book Shop thumbnail.jpg",
        publishedAt: 1448693940000,
        labels: ["Bootstrap", "keyboard events", "Objects"]
    },
];


function initPage() {
    console.log('here');

    var projs = gProjs;

    var portHeader = `    
    <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading">Portfolio</h2>
            <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
    <div class="row">
      `;

    var portSectionHtml = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
             <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                </div>
             </div>
             <img class="img-fluid" src="${proj.url}" alt="">
            </a>        
            <div class="portfolio-caption">
              <h4>${proj.name}</h4>
              <p class="text-muted">${proj.desc}</p>
            </div>
        </div>
        `
    });

    console.log(portSectionHtml);
    $('#portfolio').html(portHeader + portSectionHtml.join('')+'</div>');
}










/* <div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="close-modal" data-dismiss="modal">
      <div class="lr">
        <div class="rl"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="modal-body">
            <!-- Project Details Go Here -->
            <h2>Project Name</h2>
            <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            <img class="img-fluid d-block mx-auto" src="img/portfolio/05-full.jpg" alt="">
            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
              dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
              maiores repudiandae, nostrum, reiciendis facere nemo!</p>
            <ul class="list-inline">
              <li>Date: January 2017</li>
              <li>Client: Southwest</li>
              <li>Category: Website Design</li>
            </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */

