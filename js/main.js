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
    initPortfolio();
}


function initPortfolio(){
    var projs = gProjs;
    var portHeader = `    
    <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading">Portfolio</h2>
            
          </div>
        </div>
    <div class="row">`;

    var portSectionHtml = projs.map(function (proj,index) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onClick="makeModal((${index}))">
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
    $('#portfolio').html(portHeader + portSectionHtml.join('')+'</div>');
}





function makeModal(index){
    info = gProjs[index]
    var date = new Date(info.publishedAt);
    var labelString = ""
    for (i=0;i<info.labels.length;i++){
        labelString +='<span class="label label-default">'+info.labels[i]+'</span>'
    }
    var string = `  <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <!-- Project Details Go Here -->
                                <h2>${info.name}</h2>
                                <p class="item-intro text-muted">${info.title}</p>
                                <img class="img-fluid d-block mx-auto" src="${info.url}" alt="">
                                <p>${info.desc}</p>
                                <ul class="list-inline">
                                <li>Date: ${date.toDateString()}</li>
                                ${labelString}
                                </ul>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                                    <i class="fa fa-times"></i>
                                    Close Project</button>
                            </div>
                        </div>
                    </div>`
    $('.modal').find('.container').html(string)
}
