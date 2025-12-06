import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card fade-in">
      <div className="card-image-container">
        <img src={recipe.image} alt={recipe.title} className="card-image" />
        <div className="card-overlay"></div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard;
