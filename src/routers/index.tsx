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

// * 在vite中，使用rollup进行打包，如果使用import()动态导入的话，自动会分包，但是前提是路径必须是字符串，而且是指定好的，如果含有参数，则不会单独打包。
// * 只能使用lazy首先把组件加载出来之后用来匹配，才可以。
const viewMap: {
  [key: string]: any
} = {
  '/': lazy(() => import("@/App")),
  'demo': lazy(() => import('@views/Demo')),
  'about': lazy(() => import('@views/About')),
  'about/:id': lazy(() => import('@views/About')),
  'contact': lazy(() => import('@views/Contact'))
};

function LazyNode({ elementPath }: { elementPath: string }) {
  // const Component = lazy(() => import(`${elementPath}.tsx`));
  const Component = viewMap[elementPath];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

// const App = lazy(() => import('@/App.tsx'));
// const Demo = lazy(() => import('@views/Demo'));
// const About = lazy(() => import('@views/About'));
// const Contact = lazy(() => import('@views/Contact'));

export const routes: routesProps[] = [
  {
    path: "/",
    element: <LazyNode elementPath={"/"} />,
    // element: <App />,
    breadcrumbName: "Home",
    children: [
      {
        path: "demo",
        element: <LazyNode elementPath={"demo"} />,
        // element: <Demo />,
        breadcrumbName: 'Demo',
        children: [
          {
            path: "about",
            element: <LazyNode elementPath={"about"} />,
            // element: <About />,
            breadcrumbName: 'About',
            children: [
              {
                path: 'contact',
                element: <LazyNode elementPath={"contact"} />,
                // element: <Contact />,
                breadcrumbName: 'Contact',
              }
            ]
          },
          {
            path: "about/:id",
            element: <LazyNode elementPath={"about/:id"} />,
            // element: <About />,
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

const Router = function () {
  return (
    <RouterGuard>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            routes.map(route => {
              return <React.Fragment key={route.path}>{RouteView(route)}</React.Fragment>
            })
          }
        </Routes>
      </Suspense>
    </RouterGuard>
  )
}

export { Router };