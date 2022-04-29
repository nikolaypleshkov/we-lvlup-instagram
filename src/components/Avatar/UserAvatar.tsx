import React from 'react'
import Avatar from "@mui/material/Avatar";
import { string } from 'joi';

interface AvatarProps{
  src?: string;
  username: string | undefined;
}

const UserAvatar = (props: AvatarProps) => {
  const { src, username} = props;
  return src ? (
    <Avatar sx={{ width: 56, height: 56 }} src={src} />
  ) : (
    <Avatar sx={{ width: 56, height: 56 }}> 
      {username?.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar