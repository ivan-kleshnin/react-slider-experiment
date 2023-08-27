declare type Predicate<T> = (value: T) => boolean

declare type AsyncPredicate<T> = (value: T) => Promise<boolean>

declare type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

declare type Dict<T> = Record<string, T>

declare type OpaqueDict = Record<string, unknown>

declare type EmptyDict = Record<string, never>

declare type KeyOf<T> = Extract<keyof T, string>

declare type KeysOf<T> = KeyOf<T>[]

declare type ValueOf<T> = T[keyof T]

// declare type Exact<A, B> = A extends B
//   ? B extends A
//     ? A
//     : never
//   : never

declare type OmitNulls<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

declare type Truthy<T> = T extends false | "" | 0 | null | undefined
  ? never
  : T

declare type Extend<T1, T2> = Omit<T1, keyof T2> & T2
// type AB = Override<A, {b: number}>

// declare module "graphql" {
//   declare class GraphQLError {
//     type?: string
//   }
// }

declare namespace Belt {
  type UseMutableArrays = 1
}
