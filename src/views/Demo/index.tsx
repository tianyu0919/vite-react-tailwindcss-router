// import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Space } from "@arco-design/web-react";

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-2xl border-2 border-blue-900 flex flex-col">
      这是Demo页面
      <div>
        <Space>
          <Button type="primary" onClick={() => navigate('about')}>跳转到About页面</Button>
          <Button type="primary" onClick={() => navigate(`about/${Math.floor(Math.random() * 10)}`)}>跳转到About页面,携带动态参数</Button>
        </Space>
      </div>
      <Outlet />
    </div>
  )
}
