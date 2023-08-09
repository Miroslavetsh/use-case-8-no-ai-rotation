import React, { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

const Field = ({ name }) => {
  const slice = useMemo(
    () =>
      name
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('_'),
    [name],
  )
  const dispatch = useDispatch()
  const value = useSelector((state) => state[slice])

  return (
    <label className='form__field'>
      <span>{name}</span>
      <input
        type='text'
        value={value}
        onChange={(e) => dispatch({ type: `user/${slice}`, payload: { [slice]: e.target.value } })}
      />
    </label>
  )
}

const Form = () => (
  <form className='form'>
    <div className='form__wrapper'>
      <Field name='First Name' />
      <Field name='Last Name' />
      <Field name='Email' />
      <Field name='Message' />
      <button disabled type='submit'>
        Submit
      </button>
    </div>
  </form>
)

export default Form
