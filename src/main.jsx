import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import { store } from './store/store';

import { CalendarApp } from './CalendarApp'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CalendarApp />
    </Provider>
  </React.StrictMode>
)
