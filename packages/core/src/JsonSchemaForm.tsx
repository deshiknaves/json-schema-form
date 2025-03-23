import { JsonSchemaFormProvider } from './JsonSchemaFormProvider'
import { FieldValues, OnFieldChange } from './types'
import { ReactNode, useRef, useState } from 'react'
import { useFormContextValue } from './useFormContextValue'

type JsonSchemaFormProps<Values extends FieldValues = FieldValues> = {
  children?: ReactNode
  onFieldChange: OnFieldChange<Values>
}

function JsonSchemaChildren<Values extends FieldValues = FieldValues>({
  children,
}: {
  children?: ReactNode
}) {
  const getValues = useFormContextValue<Values, 'getValues'>('getValues')
  const [debugValues, setDebugValues] = useState<Partial<Values>>(getValues)

  return (
    <>
      {children}
      {debugValues ? <pre>{JSON.stringify(getValues(), null, 2)}</pre> : null}
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
