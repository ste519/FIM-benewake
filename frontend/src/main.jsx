import React, {useContext} from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root";
import Charts from './routes/charts';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import "the-new-css-reset/css/reset.css";
import Test from './routes/test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path:"/charts",
    element: <Charts />,
  },
  {
    path:"/test",
    element: <Test />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
