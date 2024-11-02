// Variables
const bookshelf = document.querySelector(".bookshelf");

// Initilizations
const bookCollection = [];

// Book Class
class Book {
  constructor(title, author, genre, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  title = () => {
    return `${this.title}`;
  };

  info = () => {
    return `by ${this.author}, a ${this.genre} with ${this.pages} pages`;
  };
}

// Example Books
const BookOne = new Book("BookOne", "Some", "Romance", "9", "not read");
const BookTwo = new Book("BookTwo", "Some", "Thriller", "13", "read");
const BookThree = new Book("BookThree", "Some", "Novel", "92", "not read");

// Add Book to Collection Array
const addBookToCollection = (title, author, genre, pages, readStatus) => {
  const book = new Book(title, author, genre, pages, readStatus);
  bookCollection.push(book);
};

// Display Books
const displayBooks = () => {
  bookshelf.innerHTML = "";

  // Loop through array and create all the stuff
  for (let i = 0; i < bookCollection.length; i++) {
    // Book Elements - contains everything else
    let bookElement = document.createElement("div");
    bookElement.dataset.index = i;
    bookElement.classList.add("book");

    // Title Element - contains only Title
    let titleElement = document.createElement("div");
    titleElement.classList.add("title");
    bookElement.appendChild(titleElement);

    // Info Element - contains Author, Genre & Pages
    let infoElement = document.createElement("div");
    infoElement.textContent = this.info();
    infoElement.classList.add("info");
    bookElement.appendChild(infoElement);

    // Append Books to Shelf
    bookshelf.appendChild(bookElement);
  }
};

displayBooks();
