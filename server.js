import express from 'express';
import { config } from 'dotenv';
import { connectDatabase } from './config/db.js';
import productRoute from './routes/product.route.js';
import cors from 'cors';
import path from 'path';

config();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true
	})
);

app.get('/', (req, res) => {
	res.json({ message: 'Hello World' });
});

const __dirname = path.resolve();

app.use('/api/v1', productRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
	});
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	connectDatabase();
	console.log(`Server running at port ${PORT}...`);
});
