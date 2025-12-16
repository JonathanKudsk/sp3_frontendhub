import IngredientNutrition from "./IngredientNutrition";
import styles from "./RecipeModal.module.css";

export default function IngredientsList({ ingredients, expandedIngredients, onToggleIngredient }) {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className={styles.ingredientsSection}>
      <h3 className={styles.sectionTitle}>Ingredients</h3>
      <div className={styles.ingredientsList}>
        {ingredients.map((recipeIngredient) => {
          const isExpanded = expandedIngredients.has(recipeIngredient.id);
          const hasNutrition = recipeIngredient.ingredient?.nutrition;

          return (
            <div key={recipeIngredient.id} className={styles.ingredientItem}>
              <div className={styles.ingredientInfo}>
                <div className={styles.ingredientNameSection}>
                  <span className={styles.ingredientName}>
                    {recipeIngredient.ingredient.name}
                  </span>
                  {recipeIngredient.ingredient.description && (
                    <span className={styles.ingredientDescription}>
                      {recipeIngredient.ingredient.description}
                    </span>
                  )}
                </div>
                <div className={styles.ingredientInfoRight}>
                  <span className={styles.ingredientAmount}>
                    {recipeIngredient.quantity} {recipeIngredient.unit}
                  </span>
                  {hasNutrition && (
                    <button
                      type="button"
                      className={`${styles.nutritionPill} ${isExpanded ? styles.nutritionPillActive : ""}`}
                      onClick={() => onToggleIngredient(recipeIngredient.id)}
                    >
                      {isExpanded ? "−" : "+"}
                    </button>
                  )}
                </div>
              </div>
              {recipeIngredient.preparation && (
                <p className={styles.ingredientPreparation}>
                  {recipeIngredient.preparation}
                </p>
              )}
              {hasNutrition && isExpanded && (
                <IngredientNutrition
                  nutrition={recipeIngredient.ingredient.nutrition}
                  unit={recipeIngredient.unit}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

