export type Right<T> = { success: true; value: T }
export type Left<E> = { success: false; error: E }
export type Either<E, T> = Right<T> | Left<E>

export function right<T>(value: T): Right<T> {
  return { success: true, value }
}

export function left<E>(error: E): Left<E> {
  return { success: false, error }
}
