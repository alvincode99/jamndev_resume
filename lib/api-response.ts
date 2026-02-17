/**
 * Forma estÃ¡ndar de una respuesta exitosa de API.
 */
export interface ApiSuccess<T> {
  status: "success";
  message: string;
  data: T;
}

/**
 * Forma estÃ¡ndar de una respuesta de error de API.
 */
export interface ApiFailure {
  status: "error";
  message: string;
  errors?: unknown;
}

/**
 * Construye un payload uniforme para respuestas exitosas.
 * @param message Mensaje de resultado.
 * @param data Datos a retornar.
 * @returns Objeto serializable con estado exitoso.
 */
export function successResponse<T>(message: string, data: T): ApiSuccess<T> {
  return {
    status: "success",
    message,
    data,
  };
}

/**
 * Construye un payload uniforme para respuestas con error.
 * @param message Mensaje de error legible para cliente.
 * @param errors Detalles opcionales del fallo.
 * @returns Objeto serializable con estado de error.
 */
export function errorResponse(message: string, errors?: unknown): ApiFailure {
  return {
    status: "error",
    message,
    errors,
  };
}
