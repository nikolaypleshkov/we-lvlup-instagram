import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Post } from "redux/types";
import { Link } from "react-router-dom";

const ImageGallery = ({ _posts }: { _posts: Array<Post> | null }) => {
  return (
    <ImageList sx={{ minWidth: "100%", height: "auto" }} cols={3} rowHeight={164}>
      {_posts!.map((item, i) => (
        <ImageListItem component={Link} key={i} to={`/post/${item.uuid}`}>
          <img        
          src={`${item.postImage}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.postImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.description} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
