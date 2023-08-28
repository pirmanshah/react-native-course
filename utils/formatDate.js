export function formatDate(date) {
  const inputDate = new Date(date);

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return inputDate.toLocaleDateString('id-ID', options);
}
