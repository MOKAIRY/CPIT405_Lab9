import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../config';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
       if (!API_KEY) {
           setError("API Key is missing. Please check your configuration.");
           setLoading(false);
           return;
       }
       
      try {
        const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="loader detail-loader"></div>;
  if (error) return (
      <div className="error-container">
          <div className="error-message">{error}</div>
          <Link to="/" className="back-link">Back to Home</Link>
      </div>
  );
  if (!recipe) return null;

  return (
    <div className="recipe-detail container fade-in">
      <Link to="/" className="back-button">← Back to Search</Link>
      
      <div className="detail-header">
        <h1 className="detail-title">{recipe.title}</h1>
        <div className="detail-meta">
            <span>⏱ {recipe.readyInMinutes} mins</span>
            <span>👥 Serves {recipe.servings}</span>
            <span>⭐️ {recipe.healthScore} Health Score</span>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-image-container">
            <img src={recipe.image} alt={recipe.title} className="detail-image" />
             <div className="tags">
                {recipe.vegetarian && <span className="tag veg">Vegetarian</span>}
                {recipe.glutenFree && <span className="tag gf">Gluten Free</span>}
                {recipe.dairyFree && <span className="tag df">Dairy Free</span>}
            </div>
        </div>

        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients?.map((ing) => (
              <li key={ing.id || ing.original} className="ingredient-item">
                <span className="bullet">•</span> {ing.original}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="instructions-section">
        <h2>Instructions</h2>
        {recipe.analyzedInstructions?.length > 0 ? (
           <div className="steps-list">
             {recipe.analyzedInstructions[0].steps.map((step) => (
               <div key={step.number} className="step-item">
                 <div className="step-number">{step.number}</div>
                 <p className="step-text">{step.step}</p>
               </div>
             ))}
           </div>
        ) : (
          <div className="html-summary" dangerouslySetInnerHTML={{ __html: recipe.instructions || recipe.summary }}></div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
