export const validateDob = (time: string) => {
  // eslint-disable-next-line
  const regex = new RegExp(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/);
  if (regex.test(time)) {
    const parts = time.split('-');
    const date = new Date();
    
    if (date.getFullYear() < +parts[0] || +parts[0] < 1900) {
      return 'invalid';
    }
    if(date.getFullYear() === +parts[0]){
      if (date.getMonth() + 1 < +parts[1]) {
        return 'invalid';
      }
      if(date.getMonth() + 1 === +parts[1]) {
        if (date.getDate() < +parts[2]) {
          return 'invalid';
        }
      }
    }
  } else {
    return 'invalid';
  }
  return true;
};
