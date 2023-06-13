export const formatDate = (time: string) => {
  if (time) {
    const MONTH = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = time.split('T')[0].split('-');

    return `${MONTH[+date[1] - 1]} ${date[2]}, ${date[0]}`;
  }
};
