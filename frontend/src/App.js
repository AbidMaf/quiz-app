import logo from './logo.svg';
import './App.css';
import {
  Home, Quiz, Question
} from './components/pages';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz/:id/question" element={<Question />} /> 
      </Routes>
    </div>
  );
}

export default App;
