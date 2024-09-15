import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashApplications() {
  const { currentUser } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/application');
        const data = await res.json();
        if (res.ok) {
          setApplications(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Une erreur est survenue lors de la récupération des candidatures.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchApplications();
    }
  }, [currentUser]);

  if (loading) return <div>Chargement des candidatures...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && applications.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Nom complet</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Téléphone</Table.HeadCell>
              <Table.HeadCell>Statut</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {applications.map((application) => (
                <Table.Row key={application._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{application.fullName}</Table.Cell>
                  <Table.Cell>{application.email}</Table.Cell>
                  <Table.Cell>{application.phoneNumber}</Table.Cell>
                  <Table.Cell>{application.status}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/dashboard/application/${application._id}`}>
                      <Button size='sm'>Voir détails</Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p>Vous n'avez pas de candidatures à afficher pour le moment.</p>
      )}
    </div>
  );
}