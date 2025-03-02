// Utility to decrement the depth counter
type Decrement<T extends number> = T extends 5
  ? 4
  : T extends 4
    ? 3
    : T extends 3
      ? 2
      : T extends 2
        ? 1
        : T extends 1
          ? never
          : never

export type Path<T, Depth extends number = 5> = [Depth] extends [never]
  ? never
  : {
      [K in keyof T & string]: T[K] extends Record<string, unknown>
        ? `${K}` | `${K}.${Path<T[K], Decrement<Depth>>}`
        : `${K}`
    }[keyof T & string]

export type PathValue<
  T,
  P extends string,
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

export type FieldValues = Record<string, unknown>

type ChangeEvent<T> = {
  [P in Path<T>]: {
    name: P
    value: PathValue<T, P> | undefined
  }
}[Path<T>]

export type OnFieldChange<T> = (name: ChangeEvent<T>) => void
