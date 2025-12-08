import express from 'express';// const express = require('express');
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';



dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
    app.use(
    cors({
        origin: 'http://localhost:5173',
    }
    ));
}


app.use(express.json());
app.use(rateLimiter);


// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

});


// mongodb+srv://dananjayatharindu794_db_user:yfLHve4VysSsoNBX@cluster0.uaf4x4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0