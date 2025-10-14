# Books – Mandatory Reading List
A small vanilla JavaScript project that loads a list of books from a JSON file, displays them on the page, and lets you sort them by title, author, or year published.

## Features
* Data stored in `books.json` and loaded dynamically using `fetch`.
* Object-oriented design with a `Book` class for structure and behavior.
* Sorting handled through class static methods (`sortByTitle`, `sortByAuthor`, `sortByYear`).
* Clean DOM updates with `Book.printList()`.

## Project Structure
```md
books-app/
├── index.html   # Page markup and buttons
├── script.js    # Logic: class, fetch, render, sort
└── books.json   # Book data (plain objects)
```

## How to Run
1. Open the folder in VS Code.
1. Start Live Server (right-click → Open with Live Server).
1. The app will load the books and display them automatically.
1. Click the buttons to sort the list.

## What You’ll Learn
* How to load and use JSON data with fetch().
* How to create and use ES6 classes and static methods.
* How to render dynamic HTML content and handle sorting logic.