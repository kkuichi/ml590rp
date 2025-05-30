import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/config/auth/auth';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import { CommentModel } from '@/lib/db/models/CommentModel';

interface IParamsWithId {
  params: Promise<{
    retrospectiveId: string;
  }>;
}

export async function GET(_: NextRequest, { params }: IParamsWithId) {
  const { retrospectiveId } = await Promise.resolve(params);
  if (!retrospectiveId) {
    return NextResponse.json(null, BAD_REQUEST);
  }

  try {
    await connectDB();
    const comments = await CommentModel.find({ retrospectiveId });
    return NextResponse.json(comments, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
export async function POST(req: NextRequest, { params }: IParamsWithId) {
  const session = await auth();
  const email = session?.user?.email;
  
  const { retrospectiveId } = await Promise.resolve(params);
  if (!retrospectiveId) {
    return NextResponse.json(null, BAD_REQUEST);
  }
  const { text } = await req.json();
  try {
    await connectDB();
    const comment = new CommentModel({
      author: email,
      retrospectiveId,
      text,
    });
    await comment.save();
    return NextResponse.json(null, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
