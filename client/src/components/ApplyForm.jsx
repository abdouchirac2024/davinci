import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextInput, FileInput, Textarea } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyForm({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        return;
      }
      toast.success('Votre demande a été envoyée avec succès. L\'administrateur vous contactera dans une semaine maximum.');
      setFormData({});
    } catch (error) {
      toast.error('Quelque chose a mal tourné');
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
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Soumettre la demande
        </Button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
