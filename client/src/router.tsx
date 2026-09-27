import { createBrowserRouter } from "react-router-dom"
import { CustomerLayout } from "./components/layout/CustomerLayout";
import { StoreHome } from "./pages/customer/Home";
import { PublicOnlyLayout } from "./components/auth/PublicOnlyLayout";
import { SignInPage } from "./pages/auth/Sign-up";
import { SignUpPage } from "./pages/auth/Sign-in";
import { ProtectedLayout } from "./components/auth/ProtectedLayout";
import { CustomerProfile } from "./pages/customer/Profile";
//strick

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CustomerLayout />,
        children: [
            {
                index: true,
                element: <StoreHome />
            },
            {
                element: <PublicOnlyLayout />,
                children: [
                    {
                        path: "sign-in/*",
                        element: <SignInPage />
                    },
                    {
                        path: "sign-in/*",
                        element: <SignUpPage />
                    }
                ]
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "/profie",
                        element: <CustomerProfile />
                    }
                ]
            }
        ]
    }
])