import React from 'react'
import Button from "@material-ui/core/Button";

const PrimaryButtons = ({ children }: { children: React.ReactNode | React.ReactNode[]; }): JSX.Element => {
  return (
    <Button>{children}</Button>
  )
}

export default PrimaryButtons;