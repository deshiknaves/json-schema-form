import omit from 'lodash/omit'
import set from 'lodash/set'
import unset from 'lodash/unset'
import { FieldValues, Path, PathValue } from './types'

type EventWithTargetValue<T> = {
  target: { value: T; valueAsNumber?: number }
}

export type FieldRegistry<Value extends FieldValues> = {
  path: Path<Value>
  onBlur: () => void
  onChange: (event: EventWithTargetValue<PathValue<Value, Path<Value>>>) => void
  onFocus: () => void
  unregister: () => void
}

export class Form<Value extends FieldValues = FieldValues> {
  values: Partial<Value> = {}
  fieldRegistry: Map<Path<Value>, FieldRegistry<Value>> = new Map()

  constructor() {
    console.log('Form initialized')
  }

  getValues() {
    return this.values
  }

  validate(path: Path<Value>) {
    console.log('validate', path)
  }

  unregister(path: Path<Value>) {
    unset(this.values, path)
  }

  register(path: Path<Value>) {
    if (this.fieldRegistry.has(path)) {
      return omit(this.fieldRegistry.get(path), ['unregister'])
    }
    const registry: FieldRegistry<Value> = {
      path,
      onFocus: () => {
        console.log('Field focused:', path)
        // TODO: Add touched logic here
      },
      onBlur: () => {
        this.validate(path)
      },
      onChange: (
        event: EventWithTargetValue<PathValue<Value, Path<Value>>>,
      ) => {
        const value =
          !event.target.valueAsNumber || isNaN(event.target.valueAsNumber)
            ? event.target.value
            : event.target.valueAsNumber

        if (value === '') {
          unset(this.values, path)
        } else {
          set(this.values, path, value)
        }
        console.log('Value updated:', this.values)
      },
      unregister: () => {
        this.unregister(path)
        this.fieldRegistry.delete(path)
      },
    }

    this.fieldRegistry.set(path, registry)

    return omit(registry, ['unregister'])
  }
}
