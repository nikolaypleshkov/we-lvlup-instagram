import React from 'react'
import Avatar from "@mui/material/Avatar";
import { string } from 'joi';
import { width } from '@mui/system';

interface AvatarProps{
  src?: string;
  username: string | undefined;
  size?: number | string;
}

const UserAvatar = (props: AvatarProps) => {
  const { src, username, size} = props;
  return src ? (
    <Avatar sx={{ width: size ? size : 56 , height: size ? size : 56 }} src={src} />
  ) : (
    <Avatar sx={{ width: size ? size : 56, height: size ? size : 56  }}> 
      {username?.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar