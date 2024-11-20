import React from 'react';
import FormWrap from "../../components/FormWrap";
import RegisterForm from '@/app/components/auth/register/RegisterForm';

const Register = async () => {
  // const currentUser = await getCurrentUser();

  return (
    <div className="relative max-w-[1920px] mx-auto px-4 
     xl:px-20 md:px-2 bg-register-svg bg-cover bg-center z-0 h-[100vh] flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default Register;

