import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';

export default function ApplicationDetails() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const res = await fetch(`/api/application/${id}`);
        const data = await res.json();
        if (res.ok) {
          setApplication(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Une erreur est survenue lors de la récupération des détails de la candidature.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  const handleReview = async (status) => {
    try {
      const res = await fetch(`/api/application/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        navigate('/dashboard?tab=applications');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la révision de la candidature.');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!application) return <div>Aucune candidature trouvée.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Détails de la candidature</h2>
      <div className="mb-4">
        <p><strong>Nom complet:</strong> {application.fullName}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Téléphone:</strong> {application.phoneNumber}</p>
        <p><strong>Poste:</strong> {application.postId.title}</p>
        <p><strong>Date de candidature:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
        <p><strong>Statut:</strong> {application.status}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">CV</h3>
        <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Voir le CV</a>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Lettre de motivation</h3>
        <p>{application.coverLetter}</p>
      </div>
      {application.status === 'pending' && (
        <div className="flex gap-4">
          <Button onClick={() => handleReview('accepted')} color="success">Accepter</Button>
          <Button onClick={() => handleReview('rejected')} color="failure">Rejeter</Button>
        </div>
      )}
    </div>
  );
}