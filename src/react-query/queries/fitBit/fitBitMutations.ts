import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { fitBitFactory } from '../queryFactory';
import { useQuery } from '@tanstack/react-query';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';

export const useGetMerchantByIdQuery = (command: GetHrvByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getMerchantById(command),
    initialData: {} as HRVData,
  });
};
