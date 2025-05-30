import { NextResponse, type NextRequest } from 'next/server';
import {
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import User from '@/lib/db/models/User';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = new User({
        email,
      });
      await newUser.save();
      return NextResponse.json(null, SUCCESS);
    } else {
      return NextResponse.json(null, SUCCESS);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
