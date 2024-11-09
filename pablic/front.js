function deleteBook(id) {
    fetch(`http://localhost:3003/books/${id}`, {method: 'DELETE'}) //URI PARAMAS
}

function getBooks(Name, yearValue) {
    fetch(`http://localhost:3003/books
    ?author=${Name}
    &year=${yearValue}
    &limit=100
    &sort=title
    `, {method: 'GET'}) //query params

}

function addBook(title, author) {
    fetch(`http://localhost:3003/books`, {method: 'POST', body: JSON.stringify({title, author})})
}

function updateBook(title, author, id) {
    fetch(`http://localhost:3003/books/${id}`,
        {
            method: 'PUT', body: JSON.stringify({title, author}),
            headers: {'content-type': 'application/json'}
        })
}


// PUT передаются все свойства
// PATCH передаются только изменяемые свойства