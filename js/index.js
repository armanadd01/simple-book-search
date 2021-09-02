// declare all the variable
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");
const filterData = document.getElementById("filter-data");


// search button and fetching API
searchBtn.addEventListener("click", function() {
    const searchText = searchInput.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    //   Clear
    bookContainer.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // spinner and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showSearchResult(data);
            }, 1500);
        })
        .finally(() => {
            searchInput.value = "";
        });
});


const showSearchResult = books => {
    filterData.innerText = "";
    // Error Handing and showing search result number
    if (books.docs.length === 0) {
        errorDiv.innerText = "No Search Result Found";
    } else if(books.docs.length >= 20) {
        errorDiv.innerText = "";
        books.docs.length = 20;
        filterData.innerText = `showing ${books.docs.length} results of ${books.numFound}`
    }else if(books.docs.length <= 20)  {
        errorDiv.innerText = "";
        filterData.innerText = `showing ${books.docs.length} results of ${books.numFound}`
    }
    

    books.docs.forEach(book => {
        //Author Check 
        const isValidated = validation => {
            if (validation !== undefined) {
                return validation;
            } else {
                return "Not Found";
            }

        }
        const div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML = `
            <div class="card mt-3" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                <h5 class="card-title">${isValidated(book.title)}</h5>
                <h6 class="card-title">Author Name: ${isValidated(book.author_name)}</h6>
                <p class="card-text">Published: ${isValidated(book.first_publish_year)}</p>
                <p class="card-text">Publisher Name: ${isValidated(book.publisher[0])}</p>
                </div>
            </div>
      `;
        bookContainer.appendChild(div);
    });
}