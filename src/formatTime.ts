export default (dateString: string): string =>
  new Date(dateString).toLocaleTimeString();
