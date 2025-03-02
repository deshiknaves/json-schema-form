import { JsonSchemaForm } from '@json-schema-form/core'

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

function App() {
  return (
    <>
      <JsonSchemaForm<Person>
        onFieldChange={({ name, value }) => {
          if (name === 'age') {
            console.log(name, value)
          }
        }}
      />
    </>
  )
}

export default App
