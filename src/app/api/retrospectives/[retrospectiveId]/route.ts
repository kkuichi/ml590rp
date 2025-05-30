import { NextResponse, type NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { auth } from '@/config/auth/auth';
import connectDB from '@/lib/db/connectDB';
import Retrospective from '@/lib/db/models/Retrospective';
import User from '@/lib/db/models/User';
import { PatchRetrospectiveSchema } from '@/lib/schemas/schemas';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, SUCCESS } from '@/lib/constants/server/responses';


interface IParamsWithId {
  params: Promise<{
    retrospectiveId: string;
  }>;
}

export async function GET(_: NextRequest, { params }: IParamsWithId) {
  const session = await auth();
  const email = session?.user?.email;
  

  const { retrospectiveId } = await Promise.resolve(params);
  if (!retrospectiveId) {
    return NextResponse.json(null, BAD_REQUEST);
  }

  try {
    await connectDB();
    const user = await User.findOne({
      email,
      retrospectives: { $elemMatch: { $eq: retrospectiveId } },
    });

    if (!user) {
      return NextResponse.json(null, NOT_FOUND);
    }

    const retrospective = await Retrospective.findById(retrospectiveId);

    if (!retrospective) {
      return NextResponse.json(null, NOT_FOUND);
    }

    return NextResponse.json(retrospective, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}

export async function PATCH(req: NextRequest, { params }: IParamsWithId) {
  const session = await auth();
  const email = session?.user?.email;
  
  try {
    const body = await req.json();
    const validatedBody = PatchRetrospectiveSchema.parse(body);

    const { retrospectiveId } = await Promise.resolve(params);
    await connectDB();

    const user = await User.findOne({
      email,
      retrospectives: { $elemMatch: { $eq: retrospectiveId } },
    });

    if (!user) {
      return NextResponse.json(null, NOT_FOUND);
    }

    const updatedRetrospective = await Retrospective.findByIdAndUpdate(
      retrospectiveId,
      { $set: validatedBody },
      { new: true, runValidators: true }
    );

    const { members, supervisors } = updatedRetrospective;
    // TODO use body instead of retrospective itself , move to User.save instead of findByIdAndUpdate
    if (members.length) {
      const users = await User.find({ email: { $in: members } });

      const updatePromises = users.map((user) =>
        User.findByIdAndUpdate(
          user._id,
          { $addToSet: { retrospectives: updatedRetrospective._id } },
          { new: true }
        )
      );

      await Promise.allSettled(updatePromises);
    }
    if (supervisors.length) {
      const users = await User.find({ email: { $in: supervisors } });
      const updatePromises = users.map((user) =>
        User.findByIdAndUpdate(
          user._id,
          { $addToSet: { supervisedRetrospectives: updatedRetrospective._id } },
          { new: true }
        )
      );
      await Promise.allSettled(updatePromises);
    }

    if (!updatedRetrospective) {
      return NextResponse.json(null, NOT_FOUND);
    }

    return NextResponse.json({ updatedRetrospective }, SUCCESS);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, BAD_REQUEST);
    }
    console.log(error);
    return NextResponse.json(error, INTERNAL_SERVER_ERROR);
  }
}

export async function DELETE(_: NextRequest, { params }: IParamsWithId) {
  const session = await auth();
  const email = session?.user?.email;
  
  try {
    const { retrospectiveId } = await Promise.resolve(params);
    await connectDB();

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      await User.findOneAndUpdate(
        {
          email,
          retrospectives: { $elemMatch: { $eq: retrospectiveId } },
        },
        { $pull: { retrospectives: retrospectiveId } },
        { new: true, session: mongoSession }
      );

      await Retrospective.findByIdAndDelete(retrospectiveId, {
        session: mongoSession,
      });
      await mongoSession.commitTransaction();
    } catch (err) {
      await mongoSession.abortTransaction();
      console.error(err);
      return NextResponse.json(err, INTERNAL_SERVER_ERROR);
    }
    await mongoSession.endSession();
    return NextResponse.json(null, SUCCESS);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, INTERNAL_SERVER_ERROR);
  }
}