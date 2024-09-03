import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextInput, FileInput, Textarea, Alert } from 'flowbite-react';

export default function ApplyForm({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
        setErrorMessage(data.message);
        return;
      }
      setSuccessMessage('Application submitted successfully');
      setFormData({});
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Apply for this position</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Full Name'
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
          placeholder='Phone Number'
          required
          id='phoneNumber'
          onChange={handleChange}
        />
        <FileInput
          type='file'
          accept='.pdf,.doc,.docx'
          required
          id='resume'
          helperText="Upload your resume (PDF, DOC, DOCX)"
          onChange={handleChange}
        />
        <Textarea
          placeholder='Cover Letter'
          required
          id='coverLetter'
          rows={4}
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Submit Application
        </Button>
      </form>
      {errorMessage && (
        <Alert className='mt-5' color='failure'>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert className='mt-5' color='success'>
          {successMessage}
        </Alert>
      )}
    </div>
  );
}