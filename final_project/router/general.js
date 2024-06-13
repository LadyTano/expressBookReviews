const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username != null && password != null)
    {
    users.push({"username":req.query.username, "password":req.query.password});
    res.send("The user" + (' ')+ (username) + " Has been added!")
    }
    else
    {
        res.send("Username and Password cannot be blank")
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
    let filtered_books = Object.filter((books) => books.author === author);
    res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = Object.filter((review) => books.title === title);
    res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  res.send(books[isbn.reviews]);
});

module.exports.general = public_users;
