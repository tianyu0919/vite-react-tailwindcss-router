/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 17:47:33
 * @Description: 
 */
/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 17:47:33
 * @Description: 
 */
// import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Breadcrumb from '@components/Breadcrumb'
import { Button } from "@arco-design/web-react";


function App() {

  const navigate = useNavigate();

  return (
    <>
      <header className='bg-white px-8 py-1 mb-2 ring-1 ring-slate-900/5 shadow-xl'>
        <Breadcrumb />
      </header>
      <div className="mx-auto w-4/5">
        <h2>这是首页</h2>

        <div>
          <Button type="primary" onClick={() => navigate('Demo')}>跳转到Demo页面</Button>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default App
