import React from "react";
import EmployeeHeader from "@/components/ui/employee/header/EmployeeHeader";
import LoginForm from "@/components/ui/employee/login/LoginForm";

const LoginPage = () => {
    return (
        <html>
            <head>
                <title>Login Page</title>
            </head>
            <body>
                <EmployeeHeader />
                <LoginForm />
            </body>
        </html>
    );
};

export default LoginPage;
