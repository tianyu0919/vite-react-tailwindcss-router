/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 22:12:56
 * @Description: 
 */
// import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { Button } from "@arco-design/web-react";

export default function About() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className='p-6 rounded-2xl border-2 border-green-900 flex flex-col'>
      <div>This is About Page {id || 0}</div>
      <Button onClick={() => { navigate('/demo/about/contact') }}>跳转到Contact</Button>
      <Outlet />
    </div>
  )
}
