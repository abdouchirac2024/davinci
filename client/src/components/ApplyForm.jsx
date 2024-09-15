// davinci/client/src/components/ApplyForm.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextInput, FileInput, Textarea } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyForm({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/application/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, postId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Une erreur est survenue.');
        setLoading(false);
        return;
      }
      toast.success('Votre candidature a été envoyée avec succès. Vous recevrez un email de confirmation sous peu.');
      setFormData({});
      setLoading(false);
    } catch (error) {
      toast.error('Quelque chose a mal tourné');
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Postuler à cette offre</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Nom complet'
          required
          id='fullName'
          onChange={handleChange}
        />
        <TextInput
          type='email'
          placeholder='Email'
          required
          id='email'
          onChange={handleChange}
        />
        <TextInput
          type='tel'
          placeholder='Numéro de téléphone'
          required
          id='phoneNumber'
          onChange={handleChange}
        />
        <FileInput
          type='file'
          accept='.pdf,.doc,.docx'
          required
          id='resume'
          helperText="Téléchargez votre CV (PDF, DOC, DOCX)"
          onChange={handleChange}
        />
        <Textarea
          placeholder='Lettre de motivation'
          required
          id='coverLetter'
          rows={4}
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Soumettre la candidature'}
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
}
