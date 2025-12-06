import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
