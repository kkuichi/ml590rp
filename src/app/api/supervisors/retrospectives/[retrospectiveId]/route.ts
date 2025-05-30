import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/config/auth/auth';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import Retrospective from '@/lib/db/models/Retrospective';
import User from '@/lib/db/models/User';

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
      supervisedRetrospectives: { $elemMatch: { $eq: retrospectiveId } },
    });

    if (!user) {
      return NextResponse.json(null, NOT_FOUND);
    }

    const retrospective = await Retrospective.findById(retrospectiveId);

    if (!retrospective) {
      return NextResponse.json(null, NOT_FOUND);
    }

    return NextResponse.json(retrospective, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
