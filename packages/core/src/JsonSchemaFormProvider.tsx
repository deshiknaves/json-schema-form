import { ReactNode, useMemo } from 'react'
import { JsonSchemaForm, JsonSchemaFormContext } from './JsonSchemaFormContext'
import { FieldValues, Path } from './types'
import { Form } from './form'

type JsonSchemaFormProviderProps<Values extends FieldValues> = {
  children: ReactNode
}

export function JsonSchemaFormProvider<
  Values extends FieldValues = FieldValues,
>({ children }: JsonSchemaFormProviderProps<Values>) {
  const form = useMemo(() => new Form<Values>(), [])

  return (
    <JsonSchemaFormContext.Provider
      value={
        {
          getValues: form.getValues.bind(form),
          register: form.register.bind(form),
          unregister: form.unregister.bind(form),
        } as unknown as JsonSchemaForm
      }
    >
      {children}
    </JsonSchemaFormContext.Provider>
  )
}
