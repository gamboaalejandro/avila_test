import { Result } from '../../infrastructure/results/result';

export interface RepositoryInterface<F,D>{
  execute (data?: F): Promise<Result<D[] | D>>;
}