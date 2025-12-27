import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Login from './website part/heading part/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Clicknbook from './website part/feature box/clicknbook.jsx';
import Forgot from './website part/feature box/forgot.jsx';
import Newuser from './website part/feature box/newuser.jsx';
const routes = [
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"clicknbook",
    element:<Clicknbook/>
  },
  {
    path:"forgotpassword",
    element:<Forgot/>,
  },
  {
    path:"newuser",
    element:<Newuser/>,
  },
];

const router = createBrowserRouter
(routes,
  {
  basename:"/"
  },
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

