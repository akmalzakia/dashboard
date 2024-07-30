import mongoose, { Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IToken {
	token: string;
}

export interface ISimpleUser {
	_id: Types.ObjectId;
	displayName: string;
	email: string;
}

export interface IUser extends ISimpleUser {
	password: string;
	tokens?: IToken[];
	isAdmin: boolean;
}

interface IUserMethods {
	verifyPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<
	IUser,
	Model<IUser, {}, IUserMethods>,
	IUserMethods
>(
	{
		displayName: {
			type: String,
			required: [true, 'Please provide a display name'],
		},
		email: {
			type: String,
			required: [true, 'Please provide an email address'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		isAdmin: { type: Boolean, default: false },
	},
	{
		methods: {
			async verifyPassword(password: string) {
				const user = this;
				console.log(this, password);
				const isMatch = await bcrypt.compare(password, user.password);
				return isMatch;
			},
		},
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;
