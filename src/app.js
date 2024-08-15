function handleSearchSubmit(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  //console.log(searchFormInput.value);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchFormInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
