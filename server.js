const express= require("express");
const    app=express();

app.use(express.json()); 
let books = [
    {
        id: 101,
        title: "Java Programming",
        author: "Macbeth",
        category: "Programming",
        quantity: 5,
        available: 5
    },
    {
        id: 102,
        title: "C++ Programming",
        author: "Bjarne",
        category: "Programming",
        quantity: 3,
        available: 3
    },
       {
        id: 103,
        title: "Python Programming",
        author: "Hakla",
        category: "Programming",
        quantity: 3,
        available: 3
    }
    
];


app.post('/api/books', (req, res) => {

    const { id, title, author, category, quantity, available } = req.body;

    
    const existingBook = books.find(b => b.id === Number(id));

    if (existingBook) {
        return res.status(400).json({
            message: "Book ID already exists"
        });
    }

    const newBook = {
        id: Number(id),
        title,
        author,
        category,
        quantity: Number(quantity),
        available: Number(available)
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.get('/api/books', (req, res) => {

    res.json(books);

});




app.get('/api/books/search/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.send("Book not found");
    }

    res.json(book);
});



app.listen(3000, () => {
    console.log("Library Server running on port 3000");
});