import React from "react"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import useStyles from "./styles";
const CardBox = ({ children }: { children: React.ReactNode | React.ReactNode[]; }): JSX.Element => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        {children}
      <CardActions>
      </CardActions>
      </CardContent>
    </Card>
  )
}

export default CardBox