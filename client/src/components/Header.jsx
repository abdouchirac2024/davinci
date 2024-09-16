import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import logo from '../assets/logo-removebg-preview.png'; // Import your logo

export default function Header() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2  top-0 left-0 w-full z-50 bg-white dark:bg-gray-900'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <img src={logo} alt="Logo" className='h-20 sm:h-26' /> {/* Replacing DAVINCI Blog with the logo */}
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Recherche...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 sm:w-auto sm:h-auto'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profil</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Se déconnecter</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sigin-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Connexion
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Accueil</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>À propos</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projets</Link>
        </Navbar.Link>
        <Navbar.Link as={'div'}>
          <a href='https://chat-rho-swart.vercel.app/chats' target='_blank' rel='noopener noreferrer'>Forum</a>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
