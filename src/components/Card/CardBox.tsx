import React from "react"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import "./Card.scss";
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