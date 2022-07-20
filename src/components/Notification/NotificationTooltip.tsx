import Typography from "@mui/material/Typography/Typography";
import { DocumentData } from "firebase/firestore";
import React from "react";
import useStyles from "../Header/style";
const NotificationTooltip = ({ notifications }: { notifications?: DocumentData[] }) => {
  const classes = useStyles();

  return (
    <div className={classes.tooltipContainer}>
      {notifications?.length && notifications?.map((notification: DocumentData, i: number) =>
        notification.data().type === "follow" ? (
          <div key={i}>
            <span aria-label="Followers" className={classes.followers} />
            <Typography>1</Typography>
          </div>
        ) : (
          <div className={classes.tooltip} key={i}>
            <span aria-label="Likes" className={classes.likes} />
            <Typography>1</Typography>
          </div>
        )
      )}
    </div>
  );
};

export default NotificationTooltip;
