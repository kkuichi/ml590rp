export interface IRetrospectiveDetailsContentProps {
  retrospectiveId: string;
}

export interface IRetrospectiveWidgetFormValues {
  title: string;
  description?: string;
  members: Array<{ label: string; value: string } | null>;
  supervisors: Array<{ label: string; value: string } | null>;
  author: string;
}
