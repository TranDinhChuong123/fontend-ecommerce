import React from 'react';
import FormWrap from "../../components/FormWrap";
import LoginForm from "./RegisterForm";
import RegisterForm from './RegisterForm';
import OtpForm from './OtpForm';

const Register = async () => {
  // const currentUser = await getCurrentUser();

  return (
    <div className="relative max-w-[1920px] mx-auto px-4 
     xl:px-20 md:px-2 bg-register-svg bg-cover bg-center z-0 h-[100vh]">
      <FormWrap style='justify-center'>
        <RegisterForm />
      </FormWrap>
    </div>
  );
};

export default Register;

