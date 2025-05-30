import { ISortableContainer, ISortableItem, TMethod } from '@/types/types';


export interface ICreateRetrospective  {
  title: string;
  completed: boolean;
  method: TMethod;
  data: {
    containers: Array<ISortableContainer>;
    items: Array<ISortableItem>;
  };
};


interface IRetrospectiveMutableProperties {
  title: string;
  members: Array<string>;
  supervisors: Array<string>;
  completed: boolean;
  creationStage: number;
  description: string;
  data: {
    containers: Array<ISortableContainer>;
    items: Array<ISortableItem>;
  };
}

export interface IUpdateRetrospective extends Partial<IRetrospectiveMutableProperties> {
  _id: string
}