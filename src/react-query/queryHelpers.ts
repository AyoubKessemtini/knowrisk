import { ErrorOr } from '@core/domain/models/ResultHandling';

export const defaultQueryResult = <T>(result: ErrorOr<T>): T => {
  if (result.type === 'failure') {
    throw result.error;
  }
  return result.value;
};
