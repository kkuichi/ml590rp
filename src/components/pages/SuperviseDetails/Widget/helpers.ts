import * as yup from 'yup';
import { IOption, IRetrospective } from '@/types/types';

export const valuesToOptions = (values: Array<string>): Array<IOption> =>
  values.map((value) => ({
    label: value,
    value,
  }));

export const optionsToValues = (options: Array<IOption>): Array<string> =>
  options.map(({ value }) => value);

export const getDefaultValues = (retrospective: IRetrospective) => ({
  title: retrospective.title,
  description: retrospective.description,
  members: valuesToOptions(retrospective.members),
  supervisors: valuesToOptions(retrospective.supervisors),
  author: retrospective.author,
});

export const retrospectiveWidgetSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  author: yup.string().required(),
  members: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .required(),
  supervisors: yup
    .array()
    .required()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
});
