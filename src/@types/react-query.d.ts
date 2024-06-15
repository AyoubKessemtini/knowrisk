import { DomainErrorDTO } from '@core/domain/models/ResultHandling';
import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: DomainErrorDTO;
  }
}
