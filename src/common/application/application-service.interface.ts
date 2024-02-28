import { Result } from '../infrastructure/results/result';


/** IApplicationService: Es una interfaz genérica utilizada para implementar servicios de aplicación.
 *  @typeParam `D` Tipo parametrizado de los DTOs.
 *  @typeParam `R` Tipo parametrizado del resultado.*/
export interface IApplicationService<D, R> {
  /**Retorna el nombre del servicio de aplicación para futuros logs */
  get name(): string;

  /**Ejecuta el servicio de aplicación.
   * @param dto Datos de entrada del servicio de aplicación.*/
  execute(dto?: D): Promise<Result<R | R[]>>;
}
