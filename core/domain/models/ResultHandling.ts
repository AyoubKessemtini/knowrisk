import { isAxiosError } from 'axios';

export interface DomainErrorDTO {
  message?: string;
  details?: any;
  errorEnumType?: any;
}

export type Either<E, D> = Failure<E> | Success<D>;
export type ErrorOr<T> = Either<DomainErrorDTO, T>;

export interface Failure<E> {
  type: 'failure';
  error: E;
}

export interface Success<D> {
  type: 'success';
  value: D;
}

export function fail(
  type: string,
  error: unknown,
  extra?: DomainErrorDTO,
): Failure<DomainErrorDTO> {
  let errorInfo;

  if (isAxiosError(error)) {
    errorInfo = error.response?.data;
  } else {
    errorInfo = String(error);
  }
  if (__DEV__) {
    console.tron.display({
      name: `[${type}]`,
      value: errorInfo,
      important: true,
    });
  }

  return {
    type: 'failure',
    error: {
      message: extra?.message || errorInfo.message,
      errorEnumType: extra?.errorEnumType,
      details: error,
    },
  };
}

export function ok<D>(value: D): Success<D> {
  return { type: 'success', value };
}

export const Result = {
  fail,
  ok,
};
