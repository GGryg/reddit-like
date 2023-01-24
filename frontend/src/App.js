import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/Navbar';
import Board from './components/Board';
import LogIn from './components/LogIn';
import Register from './components/Register';
import TopicForm from './components/TopicForm';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './reducers/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';
import PostsList from './components/PostsList';
import SearchPage from './components/SearchPage';
import EditPost from './components/EditPost';
import Setting from './components/Setting';

function App() {
  const dispatch = useDispatch();
  const check = localStorage.getItem('token');  
  if(check){
    const {id, username, role} = jwt_decode(check);
    const current_user = {id: id, username: username, role: role};
    dispatch(setCurrentUser({user: current_user, isAuthenticated: true, token: check}));
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/t/:topic" element={<Board />}>
          <Route path='create' element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          } />
          <Route index element={<PostsList />} />
          <Route path='post/:postId' element={<PostDetails />} >
            <Route path='edit' element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            } />
          </Route>
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path='/topic/create' element={
          <ProtectedRoute>
            <TopicForm />
          </ProtectedRoute>
        } />
        <Route path='/search/:text' element={<SearchPage />} />
        <Route path='/settings' element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        } />
        <Route path='*' element={<Navigate to='/t/Home' replace />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
