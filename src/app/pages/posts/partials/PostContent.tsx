import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../shared/common/formatDate';
import { convertHtml } from './../../../shared/common/convertHtml';
import { checkUserId } from '../../../shared/common/checkUserId';
import { Tag } from '../../../shared/components/partials';
import ButtonLike from '../../../shared/components/partials/ButtonLike';
import Image from '../../../../assets/images';
import PostAction from './PostAction';

const PostContent = ({ post }: any) => {
  return (
    <div className="articles-item">
      <div className="article-header">
        <div className="article-header-left">
          <div className="author-image">
            <Link
              to={
                checkUserId(post.user?.id)
                  ? `/profile/me`
                  : `/profile/${post.user?.id}`
              }
            >
              <img
                src={post.user?.picture || Image.Avatar}
                alt={post.user?.displayName}
                onError={(e: any) => {
                  e.target['onerror'] = null;
                  e.target['src'] = Image.Avatar;
                }}
              />
            </Link>
          </div>
          <div className="article-author">
            <div className="author-name">
              <Link
                to={
                  checkUserId(post.user?.id)
                    ? `/profile/me`
                    : `/profile/${post.user?.id}`
                }
              >
                {post.user?.displayName}
              </Link>
            </div>
            <div className="author-time">
              <span className="author-date">{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span className="readingTime">5 min read</span>
            </div>
          </div>
        </div>
        <PostAction post={post} />
      </div>
      <div className="article-content">
        <h2 className="article-title">{post.title}</h2>
        {post.tags?.length ? (
          <ul className="tag-article">
            {post.tags?.map((tag: any) => (
              <Tag key={tag} name={tag} />
            ))}
          </ul>
        ) : null}
        <p className="article-description">{post.description}</p>
        <img
          className="article-image"
          src={post.cover || Image.Empty}
          alt={post.title}
        />
        <div className="article-text">{convertHtml(post.content)}</div>
        <div className="article-interact">
          <ButtonLike post={post} />
          <div className="interact-comment">
            <i className="fa-regular fa-comment"></i>
            {post.comments}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
