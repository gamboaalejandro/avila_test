import { DomainException } from '../exceptions/domain-exceptions';

/** Result: Es una clase genérica utilizada para encapsular los resultados obtenidos de los CU.
 *  @typeParam `T` Tipo parametrizado del resultado encapsulado.*/
export class Result<T> {
  public readonly value?: T;
  public readonly statusCode?: number;
  public readonly message?: string;
  public readonly error?: string;

  private constructor(value: T, error: DomainException<T>) {
    if (error) {
      this.statusCode = Number(error.httpStatus) || 500;
      this.message = error?.message ? error?.message : 'Unknown.';
      this.error = error.errorCode ? error.errorCode : 'Internal Domain Error';
    } else {
      this.value = value;
    }
  }

  /** Retorna el valor del resultado encapsulado. */
  get Value(): T {
    return this.value;
  }

  /** Retorna el error encapsulado. */
  get Error(): Error {
    return new Error(this.message);
  }

  /** Retorna `true` si el resultado fue exitoso, en caso contrario `false`. */
  get IsSuccess(): boolean {
    return !this.error;
  }

  /**Crea un objeto result exitoso con su valor.
   * @param error Excepción encapsulada
   * @returns Result */
  static success<T>(value: T): Result<T> {
    return new Result(value, null);
  }

  /**Crea un objeto result de falla.
   * @param error Excepción encapsulada
   * @returns Result */
  static fail<T>(error: Error): Result<T> {
    return new Result<T>(null, error as DomainException<T>);
  }
}
