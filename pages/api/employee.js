// pages/employee.js
import { useSession } from "next-auth/react";
import EmployeeLoginButton from '@/components/ui/employee/auth/EmployeeLoginButton';

const EmployeePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <p>Welcome {session.user.name}!</p>;
  }

  return (
    <div>
      <h1>Employee Login</h1>
      <EmployeeLoginButton />
    </div>
  );
};

export default EmployeePage;
