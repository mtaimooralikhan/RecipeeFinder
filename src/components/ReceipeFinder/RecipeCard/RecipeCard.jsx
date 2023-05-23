import React, { useState } from "react";
import "./RecipeCard.css";
export default function RecipeCard({ recipe }) {
  //   https://api.spoonacular.com/recipes/{id}/information

  const [showDetails, setshowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleToggleDetails = async () => {
    if (!showDetails) {
      setLoading(true);
      try {
        const apiKey = "38e5a68546cd4c528fd11f482738ff9d";
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        console.log("recipe data: ", data);
        if (response.ok) {
          setRecipeDetails(data);
          setError(null);
        } else {
          setRecipeDetails(null);
          setError(data.message);
        }
      } catch (error) {
        setRecipeDetails(null);
        setError("Error occurred!");
      }
      setLoading(false);
    }
    setshowDetails(!showDetails);
  };

  return (
    <div
      className="ingredientCard"
      style={{ height: showDetails ? "auto" : "400px" }}
    >
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <button onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {loading && <p className="loading">Loading recipe details..</p>}
      {error && <p>{error}</p>}

      {showDetails && recipeDetails && (
        <div className="cont-ingred">
          <h3>Ingredients: </h3>
          {recipeDetails?.extendedIngredients.length ? (
            <ul>
              {recipeDetails?.extendedIngredients?.map((ingredient) => {
                //   console.log("ingredient: ", ingredient);
                return <li key={ingredient.id}>{ingredient.original}</li>;
              })}
            </ul>
          ) : (
            "No Ingredients Found"
          )}

          <h3>Instructions: </h3>
          {recipeDetails?.analyzedInstructions.length ? (
            <ol>
              {recipeDetails?.analyzedInstructions[0]?.steps.map((step) => {
                return <li key={step.number}>{step.step}</li>;
              })}
            </ol>
          ) : (
            "No Instructions Found"
          )}
        </div>
      )}
    </div>
  );
}
