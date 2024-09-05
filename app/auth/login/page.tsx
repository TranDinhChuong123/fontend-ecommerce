import React from 'react';
import FormWrap from "../../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {
  // const currentUser = await getCurrentUser();

  return (
    <div className="relative max-w-[1920px] mx-auto px-4
     xl:px-20 md:px-2 bg-custom-svg bg-scroll bg-center z-0">
      <FormWrap style='justify-center md:justify-center lg:justify-end'>
        <LoginForm currentUser={null} />
      </FormWrap>
    </div>
  );
};

export default Login;

