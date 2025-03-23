import { JsonSchemaFormProvider } from './JsonSchemaFormProvider'
import { FieldValues, OnFieldChange } from './types'
import { ReactNode, useRef } from 'react'
import { useValuesObserver } from './useValuesObserver'

type JsonSchemaFormProps<Values extends FieldValues = FieldValues> = {
  children?: ReactNode
  onFieldChange: OnFieldChange<Values>
}

function JsonSchemaChildren<Values extends FieldValues = FieldValues>({
  children,
}: {
  children?: ReactNode
}) {
  const values = useValuesObserver<Values>()

  return (
    <>
      {children}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </>
  )
}

export function JsonSchemaForm<Values extends FieldValues = FieldValues>({
  children,
  onFieldChange,
}: JsonSchemaFormProps<Values>) {
  const onFieldChangeRef = useRef(onFieldChange)
  onFieldChangeRef.current = onFieldChange

  return (
    <>
      <JsonSchemaFormProvider<Values>>
        <JsonSchemaChildren<Values>>{children}</JsonSchemaChildren>
      </JsonSchemaFormProvider>
    </>
  )
}
