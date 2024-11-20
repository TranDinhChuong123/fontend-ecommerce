import React from 'react';
import FormWrap from "../../components/FormWrap";
import LoginForm from "./LoginForm";
import Heading from '@/app/components/Heading';
import Footer from '@/app/components/footer/Footer';
import Button from '@/app/components/Button';
import { IoIosArrowRoundBack } from "react-icons/io";
import NavBar from '@/app/components/nav/NavBar';
import Container from '@/app/components/Container';
import getCurrentUser from '@/actions/getCurrentUser';

const Login = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className='bg-register-svg bg-cover bg-center w-screen h-screen'>
      <Container>
        <FormWrap style='justify-center md:justify-center lg:justify-end '>
          <LoginForm currentUser={currentUser} />
        </FormWrap>
      </Container>
    </div>


  );
};

export default Login;

