import { IRetrospective } from '@/types/types';

export interface IRetrospectiveListProps {
  retrospectives?: Array<IRetrospective>;
  isLoading: boolean;
  supervised: boolean;
}

export interface IRetrospectiveItemProps {
  data: IRetrospective;
  supervised: boolean;
}
