import mongoose, { Schema } from 'mongoose';
import {
  IRetrospective,
  ISortableContainer,
  ISortableItem,
} from '@/types/types';

const ContainerSchema = new Schema<ISortableContainer>({
  id: { type: String, required: true },
  title: { type: String, required: true },
});

const ItemSchema = new Schema<ISortableItem>({
  id: { type: String, required: true },
  containerId: { type: String, required: true },
  content: {
    text: { type: String, required: true },
  },
});
export type TServerRetrospective = IRetrospective & Document;

const retrospectiveSchema = new Schema<TServerRetrospective>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    immutable: true,
  },
  members: {
    type: [String],
    validate: {
      validator: (members: Array<string>) =>
        members.length === new Set(members).size,
      message: 'Members must be unique.',
    },
    required: true,
    default: [],
  },
  supervisors: {
    type: [String],
    validate: {
      validator: (supervisors: Array<string>) =>
        supervisors.length === new Set(supervisors).size,
      message: 'Supervisors must be unique.',
    },
    required: true,
    default: [],
  },
  description: {
    type: String,
    default: '',
  },
  creationDate: {
    type: Date,
    immutable: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  creationStage: {
    type: Number,
  },
  lastUpdate: {
    type: Date,
  },
  method: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
    default: [],
  },
  data: {
    containers: { type: [ContainerSchema], default: [], required: true },
    items: { type: [ItemSchema], default: [], required: true },
  },
});

retrospectiveSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.lastUpdate = currentDate;
  this.creationDate = currentDate;
  this.creationStage = this.completed ? 5 : 1;
  next();
});

retrospectiveSchema.pre('findOneAndUpdate', async function (next) {
  this.set({ lastUpdate: new Date() });
  this.set({ members: Array.from(new Set(this.get('members'))) });
  this.set({ supervisors: Array.from(new Set(this.get('supervisors'))) });
  next();
});

export const Retrospective =
  mongoose.models.Retrospective ||
  mongoose.model<TServerRetrospective>('Retrospective', retrospectiveSchema);

export default Retrospective;
