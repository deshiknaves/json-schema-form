import { useEffect, useState } from 'react'
import { FieldValues } from './types'
import { useFormContextValue } from './useFormContextValue'

export function useValuesObserver<Values extends FieldValues = FieldValues>() {
  const [values, setValues] = useState<Partial<Values>>({})
  const registerValuesListener = useFormContextValue<
    Values,
    'registerValuesListener'
  >('registerValuesListener')

  useEffect(() => {
    return registerValuesListener((values) => {
      setValues({ ...values })
    })
  }, [registerValuesListener])

  return values
}
