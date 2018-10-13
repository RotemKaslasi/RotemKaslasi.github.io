'use strict';

var gBooks;
var gCurrPageNo = 0;
var PAGE_SIZE = 0;

function createBooks() {
    gBooks = [
        createBook('My Daddy is a pretzel', 20, 'https://images-na.ssl-images-amazon.com/images/I/61yiI8ilkNL.jpg'),
        createBook('Clumsy Crab', 29, 'http://prodimage.images-bn.com/pimages/9781680100860_p0_v1_s1200x630.jpg'),
        createBook('If you give a moose a muffin', 35, 'http://www.englishwooks.com/3975-large/if-you-give-a-moose-a-muffin-big-book.jpg')
    ]
}

function createBook(name, price, imgUrl) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    
    }
}

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
}


function deleteBook(bookId) {
    var deleteBookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    if (deleteBookIdx > -1) {
        gBooks.splice(deleteBookIdx, 1);
    }

}

function addBook(newBookName, newBookPrice){
    var newBookObj =createBook(newBookName, newBookPrice, 'img' );
    gBooks.push(newBookObj);

}

function getBookById(bookId) {
    return gBooks.find(function(book){
        return book.id === bookId;
    })
}






