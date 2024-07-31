import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Error from './pages/Error';
import Main, { MainLoader } from './layouts/Main';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


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
