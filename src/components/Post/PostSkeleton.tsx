import {
  Card,
  CardHeader,
  Skeleton,
  CardActions,
  CardContent,
} from '@mui/material';
import React from 'react';

const PostSkeleton = () => {
  return (
    <Card sx={{ minWidth: '100%', marginTop: '2rem' }}>
      <CardHeader
        avatar={
          <Skeleton
            variant='circular'
            animation='wave'
            width={40}
            height={40}
          />
        }
        subheader={<Skeleton animation='wave' width={80} />}
      />
      <Skeleton variant='rectangular' animation='wave' height={194} />
      <CardActions></CardActions>
      <CardContent>
        <Skeleton animation='wave' width={80} />
        <Skeleton animation='wave' width={110} />
      </CardContent>
    </Card>
  );
};

export default PostSkeleton;
