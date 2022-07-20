import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPost from './UserPost';
import Layout from '../../layout/Layout';
import { db } from '../../service/firebaseSetup';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async (id: string) => {
      const q = query(collection(db, 'posts'), where('uuid', '==', id));
      const querySnapshot = await getDocs(q);
      setPost(querySnapshot.docs[0]);
      setLoading(false);
    };
    fetchPost(id!);
  }, [id]);

  return (
    <Layout title='Post'>
        {loading ? "Loading...." : <UserPost post={post?.data()} /> }
    </Layout>
  );
};

export default PostPage;
