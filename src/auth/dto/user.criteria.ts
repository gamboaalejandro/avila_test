import { MainCriteriaInterface } from '../../users/domain/criterias/main_criteria.interface';

export class UserCriteria implements MainCriteriaInterface{
  _id: string;
  user: string;

  constructor(user: string, _id: string) {
    this._id = _id;
    this.user = user;
  }
}