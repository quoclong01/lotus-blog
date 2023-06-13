import React from 'react';
import { Link } from 'react-router-dom';

interface ITagProps {
  name: string
}

export const Tag = ({ name }: ITagProps) => {
  return (
    <li className="tag">
      <Link to={`/posts?tags=${name}`} className="tag-link">
        {name}
      </Link>
    </li>
  );
};
