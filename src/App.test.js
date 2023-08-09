import { Provider } from 'react-redux'

import { render, screen } from '@testing-library/react'
import App from './App'
import store from './redux/store'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const firstNameElement = screen.getByText(/First Name/i)
  const lastNameElement = screen.getByText(/Last Name/i)
  const emailElement = screen.getByText(/Email/i)
  const messageElement = screen.getByText(/Message/i)
  const buttonElement = screen.getByText(/Submit/i)
  expect(firstNameElement).toBeInTheDocument()
  expect(lastNameElement).toBeInTheDocument()
  expect(emailElement).toBeInTheDocument()
  expect(messageElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})
