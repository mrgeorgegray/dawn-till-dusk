/**
 * Formats dateString toLocaleTimeString()
 * for consistent styling
 * @param  {string} dateString - A valid date string
 * @return {string} A formatted string
 */
const formatTime = (dateString: string): string =>
  new Date(dateString).toLocaleTimeString();

export default formatTime;
