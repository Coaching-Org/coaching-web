/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthusersUsersImport } from './routes/_auth/(users)/users'
import { Route as AuthprofileProfileImport } from './routes/_auth/(profile)/profile'
import { Route as AuthdashboardDashboardImport } from './routes/_auth/(dashboard)/dashboard'
import { Route as AuthcalendarCalendarImport } from './routes/_auth/(calendar)/calendar'
import { Route as AuthappointmentsAppointmentsImport } from './routes/_auth/(appointments)/appointments'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthusersUsersRoute = AuthusersUsersImport.update({
  path: '/users',
  getParentRoute: () => AuthRoute,
} as any)

const AuthprofileProfileRoute = AuthprofileProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

const AuthdashboardDashboardRoute = AuthdashboardDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

const AuthcalendarCalendarRoute = AuthcalendarCalendarImport.update({
  path: '/calendar',
  getParentRoute: () => AuthRoute,
} as any)

const AuthappointmentsAppointmentsRoute =
  AuthappointmentsAppointmentsImport.update({
    path: '/appointments',
    getParentRoute: () => AuthRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/(appointments)/appointments': {
      id: '/_auth/appointments'
      path: '/appointments'
      fullPath: '/appointments'
      preLoaderRoute: typeof AuthappointmentsAppointmentsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/(calendar)/calendar': {
      id: '/_auth/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof AuthcalendarCalendarImport
      parentRoute: typeof AuthImport
    }
    '/_auth/(dashboard)/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthdashboardDashboardImport
      parentRoute: typeof AuthImport
    }
    '/_auth/(profile)/profile': {
      id: '/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthprofileProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/(users)/users': {
      id: '/_auth/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthusersUsersImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthappointmentsAppointmentsRoute: typeof AuthappointmentsAppointmentsRoute
  AuthcalendarCalendarRoute: typeof AuthcalendarCalendarRoute
  AuthdashboardDashboardRoute: typeof AuthdashboardDashboardRoute
  AuthprofileProfileRoute: typeof AuthprofileProfileRoute
  AuthusersUsersRoute: typeof AuthusersUsersRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthappointmentsAppointmentsRoute: AuthappointmentsAppointmentsRoute,
  AuthcalendarCalendarRoute: AuthcalendarCalendarRoute,
  AuthdashboardDashboardRoute: AuthdashboardDashboardRoute,
  AuthprofileProfileRoute: AuthprofileProfileRoute,
  AuthusersUsersRoute: AuthusersUsersRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/appointments': typeof AuthappointmentsAppointmentsRoute
  '/calendar': typeof AuthcalendarCalendarRoute
  '/dashboard': typeof AuthdashboardDashboardRoute
  '/profile': typeof AuthprofileProfileRoute
  '/users': typeof AuthusersUsersRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/appointments': typeof AuthappointmentsAppointmentsRoute
  '/calendar': typeof AuthcalendarCalendarRoute
  '/dashboard': typeof AuthdashboardDashboardRoute
  '/profile': typeof AuthprofileProfileRoute
  '/users': typeof AuthusersUsersRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/appointments': typeof AuthappointmentsAppointmentsRoute
  '/_auth/calendar': typeof AuthcalendarCalendarRoute
  '/_auth/dashboard': typeof AuthdashboardDashboardRoute
  '/_auth/profile': typeof AuthprofileProfileRoute
  '/_auth/users': typeof AuthusersUsersRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/appointments'
    | '/calendar'
    | '/dashboard'
    | '/profile'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/appointments'
    | '/calendar'
    | '/dashboard'
    | '/profile'
    | '/users'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/login'
    | '/_auth/appointments'
    | '/_auth/calendar'
    | '/_auth/dashboard'
    | '/_auth/profile'
    | '/_auth/users'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/appointments",
        "/_auth/calendar",
        "/_auth/dashboard",
        "/_auth/profile",
        "/_auth/users"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/appointments": {
      "filePath": "_auth/(appointments)/appointments.tsx",
      "parent": "/_auth"
    },
    "/_auth/calendar": {
      "filePath": "_auth/(calendar)/calendar.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard": {
      "filePath": "_auth/(dashboard)/dashboard.tsx",
      "parent": "/_auth"
    },
    "/_auth/profile": {
      "filePath": "_auth/(profile)/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/users": {
      "filePath": "_auth/(users)/users.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */