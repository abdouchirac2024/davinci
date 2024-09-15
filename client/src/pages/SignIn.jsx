import { Link, useNavigate } from 'react-router-dom';
import { Alert, Label, Spinner, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function Connexion() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fonction pour valider l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Gestion des changements dans les champs du formulaire
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs requis
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Veuillez remplir tous les champs'));
    }

    // Validation de l'email
    if (!isValidEmail(formData.email)) {
      return dispatch(signInFailure("Veuillez entrer une adresse email valide"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        return dispatch(signInFailure(data.message || 'Échec de la connexion'));
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Contenu de gauche */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              DAVINCI
            </span>
            Blog
          </Link>
          
          {/* Texte de recrutement avec animation */}
          <p className='text-sm mt-5 text-green-500 animate-pulse'>
            Nous recrutons des développeurs talentueux pour rejoindre notre équipe et participer à des projets innovants.
          </p>
          <p className='text-sm mt-2 text-green-500 animate-fade-in'>
            Si vous êtes passionné par la technologie et prêt à relever de nouveaux défis, connectez-vous avec votre email ou Google pour découvrir nos opportunités de carrière.
          </p>
          <p className='text-sm mt-2 text-green-500 animate-fade-in'>
            Rejoignez l'aventure DAVINCI IT SOLUTIONS !
          </p>
        </div>

        {/* Contenu de droite */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='email' value='Votre adresse email' />
              <TextInput
                type='email'
                placeholder='exemple@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor='password' value='Votre mot de passe' />
              <TextInput
                type='password'
                placeholder='*******'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Chargement...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Pas encore de compte ?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Inscrivez-vous
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
