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

  titleText = () => {
    return `${this.title}`;
  };

  authorText = () => {
    return `by ${this.author},`;
  };

  infoText = () => {
    return `a ${this.genre} with ${this.pages} pages`;
  };
}

// Add Book to Collection Array
const addBookToCollection = (title, author, genre, pages, readStatus) => {
  const book = new Book(title, author, genre, pages, readStatus);
  bookCollection.push(book);
};

// Example Books
const BookOne = addBookToCollection(
  "To Kill a Mockingbird",
  "Harper Lee",
  "Southern Gothic Novel",
  "336",
  "not read"
);
const BookTwo = addBookToCollection(
  "The Alchemist",
  "Paulo Coelho",
  "Adventure Fiction Novel",
  "208",
  "read"
);
const BookThree = addBookToCollection(
  "1984",
  "George Orwell",
  "Dystopian Novel",
  "328",
  "read"
);

console.log(bookCollection);

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
    titleElement.textContent = bookCollection[i].titleText();
    titleElement.classList.add("title");
    bookElement.appendChild(titleElement);

    // Author Element - contains only Author
    let authorElement = document.createElement("div");
    authorElement.textContent = bookCollection[i].authorText();
    authorElement.classList.add("author");
    bookElement.appendChild(authorElement);

    // Info Element - contains Author, Genre & Pages
    let infoElement = document.createElement("div");
    infoElement.textContent = bookCollection[i].infoText();
    infoElement.classList.add("info");
    bookElement.appendChild(infoElement);

    // Append Books to Shelf
    bookshelf.appendChild(bookElement);
  }
};

displayBooks();
