var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var btnSubmit = document.getElementById("sumbit");
var tableBody = document.getElementById("rowdata");
var hide = document.getElementById("hide");
var xmark = document.getElementById("xmark");

var bookmarkArr = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarkArr = JSON.parse(localStorage.getItem("bookmarks"));
  renderData();
}

function displayBookmark() {
  if (validation(siteName) && validation(siteUrl)) {
    //create obj to save data
    var bookmarkObj = {
      name: siteName.value,
      url: siteUrl.value,
    };
    //push obj for loop
    bookmarkArr.push(bookmarkObj);
    ///clear inputs
    clearData();
    //render tr in body Html
    renderData();
    //localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
  } else {
    hide.classList.remove("hide");
  }
}

function clearData() {
  siteName.value = null;
  siteUrl.value = null;
  siteUrl.classList.remove("is-valid");
  siteUrl.classList.remove("is-invalid");
  siteName.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");
}

function renderData() {
  var allData = "";
  for (var i = 0; i < bookmarkArr.length; i++) {
    allData += `
    
    <tr>
    <td>${i + 1}</td>
    <td>${bookmarkArr[i].name}</td>
    <td>
      <button class="btn btn-success">
        
        <a
          href="${bookmarkArr[i].url}"
          target="_blank"
          class="text-light text-decoration-none"
          ><i class="fa-solid fa-eye pe-2"></i> Visit</a
        >
      </button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteItem(${i})">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
  </tr>
    
    `;
  }
  tableBody.innerHTML = allData;
}
function deleteItem(index) {
  bookmarkArr.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
  renderData();
}

function validation(element) {
  var text = element.value;
  var regex = {
    siteName: /^.{3,}$/,
    siteURL:
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[a-zA-Z0-9-_.~%]*)*(\?[a-zA-Z0-9-_.~&=]*)?$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
xmark.onclick = () => {
  hide.classList.add("hide");
};
