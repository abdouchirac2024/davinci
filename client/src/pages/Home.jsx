import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { TypeAnimation } from 'react-type-animation';
import World3D from '../components/World3D';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=3');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h2 className="text-4xl md:text-5xl xl:text-7xl">
          Bienvenue Chez{" "}
          <TypeAnimation
            sequence={["DAVINCI Blogs", 1000, "", 1000, "Solutions", 1000]}
            wrapper="span"
            speed={20}
            className="text-blue-500 inline-block"
            repeat={Infinity}
          />{" "}
        </h2>
        <World3D />
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          Voir tous les articles
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Articles récents</h2>
            <div className='flex flex-row justify-between gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              Voir tous les articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}