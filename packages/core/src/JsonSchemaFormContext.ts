import { createContext } from 'use-context-selector'
import { FieldRegistry } from './form'
import { FieldValues, Path, PathValue } from './types'

export type JsonSchemaForm<Values extends FieldValues = FieldValues> = {
  getFieldValue: <P extends Path<Values>>(
    name: P,
  ) => PathValue<Values, P> | undefined
  getValues: () => Partial<Values>
  setFieldValue: <P extends Path<Values>>(
    name: P,
    value: PathValue<Values, P> | undefined,
  ) => void
  register: (path: Path<Values>) => Omit<FieldRegistry<Values>, 'unregister'>
  unregister: (path: Path<Values>) => void
}

export const JsonSchemaFormContext = createContext<JsonSchemaForm | null>(null)
