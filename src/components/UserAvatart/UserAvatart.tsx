import React from 'react'
import Avatar from "@mui/material/Avatar";

interface AvatarProps{
  src?: string;
  username: string | undefined;
  size?: number | string;
  border?: string
}

const UserAvatar = (props: AvatarProps) => {
  const { src, username, size, border} = props;
  return src ? (
    <Avatar alt={username} sx={{ width: size ? size : 56 , height: size ? size : 56, border: `1px solid ${border}` }} src={src} />
  ) : (
    <Avatar alt={username} sx={{ width: size ? size : 56, height: size ? size : 56, border: `1px solid ${border}` }}> 
      {username?.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar