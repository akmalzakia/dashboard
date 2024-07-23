import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import 'dotenv/config';

const app = express();
const PORT = 3001;

mongoose
	.connect(process.env.MONGODB_URI || '', { dbName: 'Dashboard' })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB', err);
	});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors());

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
