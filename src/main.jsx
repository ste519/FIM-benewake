
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import "the-new-css-reset/css/reset.css";
import App from './App';
import children from './path/children';
import Login from './routes/login';
import AuthProvider from './providers/AuthProvider'
import AlertProvider from './providers/AlertProvider';
import adminChildren from './path/adminChildren';
import analysisChildren from './path/analysisChildren';

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: children
  },
  {
    path: "/admin",
    element: <App />,
    children: adminChildren
  },
  {
    path: "/analysis",
    element: <App />,
    children: analysisChildren
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>
)
