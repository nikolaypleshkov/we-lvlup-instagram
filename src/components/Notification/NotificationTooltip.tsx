import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import useStyles from '../Header/style';
const NotificationTooltip = () => {
  const classes = useStyles();

  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltip}>
        <span aria-label="Followers" className={classes.followers} />
        <Typography>1</Typography>
      </div>
      <div className={classes.tooltip}>
        <span aria-label="Likes" className={classes.likes} />
        <Typography>1</Typography>
      </div>
    </div>
  );
};

export default NotificationTooltip;
