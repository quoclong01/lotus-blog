import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from './../../../shared/common/formatDate';
import { IPost } from './../../../shared/interfaces/post';
import Image from './../../../../assets/images/index';

interface IArticleItemProps {
  item: IPost;
}

const RecommendItem = ({ item }: IArticleItemProps) => {
  return (
    <li key={item.id} className="article-item">
      <div className="article-item-content">
        <h4 className="article-item-title">
          <Link to={`/posts/${item.id}`} className="txt-link-primary">
            {item.title}
          </Link>
        </h4>
        <span>{formatDate(item.createdAt)}</span>
      </div>
      <Link to={`/posts/${item.id}`} className="article-item-image">
        <img
          src={item.cover || Image.Empty}
          alt={item.title}
          onError={(e: any) => {
            e.target['onerror'] = null;
            e.target['src'] = Image.Empty;
          }}
        />
      </Link>
    </li>
  );
};

export default RecommendItem;
