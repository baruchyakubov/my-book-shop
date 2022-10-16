'use strict'
const STORAGE_KEY = 'book-list'
const gBooksNames = [{name: 'Treacle Walker', img: 'img/books/Treacle Walker.jpg'} ,{name: 'Glory', img: 'img/books/Glory.jpg'} ,{name: 'Courtiers', img: 'img/books/Courtiers.jpg'} ,{name: 'Things We Never Got Over', img: 'img/books/Things We Never Got Over.jpg'} ,{name: 'will', img: 'img/books/will.jpg'} , {name: 'persy jackson', img: 'img/books/persy jackson.jpg'} , {name: 'harry potter', img: 'img/books/harry potter.jpg'} , {name: 'it ends with us', img: 'img/books/it ends with us.jpg'} , {name: 'diary of a wimpy kid', img: 'img/books/diary of a wimpy kid.jpg'} , {name: 'the ballad of never after', img: 'img/books/the ballad of never after.jpg'} , {name: 'the midnight library', img: 'img/books/the midnight library.jpg'} , {name: 'the subtle art of not giving a f*ck', img: 'img/books/the subtle art of not giving a f.jpg'}]
const PAGE_SIZE = 8

var gPageIdx = 0
var gBooks
var gFilterBy = {maxPrice: 50 , minRate: 0 , bookName:'',bookId:0}
var gPresentation

function getPresentation(){
   var presentation = loadFromStorage('presentation')
    if(!presentation){
        presentation = 'table'
    }
    console.log(presentation);
    gPresentation = presentation
    saveToStorage('presentation' ,gPresentation )
    return presentation
}


function getBooks(){
    var books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
        book.price <= gFilterBy.maxPrice && book.name.includes(gFilterBy.bookName))

        const startIdx = gPageIdx * PAGE_SIZE
        books = books.slice(startIdx, startIdx + PAGE_SIZE)
        return books
}

_createBooks()

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < gBooksNames.length; i++) {
            var name = gBooksNames[i].name
            var img = gBooksNames[i].img
            books.push(_createBook(name, i + 1, getRandomIntInclusive(10, 51) , img ))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name, id, price , img) {
    return {
        id,
        name,
        img:img,
        price: price,
        rate: 0,
        description: _getDescription()
    }
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function AddBook(name, price) {
    gBooks.push(_createBook(name, gBooks.length + 1, price ,'img/books/book.jpg'))
    _saveBooksToStorage()
}

function getBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    return gBooks[bookIdx]
}

function _getDescription() {
    return makeLorem()
}

function updateBook(bookId, updatedPrice) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks[bookIdx].price = updatedPrice 
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function increaseRate(book) {
    if (book.rate === 10) return
    book.rate++
    _saveBooksToStorage()
}

function decreaseRate(book) {
    if (book.rate === 0) return
    book.rate--
    _saveBooksToStorage()
}

function setBookFilter(filterBy = {}){
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if(filterBy.bookName !== undefined) gFilterBy.bookName = filterBy.bookName
    return gFilterBy
}



function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getPageNum(){
    return gPageIdx + 1
}

function pageBefore(){
    if(gPageIdx === 0)return
    gPageIdx--
}

function setPresentation(pres){
    gPresentation = pres
    saveToStorage('presentation' , gPresentation )
}










