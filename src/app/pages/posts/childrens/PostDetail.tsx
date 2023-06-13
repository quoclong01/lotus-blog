import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostContent from '../partials/PostContent';
import PostComment from '../partials/PostComment';
import PostSideBar from '../partials/PostSideBar';
import SekeletonPostContent from '../../../shared/components/partials/SekeletonPostContent';
import SekeletonComment from '../../../shared/components/partials/SekeletonComment';
import { PostService } from '../../../core/serivces/post.service';
import SekeletonUserSidebar from '../../../shared/components/partials/SekeletonUserSidebar';

const postService = new PostService();
const PostDetail = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isRequestingAPI, setIsRequestingAPI] = useState(false);

  const { id } = useParams();

  const getPostById = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      postService
        .getPostsById({ id })
        .then((res: any) => {
          setIsRequestingAPI(false);
          setPost({ ...post, ...res });
          setLoading(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
          navigate('/error/not-found');
        });
    }
  };

  useEffect(() => {
    if (id) {
      getPostById();
    }
  }, [id]);

  return (
    <main className="articles-page">
      <section className="section section-article">
        <div className="container">
          <div className="article row">
            <div className="col-8">
              {loading ? <SekeletonPostContent /> : <PostContent post={post} />}
              {loading ? (
                <SekeletonComment />
              ) : (
                <PostComment setPost={setPost} />
              )}
            </div>
            <div className="col-4">
              {loading ? <SekeletonUserSidebar /> : <PostSideBar post={post} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostDetail;
