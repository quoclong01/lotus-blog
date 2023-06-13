import React from 'react';
import { IPost } from './../../../shared/interfaces/post';
import RecommendItem from './RecommendItem';

interface IArticleListProps {
  data: any;
}

const RecommendList = ({ data }: IArticleListProps) => {
  return (
    <ul className="article-list">
      {data.map((item: IPost) => (
        <RecommendItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default RecommendList;
