import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import EditUserPage from './pages/EditUserPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'


const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
             <Route index element={<HomePage/>}/>
             <Route path='/login' element={<LoginPage/>}/>
             <Route path='/register' element={<RegisterPage/>}/>
             <Route path='/edit' element={<EditUserPage/>}/>
      </Route>
    )
  )
  return (
    <Provider store={store}>
     <RouterProvider  router={router}/>
    </Provider>
  )
}

export default App
