import { NextResponse, type NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { auth } from '@/config/auth/auth';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import { Retrospective } from '@/lib/db/models/Retrospective';
import User from '@/lib/db/models/User';
import { PostRetrospectiveSchema } from '@/lib/schemas/schemas';

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json(UNAUTHORIZED);
  }

  const validatedBody = PostRetrospectiveSchema.parse(await req.json());

  await connectDB();

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    const retrospective = new Retrospective({
      ...validatedBody,
      author: email,
    });
    await retrospective.save({ session: mongoSession });

    const user = await User.findOneAndUpdate(
      { email },
      { $push: { retrospectives: retrospective._id } },
      { new: true, session: mongoSession }
    );

    if (!user) {
      throw new Error('User not found');
    }
    await mongoSession.commitTransaction();
    return NextResponse.json(retrospective, { status: 201 });
  } catch (err) {
    console.error(err);
    await mongoSession.abortTransaction();
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  } finally {
    mongoSession.endSession();
  }
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  try {
    await connectDB();
    const user = await User.findOne({ email }).populate('retrospectives');

    if (!user) {
      return NextResponse.json(null, NOT_FOUND);
    }
    return NextResponse.json(
      { retrospectives: user.retrospectives },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching retrospectives:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
