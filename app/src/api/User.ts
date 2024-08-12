import axios from 'axios';
import { User } from '../context/userContext';

export async function getCurrentUser() {
	try {
		const res = await axios.get<User>('/api/user', {
			withCredentials: true,
		});

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errResponse = error.response;
			if (errResponse?.status === 403) {
				console.log(errResponse.data.message);
			}
		} else {
			console.log(error);
		}

		throw new Error('Error fetching user!');
	}
}
