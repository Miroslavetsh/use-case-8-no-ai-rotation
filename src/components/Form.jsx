import React, { useMemo, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'

import { userReducer } from '../redux/store'

const Field = ({ state, name, onChange, valid }) => {
  const slice = useMemo(
    () =>
      name
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('_'),
    [name],
  )
  const value = state[slice]

  return (
    <label className='form__field'>
      <span>{name}</span>
      <input
        className={valid ? 'form__input--valid' : 'form__input--invalid'}
        type='text'
        value={value}
        onChange={(e) => onChange(slice)(e)}
      />
    </label>
  )
}

const Form = () => {
  const store = useSelector((state) => state)
  const dispatchStore = useDispatch()

  const [state, dispatch] = useReducer(userReducer, {
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  })

  const fields = useMemo(
    () => [
      { name: 'First Name', valid: validator.isLength(state.first_name, { min: 1 }) },
      { name: 'Last Name', valid: validator.isLength(state.last_name, { min: 1 }) },
      { name: 'Email', valid: validator.isEmail(state.email) },
      { name: 'Message', valid: validator.isLength(state.message, { min: 10 }) },
    ],
    [state],
  )

  const onChange = (slice) => (e) =>
    dispatch({ type: `user/${slice}`, payload: { [slice]: e.target.value } })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        dispatchStore({ type: 'user/full_state', payload: state })
        alert('State successfully saved')
      }}
      className='form'>
      <div className='form__wrapper'>
        {fields.map((field) => (
          <Field key={field.name} {...field} onChange={onChange} state={state} />
        ))}
        <button disabled={fields.some((field) => !field.valid)} type='submit'>
          Submit
        </button>
      </div>
      <table className='form__table'>
        <thead>
          <tr>
            {fields.map(({ name }) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(store).map((value) => (
              <th key={value}>{value}</th>
            ))}
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Form
