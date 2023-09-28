import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app.tsx";
import "@/globals.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Protected from "@components/protected.tsx";
import Login from "@components/views/login.tsx";
import Home from "@components/views/home.tsx";
import Dashboard from "@components/views/dashboard";
import Register from "@components/views/register.tsx";
import Message from "@components/views/message.tsx";
import Todo from "@components/views/todo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "message",
        element: (
          <Protected>
            <Message />
          </Protected>
        ),
      },
      {
        path: "todo",
        element: (
          <Protected>
            <Todo />
          </Protected>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
