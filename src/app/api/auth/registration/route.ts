import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/actions/hashPassword';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import User from '@/lib/db/models/User';
import { CredentialsSchema } from '@/lib/schemas/schemas';

// TODO REPLACE WITH SERVER ACTION

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { email, password } = CredentialsSchema.parse(body);
    await connectDB();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(null, BAD_REQUEST);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json(null, SUCCESS);
  } catch (err) {
    console.error(err);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
