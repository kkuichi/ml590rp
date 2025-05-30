export interface IUpdateRetrospective {
  retrospectiveId: string;
  commentId: string;
  text: string;
}

export interface ICreateComment {
  retrospectiveId: string;
  text: string;
}
