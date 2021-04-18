const BASE_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks().then(appendBooks);

});

function fetchBooks() {
    return fetch(BASE_URL)
        .then(resp => resp.json())
}

function createLi(book) {
    const li = document.createElement('li');
    li.textContent = book.title;
    li.addEventListener('click',() => {
        createPanel(book);
    })
    return li;
}

function createPanel(book) {
    const div = document.getElementById('show-panel');
    div.innerHTML = "";

    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3')
    const h4 = document.createElement('h4')
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const button = document.createElement('button');

    img.src = book.img_url;
    img.alt = book.title;
    h2.textContent = book.title;
    h3.textContent = book.subtitle;
    h4.textContent = book.author;

    p.textContent = book.description;
    button.textContent = "Like"
    
    button.addEventListener('click',() => {
        addUser(book);
        
    })

    book.users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user.username;
        ul.appendChild(li);
    })

    div.appendChild(img);
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(p)
    div.appendChild(ul)
    div.appendChild(button);

    return div;
}

function addUser(book) {
    const div = document.getElementById('show-panel');
    const user1 = {"id":1, "username":"pouros"};
    
    if (!(book.users.some(user => user.id === user1.id))) {
        
        book.users.push(user1);

        newUser = {"users": book.users}
        
        configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUser)
        }
        
        fetch(`${BASE_URL}/${book.id}`,configObj)
            .then(resp => resp.json())
            .then((json) => {
                div.innerHTML = "";
                createPanel(json);
            })

    }
}


function appendBooks(books) {
    const list = document.getElementById("list");
    books.forEach(book => {
        list.appendChild(createLi(book));
        
    });
}