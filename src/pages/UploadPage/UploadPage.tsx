import React from 'react'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import Layout from '../../layout/Layout'

const UploadPage = () => {
  return (
      <Layout title="Upload Post">
          <ImageUploader />
      </Layout>
  )
}

export default UploadPage