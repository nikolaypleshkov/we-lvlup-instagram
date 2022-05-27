import React from 'react'
import Helmet from "react-helmet"
const SEO = ({title} : {title:string}) => {
  const titleText = title ? `${title} · Instagram` : "Instagram";
  return (
      <Helmet>
          <title>{titleText}</title>
      </Helmet>
  )
}

export default SEO