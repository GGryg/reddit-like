import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LogIn from './components/LogIn';
import Register from './components/Register';
import TopicBoard from './components/TopicBoard';

function App() {
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
      <Route path='/topic/:topic' element={<TopicBoard />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
