import { getLocale } from '@i18n';
import type { FormatOptions, format } from 'date-fns';
import { format as formatFunc, parseISO } from 'date-fns';

type Options = Parameters<typeof format>[2];

export const formatDate = (
  date: string,
  dateFormat?: string,
  options?: Options,
) => {
  const locale = getLocale();
  const dateOptions: FormatOptions = {
    ...options,
    locale,
  };
  return formatFunc(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions);
};
