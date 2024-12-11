import getCurrentUser from '@/actions/getCurrentUser';
import Container from '@/app/components/common/Container';
import FormWrap from "../../components/common/FormWrap";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className='bg-register-svg bg-cover bg-center w-screen h-screen'>
      {/* <div className='w-full h-[100px] bg-white flex justify- items-center'>

        <button>
          <a href='/'>EconoMart</a>
        </button>

      </div> */}
      <Container>
        <FormWrap style='justify-center md:justify-center lg:justify-center '>
          <LoginForm currentUser={currentUser} />
        </FormWrap>
      </Container>
    </div>


  );
};

export default LoginPage;

