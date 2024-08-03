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

		const users = (await User.find().select('_id isAdmin')).map((m) => {
			const id = m._id.toString();
			const isAdmin = m.isAdmin;
			return {
				id,
				isAdmin,
			};
		});

		if (!users) {
			throw 'Fail to fetch users!';
		}

		let tickets = await Ticket.find();
		if (tickets.length != 0) {
			await Ticket.deleteMany();
		}

		tickets = generateTickets(amount, users);
		await Ticket.insertMany(tickets);
		mongoose.disconnect();
	} catch (error) {
		console.log(error);
	}
	return;
}

function generateTickets(
	limit: number,
	listOfUsers: { id: string; isAdmin: boolean }[]
) {
	const tickets = [];
	const admins = listOfUsers.filter((u) => u.isAdmin);
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

	function getAssignee(creatorId: string) {
		let assignee: string;
		do {
			const rng = randomInt(0, listOfUsers.length + 1);
			if (rng === listOfUsers.length) {
				assignee = null;
				break;
			}

			assignee = listOfUsers[rng].id;
		} while (assignee === creatorId);

		return assignee;
	}

	for (let i = 0; i < limit; i++) {
		const id = generateId();
		const title = faker.company.catchPhrase();
		const description = faker.hacker.phrase();
		const status = statusList[randomInt(statusList.length)];
		const createdBy = admins[randomInt(0, admins.length)].id;
		const createdAt = new Date(2024, randomInt(0, 12), randomInt(1, 29));
		const assignee = getAssignee(createdBy);
		let ticket: Record<string, any> = {
			id,
			title,
			description,
			status,
			createdBy,
			createdAt,
		};

		if (assignee) {
			ticket = { ...ticket, assignee: assignee };
		}

		console.log(ticket);
		tickets.push(ticket);
	}
	return tickets;
}

seedTickets(20);
