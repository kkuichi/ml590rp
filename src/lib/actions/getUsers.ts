'use server';

import { IUser } from '@/types/types';
import { auth } from '../../config/auth/auth';
import connectDB from '../db/connectDB';
import User from '../db/models/User';

/**
 * Returns users list according to query string.
 * @param {string} searchQuery - Query string for searching.
 * @returns {romise<Array<string>>} List of emails.
 * Returns empty array in case of error.
 * @example
 * const emails = await getUsers('john');
 * // ['john@example.com', 'john.doe@example.com']
 */
export const getUsers = async (searchQuery: string): Promise<Array<string>> => {
  const session = await auth();
  if (!session?.user?.email || !searchQuery) {
    return [];
  }
  try {
    await connectDB();
    const users = await User.find<IUser>({
      email: { $regex: searchQuery, $options: 'i' },
    }).limit(5);
    return users.map((user) => user.email);
  } catch (error) {
    console.error('Error fetching users', error);
    return [];
  }
};
