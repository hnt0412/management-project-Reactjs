import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { useAuthContext } from './hooks/hooks/useAuthContext';

import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import DashBoard from './pages/dashboard/DashBoard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import UsersOnline from './components/user-online/UsersOnline';
import Profile from './pages/profile/Profile';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import FinishedProject from './pages/finished-project/FinishedProject';



//style
import './App.css'

function App() {
  const { user,authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      {user &&<Sidebar />}
      <div className='container'>
      <Navbar />
        <Switch>
          <Route exact path='/'>
            {!user && <Redirect to='/login'/>}
            {user && <DashBoard />}
          </Route>
          <Route path='/create'>
            {!user && <Redirect to='/login'/>}
            {user && <Create />}
          </Route>
          <Route path='/projects/:id'>
            {!user && <Redirect to='/login'/>}
            {user && <Project />}
          </Route>
          <Route path='/profile/:id'>
            {!user && <Redirect to='/login'/>}
            {user && <Profile />}
          </Route>
          <Route path='/finished-project/:id'>
            {!user && <Redirect to='/login'/>}
            {user && <FinishedProject />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </div>
      {user && <UsersOnline />}
      </BrowserRouter>
       )}
    </div>
  );
}

export default App
