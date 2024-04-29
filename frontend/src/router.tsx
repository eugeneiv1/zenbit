import {createBrowserRouter} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ForgotPage from "./pages/ForgotPage/ForgotPage";
import RestorePage from "./pages/RestorePage/RestorePage";

export const router = createBrowserRouter([{
        path: '/', element: <MainLayout/>, children: [
        {index: true, element: <HomePage/> },
        {path: '/auth/:authAction', element: <AuthPage/>},
        {path: '/forgot', element: <ForgotPage/>},
        {path: '/forgot/:token', element: <RestorePage/>},
    ]
    },
])