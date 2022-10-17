'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 50,
        minRate: +queryStringParams.get('minRate') || 0,
        bookName: queryStringParams.get('bookName') || '',
        bookId: +queryStringParams.get('bookId') || 0,
        language: queryStringParams.get('language') || 'en'
    }
    onSetLang(filterBy.language)
    document.querySelector('.lang').value = filterBy.language

    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.bookName && !filterBy.bookId) return


    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.filter-by-txt').value = filterBy.bookName
    if(filterBy.bookId !== 0) onOpenDescription(filterBy.bookId)
    setBookFilter(filterBy)
}

function renderBooks() {
    var presentation = getPresentation()
    var books = getBooks()

    if(presentation === 'table'){
    document.querySelector('.book-list').innerHTML = 
        `<table  class="table-list  table table-dark table-striped"></table>`
    var topList = `<tr>
         <th data-trans="id">id</th>
         <th data-trans="book-name">name</th>
         <th data-trans="price">price</th>
         <th data-trans="actions" colspan="3">actions</th>
    </tr>`
    document.querySelector('.table-list').innerHTML += topList

var list = books.map(book => {
    return `<tr>
     <td>${book.id}</td>    
     <td>${book.name}</td>       
     <td id="${book.price}" data-trans="price1">${book.price}</td>       
     <td><butoon data-trans="read" onclick="onOpenDescription(${book.id})" class="btn-actions  bg-success bg-gradient">read</button></td>       
     <td><butoon data-trans="update" onclick="onUpdateBook(${book.id})" class="btn-actions  bg-primary bg-gradient">update</button></td>       
     <td><butoon data-trans="delete" onclick="onRemoveBook(${book.id})" class="btn-actions  bg-danger bg-gradient">delete</button></td>       
</tr>`
}) 
document.querySelector('.table-list').innerHTML += list.join('')
    }else{
        document.querySelector('.book-list').innerHTML =  `<section class="cards"></section>`
        
             document.querySelector('.cards').innerHTML = books.map(book => { return `<div class="card m-3" style="width: 15rem;">
             <img src="${book.img}" class="card-img-top" alt="...">
             <div class="card-body">
               <h5 class="card-title">${book.name}</h5>
               <p id="${book.price}" data-trans="price1" class="card-text">${book.price}</p>
               <div class="btn-actions">
               <button data-trans="read" onclick="onOpenDescription(${book.id})" href="#" class="btn-actions  bg-success bg-gradient">read</button>
               <button data-trans="update" onclick="onUpdateBook(${book.id})" href="#" class="btn-actions  bg-primary bg-gradient">update</button>
               <button data-trans="delete" onclick="onRemoveBook(${book.id})" href="#" class="btn-actions  bg-danger bg-gradient">delte</button>
               </div>
             </div>
           </div>`
        }).join('')
    }


        document.querySelector('.paging').innerHTML = `
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li onclick="onPageBefore()" class="page-item">
      <a class="page-link bg-dark bg-gradient" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link bg-dark bg-gradient" href="#">${getPageNum()}</a></li>
    <li onclick="onNextPage()" class="page-item">
      <a class="page-link bg-dark bg-gradient" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`

onSetLang(getLang())
   
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var updatedPrice = +prompt('enter price (between 10$-51$):')
    while (updatedPrice > 50 || updatedPrice < 10) {
        updatedPrice = +prompt('enter price (between 10$-51$):')
    }
    updateBook(bookId, updatedPrice)
    renderBooks()
}

function onAddBook() {
    var name = prompt('enter name:')
    var price = +prompt('enter price (between 10$-51$):')
    while (price > 50 || price < 10) {
        price = +prompt('enter price (between 10$-51$):')
    }
    AddBook(name, price)
    renderBooks()
}

function onOpenDescription(bookId) {
   
    document.querySelector('.description').classList.add('open')
    var book = getBook(bookId)
    gFilterBy.bookId = bookId
    setQueryParams()

    document.querySelector('.description').innerHTML += `<button onclick="onCloseDescription()" class="btn close">X</button>`
    document.querySelector('h2').innerText = `${book.name}`
    document.querySelector('.des').innerText = book.description
    document.querySelector('.rate').innerHTML = `
    <button onclick="onDecreaseRate(${bookId})" class="btn low-rate bg-dark text-bg-dark">-</button>
    <div class="rate-value">${book.rate}</div>
    <button onclick="onIncreaseRate(${bookId})" class="btn high-rate bg-dark text-bg-dark">+</button>`
}

function onIncreaseRate(bookId) {
    var book = getBook(bookId)
    increaseRate(book)
    document.querySelector('.rate-value').innerText = `${book.rate}`
}

function onDecreaseRate(bookId) {
    var book = getBook(bookId)
    decreaseRate(book)
    document.querySelector('.rate-value').innerText = `${book.rate}`
}

function onCloseDescription() {
    gFilterBy.bookId = 0
    setQueryParams()
    document.querySelector('.description').classList.remove('open')
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    setQueryParams()
    renderBooks()
    onSetLang(getLang())
}


function onNextPage(){
    nextPage()
    renderBooks()
}

function onPageBefore() {
    pageBefore()
    renderBooks()
}


function setQueryParams(){
    const queryStringParams = `?maxPrice=${gFilterBy.maxPrice}&minRate=${gFilterBy.minRate}&bookName=${gFilterBy.bookName}&bookId=${gFilterBy.bookId}&language=${getLang()}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetPresentation(pres){
    setPresentation(pres.dataset.pres)
    renderBooks()
}

function onSetLang(lang){
    setLang(lang)
    setQueryParams()
    setDirection(lang)
    doTrans()
}

function setDirection(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}



