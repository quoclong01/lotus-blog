export const convertHtml = (content: string) => {
  if (content) {
    const parse = require('html-react-parser');
    return parse(content);
  }
};
