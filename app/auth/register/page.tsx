import React from 'react';
import FormWrap from "../../components/common/FormWrap";
import RegisterForm from '@/app/components/auth/register/RegisterForm';

interface Props {
  searchParams: { stage: string }
}

const Register: React.FC<Props> = async ({ searchParams }) => {
  // const currentUser = await getCurrentUser();

  return (
    <div className="relative max-w-[1920px] mx-auto px-4 
     xl:px-20 md:px-2 bg-register-svg bg-cover bg-center z-0 h-[100vh] flex justify-center items-center">
      <RegisterForm stage={searchParams.stage} />
    </div>
  );
};

export default Register;

