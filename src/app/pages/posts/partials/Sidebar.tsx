import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecommendList from './RecommendList';
import { Tag } from '../../../shared/components/partials';
import Icon from '../../../../assets/icons/index';
import SekeletonRecommendPost from '../../../shared/components/partials/SekeletonRecommendPost';
import SekeletonTag from '../../../shared/components/partials/SekeletonTag';
import { PostService } from '../../../core/serivces/post.service';

const postService = new PostService();
export const Sidebar = () => {
  const [postsRecommend, setPostsRecommend] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState<any>([]);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);

  const getPostsRecommend = async () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      await postService
        .getPostsRecommend({ page: 1, size: 3 })
        .then((res: any) => {
          setIsRequestingAPI(false);
          setPostsRecommend([...postsRecommend, ...res.data]);
          setLoading(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
        });
    }
  };

  const getTags = async () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      await postService
        .getTags({ size: 10 })
        .then((res: any) => {
          setIsRequestingAPI(false);
          setTags([...res.data]);
          setLoading(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getPostsRecommend();
    getTags();
  }, []);

  return (
    <aside className="sidebar">
      <div className="section-tag">
        <h3 className="sidebar-title">DISCOVER MORE OF WHAT MATTERS TO YOU</h3>
        <ul className="tag-list">
          {/* Because there is no api for tag list
              so I use loading state of recommend list to make UI attractively */}
          {loading ? (
            <SekeletonTag />
          ) : (
            <>
              {
                tags.map((name: string, index: number) => 
                  <Tag key={index} name={name} />
                )
              }
            </>
          )}
        </ul>
      </div>
      <div className="article-recommend sidebar-more">
        <h3 className="recommend-title">MORE FROM LOTUS</h3>
        {loading ? (
          <SekeletonRecommendPost />
        ) : (
          <RecommendList data={postsRecommend} />
        )}
      </div>
      <div className="section-social">
        <h3 className="sidebar-title">SOCIAL MEDIA</h3>
        <ul className="social-list">
          <li className="social-item">
            <Link className="social-link" to="/">
              <img src={Icon.Facebook} alt="icon facebook" />
            </Link>
          </li>
          <li className="social-item">
            <Link className="social-link" to="/">
              <img src={Icon.Instagram} alt="icon instagram" />
            </Link>
          </li>
          <li className="social-item">
            <Link className="social-link" to="/">
              <img src={Icon.Youtube} alt="icon youtube" />
            </Link>
          </li>
          <li className="social-item">
            <Link className="social-link" to="/">
              <img src={Icon.Twitter} alt="icon twitter" />
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
