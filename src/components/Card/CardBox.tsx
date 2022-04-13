import React from 'react'
import Card from "@material-ui/core/Card";
import Box, { BoxProps } from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from '@material-ui/core/TextField';
import FormControl  from '@material-ui/core/FormControl';
import { PrimaryButton } from '../Buttons/Buttons';
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import  logo  from "../../assets/images/logo/logo.webp";
import FacebookIcon from "@material-ui/icons/Facebook";
import "./Card.scss";

interface IBox{
  src: BoxProps,
  className: string,
  alt: string
}
const BoxImage = (props: IBox) => <Box component="img" {...props} />

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