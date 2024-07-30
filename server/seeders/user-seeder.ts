import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../models/user';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function seedUser(amount: number) {
	try {
		await mongoose
			.connect(process.env.MONGODB_URI || '', { dbName: 'Dashboard' })
			.then(() => {
				console.log('Connected to MongoDB');
			})
			.catch((err) => {
				console.error('Error connecting to MongoDB', err);
				return;
			});

		let users = await User.find();
		if (users.length != 0) {
			await User.deleteMany();
		}

		users = await generateUsers(amount);
		const docs = await User.insertMany(users);
		await mongoose.disconnect();
		console.log('User seeded successfully');
	} catch (error) {
		console.log('Failed seeding user');
	}
	return;
}

async function generateUsers(limit: number) {
	const users = [];
	for (let i = 0; i < limit; i++) {
		const fn = faker.person.firstName();
		const ln = faker.person.lastName();
		const email = faker.internet.email({
			firstName: fn,
			lastName: ln,
		});
		const pass = faker.internet.password({ length: 20 });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(pass, salt);
		const isAdmin = faker.datatype.boolean();
		const user = {
			displayName: `${fn} ${ln}`,
			email: email,
			password: hashedPassword,
			isAdmin: isAdmin,
		};
		console.log(user);
		users.push(user);
	}
	return users;
}

seedUser(10);
