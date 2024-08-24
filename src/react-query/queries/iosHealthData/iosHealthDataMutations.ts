import { useMutation } from '@tanstack/react-query';
import { IOSHealthDataQueryFunctions } from './_iosHealthDataQueryFunctions';

export const useSendIOSHealthDataMutation = () => {
  return useMutation({
    mutationFn: IOSHealthDataQueryFunctions.sendIOSHealthData,
  });
};
