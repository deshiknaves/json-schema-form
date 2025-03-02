import { JsonSchemaFormProvider } from './JsonSchemaFormProvider'
import { FieldValues, OnFieldChange, Path, PathValue } from './types'
import { useCallback, useRef } from 'react'

type JsonSchemaFormProps<Values extends FieldValues = FieldValues> = {
  onFieldChange: OnFieldChange<Values>
}

export function JsonSchemaForm<Values extends FieldValues = FieldValues>({
  onFieldChange,
}: JsonSchemaFormProps<Values>) {
  const valuesRef = useRef<Partial<Values>>({})
  const onFieldChangeRef = useRef(onFieldChange)
  onFieldChangeRef.current = onFieldChange

  const getFieldValue = useCallback(<P extends Path<Values>>(name: P) => {
    return valuesRef.current[name] as PathValue<Values, P>
  }, [])

  const setFieldValue = useCallback(
    <P extends Path<Values>>(
      name: P,
      value: PathValue<Values, P> | undefined,
    ) => {
      if (!valuesRef.current[name]) return
      valuesRef.current[name] = value as Values[P] | undefined

      onFieldChangeRef.current({ name, value })
    },
    [],
  )

  return (
    <JsonSchemaFormProvider<Values>
      getFieldValue={getFieldValue}
      setFieldValue={setFieldValue}
    >
      JsonSchemaForm
    </JsonSchemaFormProvider>
  )
}
