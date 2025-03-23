import { useContextSelector } from 'use-context-selector'
import { JsonSchemaForm, JsonSchemaFormContext } from './JsonSchemaFormContext'
import { FieldValues } from './types'

export function useFormContextValue<
  Values extends FieldValues,
  Key extends keyof JsonSchemaForm<Values>,
>(name: Key): JsonSchemaForm<Values>[Key] {
  const value = useContextSelector(JsonSchemaFormContext, (context) => {
    if (!context) {
      throw new Error(
        'useFormContextValue must be used within a JsonSchemaFormProvider',
      )
    }

    return context[name]
  })

  return value as JsonSchemaForm<Values>[Key]
}
