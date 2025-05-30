import { PropsWithChildren } from 'react';


export interface ISortableContainer extends PropsWithChildren {
  id: string;
  title: string;
  disabled:boolean
}

export interface ISortableItem {
  id: string;
  containerId: string;
  content: {
    text: string;
  };
  disabled: boolean;
}