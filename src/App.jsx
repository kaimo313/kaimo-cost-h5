import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ConfigProvider } from 'zarm';

import routes from '../src/router'

function App() {
  return <BrowserRouter>
    <ConfigProvider>
      <Routes>
        {
          routes.map(route => <Route key={route.path} path={route.path} element={<route.component />}></Route>)
        }
      </Routes>
    </ConfigProvider>
  </BrowserRouter>
}

export default App