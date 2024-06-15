import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import AddUser from './components/adduser/AddUser';
import RemovedUsers from './components/removedusers/RemovedUsers';
import NavigationBar from './components/navigationbar/NavigationBar';
import Users from './components/users/Users';
function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        { 
          path:'/',
          element:<AddUser/>
        },
        {
          path:'/removedusers',
          element:<RemovedUsers/>
        },
        {
          path:'/users',
          element:<Users/>
        }
      ]

    }
  ])

  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
