import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import User from '@/lib/db/models/User';

//   TODO Add correct error messages

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    await connectDB();
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return NextResponse.json(null, NOT_FOUND);
    }
    const passwordMatch = await bcrypt.compare(password!, user.password);
    if (!passwordMatch) {
      return NextResponse.json(null, BAD_REQUEST);
    }
    return NextResponse.json(null, SUCCESS);
  } catch (err) {
    console.error(err);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
