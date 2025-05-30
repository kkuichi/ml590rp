import mongoose, { Schema, Types } from 'mongoose';


const commentSchema = new Schema({
  author: {
    type: String,
    required: true,
    immutable: true,
  },
  retrospectiveId: {
    type: Types.ObjectId,
    ref: 'Retrospective',
    required: true,
    immutable: true,
  },
  text: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    immutable: true,
  },
  lastUpdate: {
    type: Date,
  },
});

commentSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.lastUpdate = currentDate;
  this.creationDate = currentDate;
  next();
});

commentSchema.pre('findOneAndUpdate', async function (next) {
  this.set({ lastUpdate: new Date() });
  next();
});

export const CommentModel =
  mongoose.models.CommentModel || mongoose.model('CommentModel', commentSchema);