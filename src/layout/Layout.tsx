import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
import Header from '../components/Header/Header'
import SEO from '../components/SEO'
import useStyles from "./style"
const Layout = ({children, title}: {children: ReactNode | ReactNode[], title: string}) => {
    const classes = useStyles();
  return (
    <section>
        <SEO title={title}/>
        <Header />
        <Box className={classes.main}>
            <section className={classes.childrenWrapper}>
                <div className={classes.children}>
                    {children}
                </div>
            </section>
        </Box>
    </section>
  )
}

export default Layout