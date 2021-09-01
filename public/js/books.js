const serachBox = document.getElementById('booksContainer__searchBox');


async function searchBooks(searchKeyword = ''){

    let endpoint = searchKeyword.length == 0 ? '/api/books' : `/api/books/search/${searchKeyword}`;

    const response = await fetch(endpoint);
    const books = await response.json();

    generateBooksListing(books);
}

async function searchKeyupEvent() {
    const searchKeyword = this.value;
    searchBooks(searchKeyword);
}

const generateBooksListing = (books = []) => {

    const tableListingContainer = document.getElementById('booksContainer__tableListingContainer');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const thead_data = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    `;

    thead.insertAdjacentHTML("beforeend", thead_data);
    
    table.appendChild(thead);
    table.appendChild(tbody);

    if(books.length){
        books.forEach(book => {

            const book_title = book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title;
            const book_author = book.title.author > 30 ? book.title.substring(0, 30) + '...' : book.author;

            const tbody_data = `
                <tr>
                    <td>${book_title}</td>
                    <td>${book_author}</td>
                    <td><a class='btn' href='/books/${book.id}'><span><i class='fa fa-eye'></i></span> View</a></td>
                </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", tbody_data);
        });
    }
    else{
        const tbody_data = `
            <tr>
                <td colspan='3'>No Record Found </td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", tbody_data);
    }

    table.appendChild(tbody);
    tableListingContainer.innerHTML = "";
    tableListingContainer.appendChild(table);

}

serachBox.addEventListener('keyup', searchKeyupEvent);

// call searchBooks on page load
searchBooks();