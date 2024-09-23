import React from 'react';
import FormWrap from "../../components/FormWrap";
import LoginForm from "./LoginForm";
import Heading from '@/app/components/Heading';
import Footer from '@/app/components/footer/Footer';
import Button from '@/app/components/Button';
import { IoIosArrowRoundBack } from "react-icons/io";
import NavBar from '@/app/components/nav/NavBar';
import NavBarAuth from '@/app/components/nav/NavBarAuth';
import Container from '@/app/components/Container';

const Login = async () => {
  // const currentUser = await getCurrentUser();

  return (
    <div className='bg-custom-svg'>
      <Container>
        <FormWrap style='justify-center md:justify-center lg:justify-end '>
          <LoginForm currentUser={null} />
        </FormWrap>
      </Container>
    </div>


  );
};

export default Login;

