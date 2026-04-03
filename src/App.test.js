import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

test('renders redux learning title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const heading = getByText(/React Redux Learning Studio/i);
  expect(heading).toBeInTheDocument();
});
