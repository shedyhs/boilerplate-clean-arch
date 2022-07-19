import { IPaginatedRequest } from '@/shared/interfaces/paginated-request.interface';

export interface IShowAllUsersDTO extends IPaginatedRequest {
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
  ddi?: string;
  ddd?: string;
}
