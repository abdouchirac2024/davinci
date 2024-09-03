import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'flowbite-react';

export default function DashApplications({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/application/${postId}`);
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
  }, [postId, currentUser.isAdmin]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Resume</Table.HeadCell>
          <Table.HeadCell>Cover Letter</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {applications.map((application) => (
            <Table.Row key={application._id}>
              <Table.Cell>{application.fullName}</Table.Cell>
              <Table.Cell>{application.email}</Table.Cell>
              <Table.Cell>{application.phoneNumber}</Table.Cell>
              <Table.Cell>
                <a href={application.resume} target='_blank' rel='noopener noreferrer'>
                  <Button size='sm'>View Resume</Button>
                </a>
              </Table.Cell>
              <Table.Cell>
                <Button size='sm' onClick={() => alert(application.coverLetter)}>
                  View Cover Letter
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}