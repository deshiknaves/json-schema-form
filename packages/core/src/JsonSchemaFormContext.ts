import { createContext } from 'use-context-selector'
import { FieldValues, Path, PathValue } from './types'

export type JsonSchemaForm<Values extends FieldValues> = {
  getFieldValue: <P extends Path<Values>>(
    name: P,
  ) => PathValue<Values, P> | undefined
  setFieldValue: <P extends Path<Values>>(
    name: P,
    value: PathValue<Values, P> | undefined,
  ) => void
}

export const JsonSchemaFormContext =
  createContext<JsonSchemaForm<FieldValues> | null>(null)
