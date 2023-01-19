import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import TopicBoard from './components/TopicBoard';
import TopicForm from './components/TopicForm';
import PostDetails from './components/PostDetails';
import PostsList from './components/PostsList';

function App() {
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
      <Route path='/topic/:topic/*' element={<TopicBoard />} >
        <Route index element={<Navigate to="posts" replace />} />
        <Route path='posts' element={<PostsList />} />
        <Route path='post/:id' element={<PostDetails />} />
      </Route>
      <Route path='/topic/create' element={
        <ProtectedRoute>
          <TopicForm />
        </ProtectedRoute>
        } />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
