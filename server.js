
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: 101, title: "Java Programming", author: "Macbeth", category: "Programming", quantity: 5, available: 5 },
    { id: 102, title: "C++ Programming", author: "Bjarne", category: "Programming", quantity: 3, available: 3 },
    { id: 103, title: "Python Programming", author: "Hakla", category: "Programming", quantity: 3, available: 3 }
];


app.post('/api/books', (req, res) => {
    const { id, title, author, category, quantity, available } = req.body;

    if (books.find(b => b.id === Number(id)))
        return res.status(400).json({ message: "Book ID already exists" });

    const newBook = { id: Number(id), title, author, category,
        quantity: Number(quantity), available: Number(available) };

    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});


app.get('/api/books', (req, res) => {
    res.json(books);
});


app.get('/api/books/search/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    res.json(books.filter(b => b.title.toLowerCase().includes(title)));
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
});

app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) return res.status(404).send("Book not found");

    const { title, author, category, quantity, available } = req.body;
    Object.assign(book, { title, author, category,
        quantity: Number(quantity), available: Number(available) });

    res.send("Book updated successfully");
});

app.delete('/api/books/:id', (req, res) => {
    books = books.filter(b => b.id !== Number(req.params.id));
    res.send("Book deleted successfully");
});

app.listen(3000, () => console.log("Server running on port 3000"));
