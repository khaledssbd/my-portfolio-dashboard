// import RegisterForm from '@/components/modules/Auth/Register/RegisterForm';

import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-x-4 ">
        <Link href="/">
          <span className="text-primary font-bold">Home</span>
        </Link>
        <div>
          <h1 className="text-xl font-semibold">You are already registered</h1>
        </div>
      </div>

      {/* <RegisterForm /> */}
    </div>
  );
};

export default RegisterPage;
