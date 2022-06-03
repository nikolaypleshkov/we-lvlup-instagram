import { SerializedError } from '@reduxjs/toolkit';
import React, { FunctionComponent } from 'react'

interface MessageInterface {
    message?: string;
    type: "danger" | "success"
}
const Message: FunctionComponent<MessageInterface> = ({ message, type}) => {
  let typeClass = "";
  
  if(type === "danger"){
      typeClass = "error-message";
  }
  if(type === "success"){
      typeClass = "success-message";
  }
  return (
      <div className={typeClass}>
          <span>{message}</span>
      </div>
  )
}

export default Message