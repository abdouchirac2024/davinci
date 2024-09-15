import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import ApplyForm from '../components/ApplyForm';
import DashApplications from '../components/DashApplications';

export default function PostPage() {
  const { postSlug } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      
      <div className='flex flex-col lg:flex-row gap-8 items-start mt-10'>
        <div className='w-full lg:w-1/2 lg:sticky lg:top-10'>
          <div className='aspect-w-16 aspect-h-9 mb-4 lg:mb-0'>
            <img
              src={post && post.image}
              alt={post && post.title}
              className='object-cover w-full h-full rounded-lg'
            />
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
          <div className='flex justify-between p-3 border-b border-slate-500 w-full text-xs mb-4'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className='post-content prose max-w-none'
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto w-full mt-10'>
        <CallToAction />
      </div>

      {post && post.category === 'emploi' && !currentUser?.isAdmin && (
        <ApplyForm postId={post._id} />
      )}

      {/* {post && post.category === 'emploi' && currentUser?.isAdmin && (
        <div className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Applications for this job</h2>
          <DashApplications postId={post._id} />
        </div>
      )} */}

      <CommentSection postId={post && post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}