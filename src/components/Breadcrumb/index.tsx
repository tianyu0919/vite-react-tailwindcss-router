/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 19:43:40
 * @Description: 
 */
import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { flattenRoutes, routes } from '@/routers';
import { routesProps } from '@/routers/types'
import classnames from 'classnames'

export default function Breadcrumb() {
  const [matchedRoutes, setMatchedRoutes] = useState<routesProps[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  function matchRuler(path: string) {
    const match = new RegExp(`${path}`, 'g');
    return match.test(location.pathname.toLocaleLowerCase());
  }

  useEffect(() => {
    const flatRoutes = flattenRoutes(routes);

    // 根据当前路径获取匹配的路由配置
    const matchRoutes = flatRoutes.filter(route => {
      if (route.path === '*') return false;
      // const match = new RegExp(`${route.path.toLocaleLowerCase()}`, 'g');
      // return match.test(location.pathname.toLocaleLowerCase());
      // return matchRuler(route.path);
      return matchRuler(route.path.toLocaleLowerCase());
    });
    setMatchedRoutes(matchRoutes);

  }, [location.pathname])

  return (
    <div className='flex gap-1 justify-start items-center select-none font-sans'>
      {matchedRoutes.map((route, idx, arr) => {
        return (
          <React.Fragment key={route.path || 'not'}>
            {idx !== 0 ? <span>/</span > : ''}
            <span
              onClick={() => {
                !matchPath(location.pathname, route.path) && navigate(route.path || '')
              }}
              className={classnames({
                "cursor-pointer": idx !== arr.length - 1,
                "hover:bg-slate-200": idx !== arr.length - 1,
                "text-sky-400": idx === arr.length - 1
              }, 'block box-border px-2 py-1 rounded-md border-slate-400')}
            >
              {route.breadcrumbName}
            </span>
          </React.Fragment>
        )
      })}
    </div>
  )
}
