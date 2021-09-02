const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");
const authorName = document.getElementById("author-name");



searchBtn.addEventListener("click", function() {
    const searchText = searchInput.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    //   Clear
    bookContainer.innerHTML = "";
    // bookDetails.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // spinnner and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showSearchResult(data.docs);
            }, 1000);
        })
        .finally(() => {
            searchInput.value = "";
        });
});

const showSearchResult = docs => {

    // Error Handing
    if (docs.length === 0) {
        errorDiv.innerText = "No Search Result Found";
    } else {
        errorDiv.innerText = "";
    }

    docs.forEach(book => {
        // console.log(book.author_name);
        //Author Check 
        const validCheck = validname => {
            if (validname !== undefined) {
                return validname;

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
          <h5 class="card-title">${validCheck(book.title)}</h5>
          <h6 class="card-title">Author ${validCheck(book.author_name)}</h6>

          <p class="card-text">Published ${validCheck(book.first_publish_year)}</p>
          
        </div>
      </div>
      `;
        bookContainer.appendChild(div);
    });
}