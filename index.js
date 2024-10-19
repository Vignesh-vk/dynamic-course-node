const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const courseRoutes = require('./routes/courseRoute.js');
const sectionRoutes = require('./routes/sectionRoute.js');
const lessonRoutes = require('./routes/lessonRoutes.js');
const quizRoutes = require('./routes/quizRoute.js');
const authRoutes = require('./routes/authRoute.js');

const dotenv = require('dotenv');

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Dynamic course management!');
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quiz', quizRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
