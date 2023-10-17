import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@arco-design/web-react";

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-2xl border-2 border-blue-900 flex flex-col">
      这是Demo页面
      <div>
        <Button type="primary" onClick={() => navigate('about')}>跳转到About页面</Button>
      </div>
    </div>
  )
}
