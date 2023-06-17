import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tag } from './Tag';
import { formatDate } from './../../common/formatDate';
import { checkUserId } from '../../common/checkUserId';
import Image from '../../../../assets/images';
import PostAction from '../../../pages/posts/partials/PostAction';

export const Post = ({ post, setPost }: any) => {
  const { t } = useTranslation();

  return (
    <li key={post.id} className="post-item">
      <div className="post">
        <div className="post-header">
          <div className="post-user">
            {post.user ? (
              <Link
                to={
                  checkUserId(post.user?.id)
                    ? `/profile/me`
                    : `/profile/${post.user?.id}`
                }
                className="post-user-info txt-link-primary"
              >
                <div className="post-user-image">
                  <img
                    src={post.user.picture || Image.Avatar}
                    alt={post.user.displayName}
                    onError={(e: any) => {
                      e.target['onerror'] = null;
                      e.target['src'] = Image.Avatar;
                    }}
                  />
                </div>
                <h4 className="post-user-name">{post.user.displayName}</h4>
              </Link>
            ) : post.status === 'public' ? (
              <div className="post-status">
                <i className="fa-solid fa-unlock"></i>
                {t('blog.public')}
              </div>
            ) : (
              <div className="post-status">
                <i className="fa-solid fa-lock"></i>
                {t('blog.private')}
              </div>
            )}
            <p className="post-date">{formatDate(post.createdAt)}</p>
          </div>
          <PostAction post={post} setPost={setPost} />
        </div>
        <div className="post-body">
          <div className="post-body-left">
            <div className="post-content">
              <h3 className="post-title">
                <Link
                  to={`/posts/${post.id}`}
                  className="post-title-link txt-link-primary"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="post-desc">{post.description}</p>
            </div>
            <div className="post-footer">
              <div className="post-meta">
                <div className="post-meta-info post-like">
                  <i className="fa-regular fa-thumbs-up"></i>
                  <span className="post-like-number">{post.likes || 0}</span>
                </div>
                <div className="post-meta-info post-comment">
                  <i className="fa-regular fa-comment"></i>
                  <span className="post-comment-number">
                    {post.comments || 0}
                  </span>
                </div>
              </div>
              {Array.isArray(post.tags) ? (
                <ul className="post-tags">
                  {post.tags.slice(-3).map((tag: any) => {
                    return <Tag key={tag} name={tag} />;
                  })}
                </ul>
              ) :
                <ul className="post-tags">
                  {post.tags.split(',').slice(-3).map((tag: any) => {
                    return <Tag key={tag} name={tag} />;
                  })}
                </ul>
              }
            </div>
          </div>
          <div className="post-image">
            <Link to={`/posts/${post.id}`} className="post-image-link">
              <img
                src={post.cover || Image.Empty}
                alt={post.title}
                onError={(e: any) => {
                  e.target['onerror'] = null;
                  e.target['src'] = Image.Empty;
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
