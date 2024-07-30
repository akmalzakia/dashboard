import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/router';

import 'dotenv/config';
import cookieParser from 'cookie-parser';

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
app.use(cors());
app.use(cookieParser());

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
