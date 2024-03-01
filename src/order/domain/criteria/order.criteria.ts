import { MainCriteriaInterface } from '../../../users/domain/criterias/main_criteria.interface';

export class OrderCriteria implements MainCriteriaInterface {
  _id: string;
  users: string;
}