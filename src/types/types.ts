import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface ISortableContainer {
  id: string;
  title: string;
}

export interface ISortableItem {
  id: string;
  containerId: string;
  content: {
    text: string;
  };
}

export type TMethod = 'sailboat';

export interface IRetrospective {
  readonly _id: string;
  title: string;
  author: string;
  members: Array<string>;
  supervisors: Array<string>;
  creationDate: Date;
  completed: boolean;
  creationStage: number;
  lastUpdate: Date;
  description: string;
  method: TMethod;
  data: {
    containers: Array<ISortableContainer>;
    items: Array<ISortableItem>;
  };
  comments: Array<string>;
}

export interface IComment {
  readonly _id: string;
  author: string;
  creationDate: Date;
  lastUpdate: Date;
  text: string;
  retrospectiveId: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
