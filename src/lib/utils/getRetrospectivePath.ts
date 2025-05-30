import { IRetrospective } from '@/types/types';
import { ERoutes } from '../constants/routes';

export function getRetrospectivePath({
  _id,
  completed,
  method,
}: IRetrospective) {
  return completed
    ? `${ERoutes.retrospectives}/${_id}`
    : `${ERoutes.retrospectives}/${method}/${_id}`;
}

export function getSupervisedRetrospectivePath({ _id }: IRetrospective) {
  return `${ERoutes.supervise}/${_id}`;
}
