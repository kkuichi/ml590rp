import mongoose, { Schema, Types } from 'mongoose';
import { IUser } from '@/types/types';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  retrospectives: {
    type: [
      {
        type: Types.ObjectId,
        ref: 'Retrospective',
      },
    ],
    default: [],
  },
  supervisedRetrospectives: {
    type: [
      {
        type: Types.ObjectId,
        ref: 'Retrospective',
      },
    ],
    default: [],
  },
  password: {
    type: String,
    select: false,
  },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
