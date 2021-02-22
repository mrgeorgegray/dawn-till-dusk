export default (dateString: string) => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(dateString)) {
    return false;
  }

  const isValidDate = Date.parse(dateString);
  return isNaN(isValidDate) ? false : true;
};
