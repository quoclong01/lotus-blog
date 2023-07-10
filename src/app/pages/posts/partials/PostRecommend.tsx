import React from 'react';
import { useState, useEffect } from 'react';
import { PostService } from '../../../core/serivces/post.service';
import Image from '../../../../assets/images';
import { formatDate } from '../../../shared/common/formatDate';
import SekeletonPost from '../../../shared/components/partials/SekeletonPost';
import { useTranslation } from 'react-i18next';

const postService = new PostService();
const PostRecommend = ({postId}) => {
  const [postsRecommend, setPostsRecommend] = useState<any>([]);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const { t } = useTranslation();
  const getPostsRecommend = async () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      await postService
        .getPostsRecommend({ page: 1, size: 8 })
        .then((res: any) => {
          setIsRequestingAPI(false);
          if (res.data.length) {
            const data = res.data.filter((post: any) => post.id !== +postId)
            setPostsRecommend([...data]);
          }
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
        });
    }
  };

  useEffect(() => {
    getPostsRecommend();
  }, []);
  
  return isRequestingAPI ? <SekeletonPost /> : postsRecommend.length && (
    <section className='post-recommend'>
      <div className="container">
        <h3 className="post-recommend-heading">
          {t('home.post.post_recommend')}
        </h3>
        <div className="post-recommend-wrapper">
          <ul className="row post-recommend-list">
            {
              postsRecommend.map((post: any) => (
                <li className="col-3 post-recommend-item" key={post.id}>
                  <a href={`/posts/${post.id}`} className="post-recommend-image">
                    <img
                      src={post?.cover || Image.Empty}
                      alt={post?.title}
                      onError={(e: any) => {
                        e.target['onerror'] = null;
                        e.target['src'] = Image.Empty;
                      }}
                    />
                  </a>
                  <div className="post-recommend-content">
                    <a href={`/profile/${post?.userId}`} className="post-recommend-author">
                      <div className="post-recommend-author-image">
                        <img
                          src={post?.user?.picture || Image.Avatar}
                          alt={post.user?.displayName}
                          onError={(e: any) => {
                            e.target['onerror'] = null;
                            e.target['src'] = Image.Avatar;
                          }}
                        />
                      </div>
                      <h5 className="post-recommend-author-name">
                        {post?.user?.displayName}
                      </h5>
                    </a>
                    <h4 className="post-recommend-title">
                      <a href={`/posts/${post.id}`}>
                        {post?.title}
                      </a>
                    </h4>
                    <p className="post-recommend-desc">
                      {post?.description}
                    </p>
                    <span className="post-recommend-date">
                      {formatDate(post?.createdAt)}
                    </span>
                    <div className="post-meta">
                      <div className="post-meta-info post-like">
                        <i className="fa-regular fa-thumbs-up"></i>
                        <span className="post-like-number">{post?.likes || 0}</span>
                      </div>
                      <div className="post-meta-info post-comment">
                        <i className="fa-regular fa-comment"></i>
                        <span className="post-comment-number">
                          {post?.comments || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PostRecommend;
