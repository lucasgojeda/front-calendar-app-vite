import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import { store } from './store/store';

import { CalendarApp } from './CalendarApp'

/**
 * En este componente se encuentra insertado el store y es el punto más alto de la 
 * aplicación.
 * @module main
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CalendarApp />
    </Provider>
  </React.StrictMode> 
)
