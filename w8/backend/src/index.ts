import express from 'express';
import { prisma } from '../lib/prisma'
import cors from 'cors'

const app = express();
const port = process.env.Port || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('From Prisma API');
});

// get all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        if (books.length === 0 ) {
            return res.json(['\n']);
        }else {
            res.json(books);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the book' })
    }
});

// get book by id
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: { bookId: id },
        });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' })
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the book' })
    };
});

// create book
app.post('/api/books', async (req, res) => {
    const { title, author, description, price } = req.body
    try {
        const book = await prisma.book.create({
            data: {
                title, 
                author, 
                description, 
                price,
            },
        });
        res.status(201).json(book)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the book.' })
    }
});

// update book
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price } = req.body;
    try {
        const book = await prisma.book.update({
            where: { bookId: id },
            data: {
                title,
                author,
                description,
                price,
            },
        });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the book.' })
    }
});

app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.book.delete({
            where: { bookId: id },
        });
        res.status(204).send();
    }
    catch (error: any) {
        if (error.code === 'P2025' ) {
            res.status(404).json({ error: 'Book not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the book.' })
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});