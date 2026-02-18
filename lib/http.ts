import { NextResponse } from "next/server";

import { errorResponse, successResponse } from "@/lib/api-response";

/**
 * Crea una respuesta JSON uniforme para Ã©xito.
 * @param message Mensaje legible para cliente.
 * @param data Datos de negocio.
 * @param status CÃ³digo HTTP opcional.
 * @returns `NextResponse` serializada.
 */
export function ok<T>(message: string, data: T, status = 200): NextResponse {
  return NextResponse.json(successResponse(message, data), { status });
}

/**
 * Crea una respuesta JSON uniforme para error.
 * @param message Mensaje de error.
 * @param status CÃ³digo HTTP.
 * @param errors Detalle opcional para debugging.
 * @returns `NextResponse` serializada.
 */
export function fail(
  message: string,
  status = 400,
  errors?: unknown,
): NextResponse {
  return NextResponse.json(errorResponse(message, errors), { status });
}
