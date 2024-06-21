const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
//const axios = require('axios').default;

public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username != null && password != null )
     {
    if(isValid(username)){
       res.send("Username must be unique!")
    }
    if(!isValid(username)){
        users.push({"username":req.body.username, "password":req.body.password});
        res.send("The user" + (' ')+ (username) + " Has been added!")
        console.info(users);
    }
     
    }
    else
    {
        res.send("Username and Password cannot be blank")
    }
});

//function to get the booksdb

async function getBooks()
{
    let books = require("./booksdb.js");
    return books;
};


// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    let books =  await getBooks();
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  let books =  await getBooks();
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  let books =  await getBooks();
    let filtered_books = Object.filter((books) => books.author === author);
    res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    const isbn = req.params.isbn;
    let books =  await getBooks();
    let filtered_books = Object.filter((review) => books.title === title);
    res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  res.send(books[isbn.reviews]);
});

module.exports.general = public_users;
