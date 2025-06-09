// Inspiré de la palette Airbnb (corail, neutres doux)
export const lightColors = {
  primary: "#FF5A5F", // Corail Airbnb
  secondary: "#00A699", // Vert d'accent
  success: "#007A87", // Teinte verte utilisée dans leur design
  warning: "#F5A623", // Jaune/orange doux
  error: "#D93900", // Rouge foncé
  surface: "#ffffff", // Fond clair
  onPrimary: "#ffffff", // Texte sur fond corail
  onSurface: "#484848", // Texte principal (gris foncé)
  //onSurface: "#000000",
};

export const darkColors = {
  primary: "#FF5A5F", // Conserve le corail
  secondary: "#00A699", // Même accent vert
  success: "#00D1C1", // Plus vif pour le dark mode
  warning: "#FFC107", // Jaune plus lumineux
  error: "#FF6F61", // Rouge plus doux pour le dark
  surface: "#121212", // Fond sombre
  onPrimary: "#ffffff", // Texte sur fond coloré
  onSurface: "#E0E0E0", // Texte sur fond sombre
  //onSurface: "#FFFFFF",
};

/**
 * Ajoute une opacité à une couleur hexadécimale.
 * @param hex - Couleur hexadécimale (#RRGGBB)
 * @param alpha - Opacité entre 0 (transparent) et 1 (opaque)
 * @returns Couleur en format rgba()
 */
export function getOpacity(hex: string, alpha: number): string {
  // Vérifie si c'est un hex court (#RGB) et l'étend
  if (hex.length === 4) {
    hex = "#" + [...hex.slice(1)].map((c) => c + c).join("");
  }

  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
