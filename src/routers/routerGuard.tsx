/*
 * @Author: 卢天宇
 * @Date: 2023-10-17 01:13:18
 * @Description: 
 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgess from 'nprogress';

const RouterGuard: React.FC<{ children: any }> = function (props) {
  NProgess.start();
  const location = useLocation();

  useEffect(() => {
    // * 开始进度条
    NProgess.done();

    return () => {
      NProgess.done();
    }
  }, [location])

  return props.children
}

export default RouterGuard;