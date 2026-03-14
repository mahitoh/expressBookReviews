const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books,null,4)));
  });
  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const get_book = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(res.send(JSON.stringify(books[isbn], null, 4)));
    } else {
      reject(res.status(404).json({message: "Book not found"}));
    }
  });
  get_book.then(() => console.log("Promise for Task 11 resolved"));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const get_books_author = new Promise((resolve, reject) => {
    let books_by_author = [];
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if(books[key].author === author) {
        books_by_author.push(books[key]);
      }
    });
    if (books_by_author.length > 0) {
      resolve(res.send(JSON.stringify(books_by_author, null, 4)));
    } else {
      reject(res.status(404).json({message: "No books found by this author"}));
    }
  });
  get_books_author.then(() => console.log("Promise for Task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const get_books_title = new Promise((resolve, reject) => {
    let books_by_title = [];
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if(books[key].title === title) {
        books_by_title.push(books[key]);
      }
    });
    if (books_by_title.length > 0) {
      resolve(res.send(JSON.stringify(books_by_title, null, 4)));
    } else {
      reject(res.status(404).json({message: "No books found with this title"}));
    }
  });
  get_books_title.then(() => console.log("Promise for Task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
