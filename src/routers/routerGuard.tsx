/*
 * @Author: 卢天宇
 * @Date: 2023-10-17 01:13:18
 * @Description: 
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgess from 'nprogress';

interface Props {
  children: React.ReactElement | null
}

const RouterGuard = function (props: Props) {
  NProgess.start();
  const location = useLocation();

  useEffect(() => {
    // * 开始进度条
    NProgess.done();

    return () => {
      NProgess.done();
    }
  }, [location])

  return props.children || null
}

export default RouterGuard;