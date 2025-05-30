import { NextResponse } from 'next/server';
import { auth } from '@/config/auth/auth';
import connectDB from '@/lib/db/connectDB';
import User from '@/lib/db/models/User';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from '@/lib/constants/server/responses';

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;
  
  try {
    await connectDB();
    const user = await User.findOne({ email }).populate(
      'supervisedRetrospectives'
    );

    if (!user) {
      return NextResponse.json(null, NOT_FOUND);
    }
    return NextResponse.json(user.supervisedRetrospectives, SUCCESS);
  } catch (error) {
    console.error('Error fetching retrospectives:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
