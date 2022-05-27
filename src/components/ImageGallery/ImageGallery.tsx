import { CircularProgress, ImageList, ImageListItem } from '@mui/material'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../service/firebaseSetup'

const ImageGallery = ({_posts} : {_posts: string[]}) => {
    const [posts, setPosts] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getPosts = async() => {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        let filter: DocumentData[] = querySnapshot.docs;
        filter = filter.filter((post) => _posts.includes(post.data().uuid))
        setPosts(filter);
        setLoading(false)
    }

    useEffect(() => {
        getPosts();
    }, [])
    return (
    <ImageList sx={{ minWidth: "100%", height: "auto" }} cols={3} rowHeight={164}>
        {
            loading && <CircularProgress />
        }
    {posts.map((item, i) => (
      <ImageListItem component={Link} key={i} to={`/post/${item.data().uuid}`}>
        <img        
        src={`${item.data().postImage}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${item.data().postImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.data().description} loading="lazy" />
      </ImageListItem>
    ))}
  </ImageList>
  )
}

export default ImageGallery