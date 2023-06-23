import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RecommendList from './RecommendList';
import { checkUserId } from '../../../shared/common/checkUserId';
import Image from '../../../../assets/images';
import SekeletonRecommendPost from '../../../shared/components/partials/SekeletonRecommendPost';
import SekeletonUserSidebar from '../../../shared/components/partials/SekeletonUserSidebar';
import ButtonFollow from './ButtonFollow';
import { UserService } from '../../../core/serivces/user.service';

const userService = new UserService();
const PostSideBar = (post: any) => {
  const { t } = useTranslation();
  const [postsRecommend, setPostsRecommend] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);
  const [authorInfo, setAuthorInfo] = useState<any>({});

  const getPostsRecommend = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      userService
        .getUserPosts(post.post.user?.id)
        .then((res: any) => {
          setIsRequestingAPI(false);
          setLoading(false); 
          if (res.Posts.length) {
            setPostsRecommend([...res.Posts.slice(-5)]);
          }
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
        });
    }
  };

  const getUserInfo = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      userService
        .getUserInfo(post.post.user?.id)
        .then((res: any) => {
          setIsRequestingAPI(false);
          setAuthorInfo(res);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
        });
    }
  };

  useEffect(() => {
    getPostsRecommend();
    if (post.post?.userId) {
      getUserInfo();
    }
  }, []);

  return (
    <div className="article-sidebar">
      {loading ? (
        <SekeletonUserSidebar />
      ) : (
        <div className="author-sidebar">
          <Link
            to={
              checkUserId(post.post.userId)
                ? `/profile/me`
                : `/profile/${post.post.userId}`
            }
            className="author-info"
          >
            <img
              className="author-sidebar-image"
              src={authorInfo?.picture || Image.Avatar}
              alt={authorInfo?.displayName}
              onError={(e: any) => {
                e.target['onerror'] = null;
                e.target['src'] = Image.Avatar;
              }}
            />
            <h4 className="author-info-name">{authorInfo?.displayName}</h4>
          </Link>
          <span className="author-follower">
            {authorInfo.followers} {t('common.profile.follower')}
          </span>
          {!checkUserId(post.post?.userId) && (
            <ButtonFollow
              id={post.post?.user?.id}
              authorInfo={authorInfo}
              setAuthorInfo={setAuthorInfo}
            />
          )}
        </div>
      )}
      <div className="article-recommend">
        <h3 className="recommend-title">{ t('home.post.post_diff')}</h3>
        {loading ? (
          <SekeletonRecommendPost />
        ) : (
          <RecommendList data={postsRecommend} />
        )}
      </div>
    </div>
  );
};

export default PostSideBar;
