import React, { useState } from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import "./ReceipeFinder.css";
export default function ReceipeFinder() {
  const [searchInput, setsearchInput] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };
  const searchRecipes = async () => {
    try {
      const apiKey = "38e5a68546cd4c528fd11f482738ff9d";
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          searchInput
        )}&apiKey=${apiKey}`
      );
      const data = await response.json();
      console.log("data: ", data);
      if (response.ok) {
        setsearchResults(data);
        setError(null);
      } else {
        setsearchResults([]);
        setError(data.message);
      }
    } catch (error) {
      setsearchResults([]);
      setError("Error occurred!");
    }
  };

  return (
    <div className="Cont">
      <div className="container">
        <h1 className="title">Search Recipe</h1>
        <form on onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            placeholder="Enter ingredients (comma-separated)..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        {searchResults ? (
          <div className="ingredientsCont">
            {searchResults.map((recipe) => {
              console.log("recipe: ", recipe);
              return <RecipeCard recipe={recipe} />;
            })}
          </div>
        ) : (
          "No Recipe Found"
        )}
      </div>
    </div>
  );
}
