import { NextRequest, NextResponse } from 'next/server';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from '@/lib/constants/server/responses';
import connectDB from '@/lib/db/connectDB';
import { CommentModel } from '@/lib/db/models/CommentModel';
import { PatchCommentSchema } from '@/lib/schemas/schemas';

interface IParamsWithId {
  params: Promise<{
    retrospectiveId: string;
    commentId: string;
  }>;
}

export async function GET(_: NextRequest, { params }: IParamsWithId) {
  const { retrospectiveId, commentId } = await Promise.resolve(params);
  if (!retrospectiveId && !commentId) {
    return NextResponse.json(null, BAD_REQUEST);
  }

  try {
    await connectDB();
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return NextResponse.json(null, NOT_FOUND);
    }
    return NextResponse.json(comment, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}

export async function PATCH(req: NextRequest, { params }: IParamsWithId) {
  const { retrospectiveId, commentId } = await Promise.resolve(params);
  if (!retrospectiveId && !commentId) {
    return NextResponse.json(null, BAD_REQUEST);
  }
  const body = await req.json();
  const validatedBody = PatchCommentSchema.parse(body);

  try {
    await connectDB();
    const comment = await CommentModel.findByIdAndUpdate(
      commentId,
      { $set: validatedBody },
      { new: true, runValidators: true }
    );
    if (!comment) {
      return NextResponse.json(null, NOT_FOUND);
    }
    return NextResponse.json(null, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
export async function DELETE(_: NextRequest, { params }: IParamsWithId) {
  const { retrospectiveId, commentId } = await Promise.resolve(params);
  if (!retrospectiveId && !commentId) {
    return NextResponse.json(null, BAD_REQUEST);
  }

  try {
    await connectDB();
    await CommentModel.findByIdAndDelete(commentId);

    return NextResponse.json(null, SUCCESS);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(null, INTERNAL_SERVER_ERROR);
  }
}
