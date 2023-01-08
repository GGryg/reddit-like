import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import LogIn from './components/LogIn';
import TopicBoard from './components/TopicBoard';

function App() {
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/login' element={<LogIn />} />
    </Routes>
      <TopicBoard />
    </BrowserRouter>
  );
}

export default App;
