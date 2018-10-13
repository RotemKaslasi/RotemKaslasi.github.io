'use strict';

function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = gBooks;
    
    var headerHtml = `
    <a href="#" class="btn btn-small" onclick="readAndAddNewBook()">Creat New Book</a>
    <table class="table table-hover"> <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  <tbody>`;


    var strHtmls = books.map(function (book) {
        return `
  
    <tr>
      <th scope="row">${book.id}</th>
      <td>${book.name}</td>
      <td>${book.price}</td> 
      <td>
      <a href="#" class="btn btn-small" onclick="readAndUpdateBook('${book.id}')">Update</a>
      <a href="#" class="btn btn-small" onclick="onDeleteBook('${book.id}')">Delete</a>
      <a href="#" class="btn btn-small" onclick="onReadBook('${book.id}')">Read</a>
      
            
      </td>
     
    </tr>
            
        `
    });
    var tableHtml = (headerHtml + strHtmls.join('') + `  </tbody>
</table>`);
    console.log(tableHtml)
   

}

function readAndUpdateBook(bookId)  {
    console.log('BOOK id', bookId);
    var newPrice = +prompt('Price?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onDeleteBook(bookId){
    deleteBook(bookId);
    renderBooks();
}

function  readAndAddNewBook() {
    var newBookName= prompt('New Book name?');
    var newBookPrice= +prompt('Price?');
    addBook(newBookName, newBookPrice); 
    renderBooks();

}

function onReadBook(bookId){
    var book = getBookById(bookId);

    var rateButton= `<div class="container">
    <div class="row">
        <div class="col-sm-3">
            <div class="input-group">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                  <span class="glyphicon glyphicon-minus"></span>
                </button>
                </span>
                <input type="text" name="quant[1]" class="form-control input-number" value="`
                + book.rate + `" min="0" max="10">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
                </span>
            </div>
        </div>
    </div>
</div>`;



    var $bookDetails = $('.book-details');
    $bookDetails.html('<span class="close" onclick="onCloseBookDetails()">&times;</span><img src=" '+ book.imgUrl +'" /> <h2> </h2>  <h4> </h4> <h5></h5> '+ rateButton );

    $bookDetails.find('h2').text(book.name);
    $bookDetails.find('h4').text(book.price +'$');
    $bookDetails.find('h5').text(book.rate);
            
    $bookDetails.show();


}

function onCloseBookDetails(){
    var $bookDetails = $('.book-details');
    $bookDetails.hide();

}

