import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { API_KEY, BASE_URL } from '../config';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




  const searchRecipes = async (query) => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      setError('Please enter a valid API Key.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&number=12`);
      
      if (response.status === 401) {
         throw new Error('Invalid API Key. Please check your key.');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Try again later.');
      }
      
      const data = await response.json();
      setRecipes(data.results);
      if (data.results.length === 0) {
        setError('No recipes found. Try a different term.');
      }
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page fade-in">
      <div className="hero-section">
        <h1 className="main-title">Discover Delicious Recipes</h1>
        <p className="subtitle">Find the perfect meal for any occasion</p>
        


        <SearchBar onSearch={searchRecipes} />
      </div>

      {loading && <div className="loader"></div>}
      
      {error && <div className="error-message">{error}</div>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
