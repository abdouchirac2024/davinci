// SignUp.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Label, Spinner, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import OAuth from '../components/OAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inscription() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Veuillez remplir tous les champs.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 409) {
        setErrorMessage('Cet email est déjà utilisé.');
      } else if (!res.ok) {
        setErrorMessage(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      } else {
        setLoading(false);
        toast.success('Utilisateur créé avec succès !'); // Afficher une notification de succès
        setTimeout(() => {
          navigate('/sigin-in');
        }, 2000); // Redirection après 2 secondes
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <ToastContainer /> {/* Container pour afficher les notifications */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left content */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              DAVINCI
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Ceci est un projet de démonstration. Vous pouvez vous inscrire avec votre email et mot de passe
            ou avec Google.
          </p>
        </div>
        {/* Right content */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Votre nom d'utilisateur" />
              <TextInput
                type="text"
                placeholder="Nom d'utilisateur"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Votre email" />
              <TextInput
                type="email"
                placeholder="exemple@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Votre mot de passe" />
              <TextInput
                type="password"
                placeholder="Mot de passe"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Chargement...</span>
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Vous avez déjà un compte ?</span>
            <Link to="/sigin-in" className="text-blue-500">
              Se connecter
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
