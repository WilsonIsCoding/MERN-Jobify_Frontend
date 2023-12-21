import logo from '@/public/images/logo.png'
import Image from 'next/image';
const Logo = () => {
  return <Image src={logo} alt='jobify' className='logo' />;
};

export default Logo;
