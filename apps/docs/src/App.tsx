import { JsonSchemaForm, useFormContextValue } from '@json-schema-form/core'

type Person = {
  name: string
  age: number
  address: {
    street: string
    state: string
    zip: number
    billing: boolean
  }
}

function Fields() {
  const register = useFormContextValue('register')

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="name">
        Name
        <input
          className="border border-border"
          name="name"
          {...register('name')}
        />
      </label>

      <label htmlFor="age">
        Age
        <input
          type="number"
          className="border border-border"
          name="age"
          {...register('age')}
        />
      </label>
    </div>
  )
}

function App() {
  return (
    <>
      <JsonSchemaForm<Person>
        onFieldChange={({ name, value }) => {
          if (name === 'age') {
            console.log(name, value)
          }
        }}
      >
        <Fields />
      </JsonSchemaForm>
    </>
  )
}

export default App
