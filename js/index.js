const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const bookDetails = document.getElementById("book-details");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");



searchBtn.addEventListener("click", function () {
  const searchText = searchInput.value;
  if (searchText === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }
  //   Clear
  bookContainer.innerHTML = "";
  bookDetails.innerHTML = "";
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  console.log(url);
  spinner.classList.remove("d-none");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Setting a timer of 1.5s, before removing the spinnner, and showing data
    //   console.log(data.docs);
      setTimeout(() => {
        spinner.classList.add("d-none");
        showSearchResult(data.docs);
      }, 1500);
    })
    .finally(() => {
      searchInput.value = "";
    });
});

const showSearchResult = docs => {
    // console.log(docs);
  // Error Handing
  if (docs.length === 0 ) {
    errorDiv.innerText = "No Search Result Found";
  } else {
    errorDiv.innerText = "";
  }

  docs.forEach(book => {
    // console.log(book);
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-title">${book.author_name}</h6>

          <p class="card-text">Published ${book.first_publish_year}</p>
          
        </div>
      </div>
      `;
    bookContainer.appendChild(div);
  });
}

