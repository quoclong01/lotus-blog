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
import { ChatService } from '../../../core/serivces/chat.service';
import { toast } from 'react-toastify';
import { parseJwt } from '../../../core/helpers/parseJwt';
import { getData } from '../../../core/helpers/localstorage';
import { useNavigate } from 'react-router-dom';

const chatService = new ChatService();
const userService = new UserService();
const PostSideBar = (post: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
            const data = res.Posts.filter((item: any) => item.id !== post.post.id);
            setPostsRecommend([...data.slice(-5)]);
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

  const handleChat = async () => {
    const token = getData('token', '');
    let userId: any;
    if (token) {
      userId = parseJwt(token).userId;
    }
    const data = {
      senderId: userId.toString(),
      receiverId: post?.post?.user?.id.toString(),
    };
    try {
      chatService
        .createChat(data)
        .then((res) => {
          if (res) {
            navigate('/chat');
          }
        })
        .catch((error: any) => {
          toast.error('Khong the nhan tin');
        });
    } catch (error: any) {
      toast.error('Khong the nhan tin');
    }
  };

  useEffect(() => {
    getPostsRecommend();
    if (post.post?.userId) {
      getUserInfo();
    }
  }, []);

  return (
    <div className='article-sidebar'>
      {loading ? (
        <SekeletonUserSidebar />
      ) : (
        <div className='author-sidebar'>
          <div className='author-info'>
            <img
              className='author-sidebar-image'
              src={authorInfo?.picture || Image.Avatar}
              alt={authorInfo?.displayName}
              onError={(e: any) => {
                e.target['onerror'] = null;
                e.target['src'] = Image.Avatar;
              }}
            />
            <h4 className='author-info-name'>{authorInfo?.displayName}</h4>
            <div className='author-profile'>
              <div className='author-profile-header'>
                <div className='author-profile-image'>
                  <img
                    src={authorInfo?.picture || Image.Avatar}
                    alt={authorInfo?.displayName}
                    onError={(e: any) => {
                      e.target['onerror'] = null;
                      e.target['src'] = Image.Avatar;
                    }}
                  />
                </div>
                <h5 className='author-profile-email'>{authorInfo?.email}</h5>
              </div>
              <div className='author-profile-bottom'>
                <div className='author-profile-phone'>
                  <i className='bx bx-phone'></i>
                  <p>{authorInfo?.phone}</p>
                </div>
                <div className='author-profile-action'>
                  <Link
                    to={
                      checkUserId(post.post.userId)
                        ? `/profile/me`
                        : `/profile/${post.post.userId}`
                    }
                    className='author-profile-item'
                  >
                    <i className='bx bx-user'></i>
                    <p>Profile</p>
                  </Link>
                  <div className='author-profile-item' onClick={handleChat}>
                    <i className='bx bx-message-rounded-detail'></i>
                    <p>Messages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className='author-follower'>
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
      <div className='article-recommend'>
        <h3 className='recommend-title'>{t('home.post.post_diff')}</h3>
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
