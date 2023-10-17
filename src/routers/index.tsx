/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 17:49:13
 * @Description: 
 */
/*
 * @Author: 卢天宇
 * @Date: 2023-10-16 17:49:13
 * @Description: 
 */
import React, { Suspense, lazy } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import { type routesProps } from './types'
import RouterGuard from './routerGuard';

function NotFoundPage() {
  return <div>404 - Page Not Found</div>
}

function LazyNode({ elementPath }: { elementPath: string }) {
  const Component = lazy(() => import(`${elementPath}.tsx`));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export const routes: routesProps[] = [
  {
    path: "/",
    element: <LazyNode elementPath={"../App"} />,
    breadcrumbName: "Home",
    children: [
      {
        path: "demo",
        element: <LazyNode elementPath={"../views/Demo/index"} />,
        breadcrumbName: 'Demo',
        children: [
          {
            path: "about",
            element: <LazyNode elementPath={"../views/About/index"} />,
            breadcrumbName: 'About',
            children:[
              {
                path: 'contact',
                element: <LazyNode elementPath={"../views/Contact/index"} />,
                breadcrumbName: 'Contact',
              }
            ]
          },
          {
            path: "about/:id",
            element: <LazyNode elementPath={"../views/About/index"} />,
            breadcrumbName: 'About'
          },
        ]
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    breadcrumbName: '404',
  }
]

/**
 * 拉平路由数组，使其可以进行面包屑匹配路径
 * @param routes 路由数组
 * @param parentPath 父路由的路径
 * @returns 返回拉平的路由数组
 */
export function flattenRoutes(routes: routesProps[], parentPath: string = ""): routesProps[] {
  let result: routesProps[] = [];

  routes.forEach(route => {
    let currentPath = "";
    if (route.path === '*') {
      currentPath = route.path;
    } else {
      currentPath = `${parentPath.endsWith('/') ? parentPath : parentPath + '/'}${route.path === "/" ? '' : route.path}`;
    }
    result.push({ ...route, path: currentPath, });
    if (route.children) {
      result = result.concat(flattenRoutes(route.children, currentPath))
    }
  });

  return result;
}

function RouteView(routeConfig: routesProps) {
  if (routeConfig.children) {
    return (
      <Route key={routeConfig.path} path={routeConfig.path} element={routeConfig.element}>
        {routeConfig.children.map(route => RouteView(route))}
      </Route>
    )
  }
  return <Route key={routeConfig.path} path={routeConfig.path} element={routeConfig.element} />
}

const Router = () => {
  return (
    <RouterGuard>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        {
          routes.map(route => {
            return <React.Fragment key={route.path}>{RouteView(route)}</React.Fragment>
          })
        }
      </Routes>
      {/* </Suspense> */}
    </RouterGuard>
  )
}

export { Router };