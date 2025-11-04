import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Courses from './pages/Courses'
import Professors from './pages/Professors'
import Classes from './pages/Classes'
import StudentView from './pages/StudentView'
import MySchedule from './pages/MySchedule'
import Enrollments from './pages/Enrollments'
import EnrollmentForm from './pages/EnrollmentForm'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'students', element: <Students /> },
      { path: 'courses', element: <Courses /> },
      { path: 'professors', element: <Professors /> },
      { path: 'classes', element: <Classes /> },
      { path: 'student', element: <StudentView /> },
      { path: 'myschedule', element: <MySchedule /> },
      { path: 'enrollments', element: <Enrollments /> },
      { path: 'enrollments/new', element: <EnrollmentForm /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
