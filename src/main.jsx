import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import "the-new-css-reset/css/reset.css";
import children from './path/children';
import Login from './routes/login';
import AuthProvider from './providers/AuthProvider'
import AlertProvider from './providers/AlertProvider';
import adminChildren from './path/adminChildren';
import analysisChildren from './path/analysisChildren';
import Loader from './components/Loader';

const App = lazy(() => import('./App'));

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
    children: children
  },
  {
    path: "/admin",
    element:
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>,
    children: adminChildren
  },
  {
    path: "/analysis",
    element:  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
    children: analysisChildren
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>
)
