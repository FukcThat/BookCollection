// Variables
const bookshelf = document.querySelector(".bookshelf");
const addBookBtn = document.querySelector(".add-book--btn");
const addBookForm = document.querySelector(".add-book--form");
const titleInput = document.querySelector(".titleInput");
const authorInput = document.querySelector(".authorInput");
const genreInput = document.querySelector(".genreInput");
const pageInput = document.querySelector(".pageInput");
const readStatusInput = document.querySelector(
  'input[name="read-status"]:checked'
);

// Initilizations
const bookCollection = [];

// Event Listeners
addBookBtn.addEventListener("click", () => {
  displayForm();
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateFormInputs()) return;

  const selectedStatus = getCheckedReadStatus();

  // call addBooktoCollection function passing in inputs
  addBookToCollection(
    titleInput.value,
    authorInput.value,
    genreInput.value,
    pageInput.value,
    selectedStatus
  );

  addBookForm.reset();
  displayForm();
});

// Book Class
class Book {
  constructor(title, author, genre, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  titleText = () => {
    return `${this.title}`;
  };

  authorText = () => {
    return `by ${this.author}`;
  };

  genreText = () => {
    return this.genre ? `a ${this.genre}` : "";
  };

  pagesText = () => {
    if (!this.pages) return "";
    return this.pages === "1" ? `with 1 page` : `with ${this.pages} pages`;
  };
}

// HELPER FUNCTIONS

function getCheckedReadStatus() {
  const checkedStatus = document.querySelector(
    'input[name="read-status"]:checked'
  );
  return checkedStatus ? checkedStatus.value : "Not read";
}

// Create Read Status Buttons for Books
const createReadStatusBtns = (statusMenu, statusStripe, book) => {
  setReadStatusColor(statusStripe, book.readStatus);

  ["Read", "Reading now", "Not read"].forEach((status) => {
    let readStatusBtn = document.createElement("button");
    readStatusBtn.textContent = status;
    readStatusBtn.classList.add("read-status--btn");
    readStatusBtn.dataset.status = status;

    // Set Status Color of button based on status
    setReadStatusColor(readStatusBtn, status);

    // Event Listener to change Status after submitting
    readStatusBtn.addEventListener("click", () => {
      book.readStatus = status;

      // Set Status Color of Stripe based on status
      setReadStatusColor(statusStripe, status);
      statusStripe.dataset.status = status;
    });
    statusMenu.appendChild(readStatusBtn);
  });
};

// Set Read Status Color
const setReadStatusColor = (item, status) => {
  console.log("Setting color for:", status);

  switch (status) {
    case "Read":
      item.style.backgroundColor = "#F9DBBD";
      break;
    case "Reading now":
      item.style.backgroundColor = "#FCA17D";
      break;
    case "Not read":
      item.style.backgroundColor = "#E76D6D";
      break;
    default:
      item.style.backgroundColor = "#E76D6D";
  }
};

// Add Book to Collection Array
const addBookToCollection = (title, author, genre, pages, readStatus) => {
  const book = new Book(title, author, genre, pages, readStatus);
  bookCollection.push(book);
  saveBooksLocally();
  displayBooks();
};

// Local Storage - Set Item
const saveBooksLocally = () => {
  localStorage.setItem("bookCollection", JSON.stringify(bookCollection));
};

// Local Storage - Get Item
const getBooksLocally = () => {
  const savedBooks = localStorage.getItem("bookCollection");
  if (savedBooks) {
    JSON.parse(savedBooks).forEach((savedBook) => {
      const book = new Book(
        savedBook.title,
        savedBook.author,
        savedBook.genre,
        savedBook.pages,
        savedBook.readStatus
      );
      bookCollection.push(book);
    });
  } else {
    displayExampleBooks();
  }
  displayBooks();
};

// Validate Form Inputs
const validateFormInputs = () => {
  let errorFound = false;

  // Title Validation
  if (titleInput.validity.valueMissing) {
    showError(titleInput, "What was the title again?");
    errorFound = true;
  } else if (!titleInput.validity.valid) {
    showError(titleInput, "That doesn't seem right...");
    errorFound = true;
  }

  // Author Validation
  if (authorInput.validity.valueMissing) {
    showError(authorInput, "What's the author's name?");
    errorFound = true;
  } else if (!authorInput.validity.valid) {
    showError(authorInput, "Are you sure that's the name?");
    errorFound = true;
  }

  return errorFound;
};

// Show Error
const showError = (input, error) => {
  if (!input.hasAttribute("original-placeholder")) {
    input.setAttribute("original-placeholder", input.placehodler);
  }

  input.placeholder = error;
  input.style.setProperty("--placeholder-color", "red");
  input.style.borderColor = "red";
  input.value = "";

  setTimeout(() => {
    input.placehodler = input.getAttribute("original-placeholder");
    input.style.removeProperty("borderColor");
    input.style.removeProperty("--placeholder-color");
  }, 5000);
};

// Delete Book
const deleteBook = (index) => {
  bookCollection.splice(index, 1);
  saveBooksLocally();
  displayBooks();
};

// ADD-BOOK FORM
const displayForm = () => {
  addBookForm.classList.toggle("open");
  addBookBtn.classList.toggle("close");
};

// DISPLAY BOOKS FUNCTION
const displayBooks = () => {
  bookshelf.innerHTML = "";

  // Loop through array and create all the stuff
  for (let i = 0; i < bookCollection.length; i++) {
    // Book Elements - contains everything else
    let bookElement = document.createElement("div");
    bookElement.dataset.index = i;
    bookElement.classList.add("book");

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteBook(i));
    bookElement.appendChild(deleteBtn);

    const closedTrashIcon = document.createElement("span");
    closedTrashIcon.classList.add("icon", "closed-trash");
    closedTrashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg>`;
    deleteBtn.appendChild(closedTrashIcon);

    const openTrashIcon = document.createElement("span");
    openTrashIcon.classList.add("icon", "open-trash");
    openTrashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37zM6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"/></svg>`;
    deleteBtn.appendChild(openTrashIcon);

    // Title Element
    let titleElement = document.createElement("div");
    titleElement.textContent = bookCollection[i].titleText();
    titleElement.classList.add("title");
    bookElement.appendChild(titleElement);

    // Author Element
    let authorElement = document.createElement("div");
    authorElement.textContent = bookCollection[i].authorText();
    authorElement.classList.add("author");
    bookElement.appendChild(authorElement);

    // Info Div
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    bookElement.appendChild(infoDiv);

    // Genre Element
    let genreElement = document.createElement("div");
    genreElement.textContent = bookCollection[i].genreText();
    infoDiv.appendChild(genreElement);

    // Pages Element
    let pagesElement = document.createElement("div");
    pagesElement.textContent = bookCollection[i].pagesText();
    infoDiv.appendChild(pagesElement);

    // Read Status Element - displays Status in Color, changable on hover
    let statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    statusContainer.setAttribute("data-status", "in-progress");
    bookElement.appendChild(statusContainer);

    // Status Stripe - color stripe indicating read status
    let statusStripe = document.createElement("div");
    statusStripe.classList.add("status-stripe");
    setReadStatusColor(statusStripe, bookCollection[i].readStatus);
    statusContainer.appendChild(statusStripe);

    // Status Menu - contains buttons to change status
    let statusMenu = document.createElement("div");
    statusMenu.classList.add("status-menu");
    statusContainer.appendChild(statusMenu);

    // Create status buttons using the helper function
    createReadStatusBtns(statusMenu, statusStripe, bookCollection[i]);

    // Append Books to Shelf
    bookshelf.appendChild(bookElement);
  }
};

displayBooks();

// EXAMPLE BOOKS
const displayExampleBooks = () => {
  addBookToCollection(
    "To Kill a Mockingbird",
    "Harper Lee",
    "Southern Gothic Novel",
    "336",
    "Not read"
  );
  addBookToCollection(
    "The Alchemist",
    "Paulo Coelho",
    "Adventure Fiction Novel",
    "208",
    "Read"
  );
  addBookToCollection(
    "1984",
    "George Orwell",
    "Dystopian Novel",
    "328",
    "Reading now"
  );
};

window.addEventListener("DOMContentLoaded", getBooksLocally);
