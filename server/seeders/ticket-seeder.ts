import mongoose from 'mongoose';
import Ticket, { ITicket, TicketStatus } from '../models/ticket';
import { faker } from '@faker-js/faker';
import 'dotenv/config';
import User from '../models/user';
import { randomInt } from 'crypto';

async function seedTickets(amount: number) {
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

		const admins = (await User.find({ isAdmin: true }).select('_id')).map(
			(m) => m._id.toString()
		);

		if (!admins) {
			throw 'Fail to fetch admins!';
		}

		let tickets = await Ticket.find();
		if (tickets.length != 0) {
			await Ticket.deleteMany();
		}

		tickets = generateTickets(amount, admins);
		await Ticket.insertMany(tickets);
		mongoose.disconnect();
	} catch (error) {
		console.log(error);
	}
	return;
}

function generateTickets(limit: number, listOfAdmins: string[]) {
	const tickets = [];
	const ids = new Map<string, number>();
	for (let i = 0; i < 5; i++) {
		const id = faker.string.alpha({ length: 3, casing: 'upper' });
		if (ids.has(id)) {
			i--;
			continue;
		}

		ids.set(id, 1);
	}
	const idkeys = [...ids.keys()];
	const statusList = Object.values(TicketStatus);

	function generateId() {
		const str_id = idkeys[randomInt(5)];
		const int_id = ids.get(str_id);
		ids.set(str_id, int_id + 1);

		return `${str_id}-${int_id}`;
	}

	for (let i = 0; i < limit; i++) {
		const id = generateId();
		const title = faker.company.catchPhrase();
		const description = faker.hacker.phrase();
		const status = statusList[randomInt(statusList.length)];
		const createdBy = listOfAdmins[randomInt(0, listOfAdmins.length)];
		const createdAt = new Date(2024, randomInt(0, 12), randomInt(1, 29));
		const ticket = {
			id,
			title,
			description,
			status,
			createdBy,
			createdAt
		};
		console.log(ticket);
		tickets.push(ticket);
	}
	return tickets;
}

seedTickets(10);
