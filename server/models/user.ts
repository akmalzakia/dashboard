import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IToken {
  token: string;
}

interface IUser {
  displayName: string;
  email: string;
  password: string;
  tokens: IToken[];
  isAdmin: boolean;
}

interface IUserMethods {
  verifyPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>, IUserMethods>(
  {
    displayName: {
      type: String,
      required: [true, 'Please provide a display name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
    },
    password: { type: String, required: [true, 'Please provide a password'] },
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
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
      },
    },
  }
);

const User = mongoose.model('User', userSchema);

export default User;
