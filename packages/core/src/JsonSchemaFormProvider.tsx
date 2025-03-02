import { ReactNode } from 'react'
import { JsonSchemaForm, JsonSchemaFormContext } from './JsonSchemaFormContext'
import { FieldValues } from './types'

type JsonSchemaFormProviderProps<Values extends FieldValues> =
  JsonSchemaForm<Values> & {
    children: ReactNode
  }

export function JsonSchemaFormProvider<
  Values extends FieldValues = FieldValues,
>({ children, setFieldValue }: JsonSchemaFormProviderProps<Values>) {
  return (
    <JsonSchemaFormContext.Provider
      value={{ setFieldValue } as unknown as JsonSchemaForm}
    >
      {children}
    </JsonSchemaFormContext.Provider>
  )
}
