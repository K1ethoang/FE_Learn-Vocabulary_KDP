import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundScreen = () => {
  const navigate = useNavigate()
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={navigate(-1)}>Back Home</Button>}
  />
  )
}

export default NotFoundScreen
