

export interface routesProps {
  path: string,
  element: React.ReactNode,
  breadcrumbName?: string,
  children?: routesProps[]
}