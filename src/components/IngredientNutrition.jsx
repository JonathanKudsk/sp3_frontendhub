import styles from "./RecipeModal.module.css";

export default function IngredientNutrition({ nutrition, unit }) {
  if (!nutrition) return null;

  const unitLower = unit?.toLowerCase() || "";
  const isMl = unitLower === "ml";
  const nutritionLabel = isMl ? `Nutrition (per ${unit})` : "Nutrition (per 100g)";

  return (
    <div className={styles.macros}>
      <h4 className={styles.macrosTitle}>{nutritionLabel}</h4>
      <div className={styles.macrosGrid}>
        {nutrition.calories !== undefined && nutrition.calories !== null && (
          <div className={styles.macroItem}>
            <span className={styles.macroLabel}>Calories</span>
            <span className={styles.macroValue}>
              {nutrition.calories} kcal
            </span>
          </div>
        )}
        {nutrition.protein !== undefined && nutrition.protein !== null && (
          <div className={styles.macroItem}>
            <span className={styles.macroLabel}>Protein</span>
            <span className={styles.macroValue}>
              {nutrition.protein}g
            </span>
          </div>
        )}
        {nutrition.carbs !== undefined && nutrition.carbs !== null && (
          <div className={styles.macroItem}>
            <span className={styles.macroLabel}>Carbs</span>
            <span className={styles.macroValue}>
              {nutrition.carbs}g
            </span>
          </div>
        )}
        {nutrition.fat !== undefined && nutrition.fat !== null && (
          <div className={styles.macroItem}>
            <span className={styles.macroLabel}>Fat</span>
            <span className={styles.macroValue}>
              {nutrition.fat}g
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

