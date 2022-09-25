let myLibrary = [];

const container = document.querySelector(".cards-container");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".add");

addBookBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    clearInput();
  }
});

function clearInput() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

function addBookToLibrary() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  myLibrary.push(newBook);
  clearInput();
}

document.querySelector("#form").addEventListener("submit", (e) => {
  title.value && author.value && pages.value && addBookToLibrary();
  e.preventDefault();
  console.log(myLibrary);
  modal.style.display = "none";
  displayBooks();
});

const cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  clearInput();
});

function displayBooks() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());

  myLibrary.map((book, index) => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.dataset.key = index;

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = `Book ${index + 1}`;
    newCard.appendChild(cardTitle);

    const titleTag = document.createElement("h4");
    titleTag.classList.add("tags");
    titleTag.innerText = "Title:";
    newCard.appendChild(titleTag);

    const bookTitle = document.createElement("h4");
    bookTitle.classList.add("book-title");
    bookTitle.innerText = book.title;
    newCard.appendChild(bookTitle);

    const authorTag = document.createElement("h4");
    authorTag.classList.add("tags");
    authorTag.innerText = "Author:";
    newCard.appendChild(authorTag);

    const bookAuthor = document.createElement("h4");
    bookAuthor.classList.add("book-author");
    bookAuthor.innerText = book.author;
    newCard.appendChild(bookAuthor);

    const pagesTag = document.createElement("h4");
    pagesTag.classList.add("tags");
    pagesTag.innerText = "Pages:";
    newCard.appendChild(pagesTag);

    const bookPages = document.createElement("h4");
    bookPages.classList.add("book-pages");
    bookPages.innerText = book.pages;
    newCard.appendChild(bookPages);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.innerText = "remove";
    newCard.appendChild(removeBtn);

    const readBtn = document.createElement("button");
    if (book.isRead) {
      readBtn.classList.add("isRead");
      readBtn.innerText = "read";
    } else {
      readBtn.classList.add("notRead");
      readBtn.innerText = "not read";
    }
    newCard.appendChild(readBtn);

    readBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      displayBooks();
    });

    container.appendChild(newCard);
    removeBtn.addEventListener("click", (e) => {
      const bookIndex = e.target.parentElement.dataset.key;
      console.log(bookIndex);
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });
  });
}
