import React from "react"
import Box from "@material-ui/core/Box"
import useStyles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import { Links as links } from "./links";
const Footer = (): JSX.Element => {
    const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
        <Box component="div" className={classes.ulContainer}>
            <Box component="ul" className={classes.ul}>
                {links.map((link, i) => (
                    <ListItem key={i} className={classes.li}>
                        <a href={link.path}>{link.name}</a>
                    </ListItem>
                ))}
            </Box>
        </Box>
    </Box>
  )
}

export default Footer