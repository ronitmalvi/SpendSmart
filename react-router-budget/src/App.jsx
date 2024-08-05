import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Error from './pages/Error';
import Main, { MainLoader } from './layouts/Main';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from './pages/ExpensesPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: MainLoader,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement:<Error/>
        
      },
      {
        path:"logout",
        action: logoutAction,
      },
      {
        path:"expenses",
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action:expensesAction
        
      }
    ]
  },
  
]);


function App() {
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
