// script.js

// 1) Book "blueprint" with data + behavior
class Book {
  constructor(title, authorFirstName, authorLastName, yearPublished) {
    this.title = title;
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.published = yearPublished;
  }

  // 2) Pretty print a book
  toString() {
    const {
      authorFirstName: af,
      authorLastName: al,
      title,
      published: pub
    } = this; // Destructure the instance
    return `${af} ${al}: ${title} (${pub})`;
  }

  // 3) Render a list of books into the <ol>
  static printList(booklist) {
    const listElement = document.getElementById("myList");
    let html = "";
    for (const book of booklist) {
      html += `<li>${book.toString()}</li>`;
    }
    listElement.innerHTML = html;
  }

  // 4) Sort helpers (comparators)
  static sortByTitle(a, b) {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    if (aTitle > bTitle) return 1;
    if (aTitle < bTitle) return -1;
    return 0;
  }

  static sortByTitleAlternative(a, b) {
    return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  }

  static sortByAuthor(a, b) {
    const aLast = a.authorLastName.toLowerCase();
    const bLast = b.authorLastName.toLowerCase();
    if (aLast > bLast) return 1;
    if (aLast < bLast) return -1;

    const aFirst = a.authorFirstName.toLowerCase();
    const bFirst = b.authorFirstName.toLowerCase();
    if (aFirst > bFirst) return 1;
    if (aFirst < bFirst) return -1;

    // (Optional) then by title if needed
    // const aTitle = a.title.toLowerCase();
    // const bTitle = b.title.toLowerCase();
    // if (aTitle > bTitle) return 1;
    // if (aTitle < bTitle) return -1;

    return 0;
  }

  static sortByYear(a, b) {
    return a.published - b.published;
  }
}

// 5) App state: our list (const ref; contents can change)
let myBooks = [];

// 6) Load data from JSON, convert to Book instances, show on page
async function init() {
  try{
    const res = await fetch("books.json");
    console.log(res);
    if (!res.ok) throw new Error("Failed to load books.json");
    const data = await res.json();

    console.log(data);
    console.log(data.books);
    console.log(data.books[0]);
    console.log(data.books[0].title);

    // Convert plain objects → Book instances so methods work
    myBooks = data.books.map(
      b => new Book(b.title, b.authorFirstName, b.authorLastName, b.published)
    );

    Book.printList(myBooks);
  } catch (e) {
    console.error(e.message);
    document.getElementById("errorMessage").innerText = e.message;
  } finally {
    console.log ("This runs on success and failure...")
  }
}

// 7) Sort handlers (called from the buttons in HTML)
function sortByTitle() {
  myBooks.sort(Book.sortByTitle);
  Book.printList(myBooks);
}
function sortByAuthor() {
  myBooks.sort(Book.sortByAuthor);
  Book.printList(myBooks);
}
function sortByYear() {
  myBooks.sort(Book.sortByYear);
  Book.printList(myBooks);
}

// 8) Add Eventlisteners
document.querySelector("#sortByTitle").addEventListener("click", sortByTitle);
document.querySelector("#sortByAuthor").addEventListener("click", sortByAuthor);
document.querySelector("#sortByYear").addEventListener("click", sortByYear);

// 9) Kick things off
init();

/*
// 9) Kick things off, alternative with error handling
init().catch(err => {
  console.error(err);
  document.getElementById("myList").innerHTML =
    `<li>Failed to load books.</li>`;
});
*/