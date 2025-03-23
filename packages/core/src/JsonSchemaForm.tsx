import { JsonSchemaFormProvider } from './JsonSchemaFormProvider'
import { FieldValues, OnFieldChange, Path, PathValue } from './types'
import { useCallback, useRef, useState } from 'react'

type JsonSchemaFormProps<Values extends FieldValues = FieldValues> = {
  onFieldChange: OnFieldChange<Values>
}

export function JsonSchemaForm<Values extends FieldValues = FieldValues>({
  onFieldChange,
}: JsonSchemaFormProps<Values>) {
  const valuesRef = useRef<Partial<Values>>({})
  const [debugValues, setDebugValues] = useState<Partial<Values>>(
    valuesRef.current,
  )
  const onFieldChangeRef = useRef(onFieldChange)
  onFieldChangeRef.current = onFieldChange

  const getFieldValue = useCallback(<P extends Path<Values>>(name: P) => {
    return valuesRef.current[name] as PathValue<Values, P>
  }, [])

  const getValues = useCallback(() => {
    return valuesRef.current
  }, [])

  const setFieldValue = useCallback(
    <P extends Path<Values>>(
      name: P,
      value: PathValue<Values, P> | undefined,
    ) => {
      valuesRef.current[name] = value as Values[P] | undefined

      onFieldChangeRef.current({ name, value })

      setDebugValues({ ...valuesRef.current })
    },
    [],
  )

  return (
    <>
      <JsonSchemaFormProvider<Values>
        getFieldValue={getFieldValue}
        getValues={getValues}
        setFieldValue={setFieldValue}
      >
        JsonSchemaForm
      </JsonSchemaFormProvider>
      {debugValues ? <pre>{JSON.stringify(debugValues, null, 2)}</pre> : null}
    </>
  )
}
