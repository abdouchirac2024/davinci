// davinci/client/src/components/DashApplications.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Modal } from 'flowbite-react';

export default function DashApplications() {
  const { currentUser } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/application');
        const data = await res.json();
        if (res.ok) {
          setApplications(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchApplications();
    }
  }, [currentUser.isAdmin]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Candidatures</h1>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Titre du poste</Table.HeadCell>
          <Table.HeadCell>Nom complet</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Téléphone</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {applications.map((application) => (
            <Table.Row key={application._id}>
              <Table.Cell>{application.postId.title}</Table.Cell>
              <Table.Cell>{application.fullName}</Table.Cell>
              <Table.Cell>{application.email}</Table.Cell>
              <Table.Cell>{application.phoneNumber}</Table.Cell>
              <Table.Cell>
                <Button size='sm' onClick={() => handleViewDetails(application)}>
                  Voir les détails
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Détails de la candidature</Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <div>
              <p><strong>Nom complet:</strong> {selectedApplication.fullName}</p>
              <p><strong>Email:</strong> {selectedApplication.email}</p>
              <p><strong>Téléphone:</strong> {selectedApplication.phoneNumber}</p>
              <p><strong>CV:</strong> <a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer">Voir le CV</a></p>
              <p><strong>Lettre de motivation:</strong></p>
              <p>{selectedApplication.coverLetter}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}