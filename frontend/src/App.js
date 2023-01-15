import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Register from './components/Register';
import TopicBoard from './components/TopicBoard';
import TopicForm from './components/TopicForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
      <Route path='/topic/:topic' element={<TopicBoard />} />
      <Route path='/topic/create' element={<TopicForm />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
