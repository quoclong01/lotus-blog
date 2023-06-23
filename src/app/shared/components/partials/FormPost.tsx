/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { TagsInput } from 'react-tag-input-component';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SignaturesService } from './../../../core/serivces/signatures.service';
import { PostService } from './../../../core/serivces/post.service';
import { COVER_POST_IMAGE } from '../../constants/constant';
import Loading from './Loading';
import { checkUserId } from './../../common/checkUserId';
import { Button } from './Button';

const signaturesService = new SignaturesService();
const postService = new PostService();
const FormPost = () => {  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cover: COVER_POST_IMAGE,
      status: true,
      title: '',
      description: '',
      content: '',
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>(COVER_POST_IMAGE);
  const [tags, setTags] = useState<any>();
  const [isRequestingAPI, setIsRequestingAPI] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      getPostById();
    }
  }, [id]);


  const getPostById = () => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      setLoading(true);
      postService
        .getPostsById({ id })
        .then((res: any) => {
          setIsRequestingAPI(false);
          if (checkUserId(res.user?.id)) {
            setValue('cover', res?.cover);
            setValue('title', res?.title);
            setValue('description', res?.description);
            setValue('content', res?.content);
            setValue('status', res?.status === 'public' ? true : false);
            setSelectedImage(res?.cover);
            setTags(res?.tags);
          } else {
            navigate('/');
          }
          setLoading(false);
        })
        .catch((error) => {
          setIsRequestingAPI(false);
          setLoading(false);
          navigate('/');
        });
    }
  };

  const onSubmitForm = (data: any) => {
    const dataPost = { ...data };
    dataPost.status = data.status ? 'public' : 'private';
    if (tags?.length) {
      dataPost.tags = tags;
    }
    if (id) {
      updatePost(id, dataPost);
    } else {
      createPost(dataPost);
    }
  };

  const updatePost = (id: string, data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .updatePost(id, data)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast.success(t('message.update_post_success'));
          navigate(`/posts/${res.id}`);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast.error(t('message.error'));
        });
    }
  };

  const createPost = (data: any) => {
    if (!isRequestingAPI) {
      setIsRequestingAPI(true);
      postService
        .createPost(data)
        .then((res: any) => {
          setIsRequestingAPI(false);
          toast.success(t('message.create_post_success'));
          navigate(`/posts/${res.id}`);
        })
        .catch((error: any) => {
          setIsRequestingAPI(false);
          toast.error(t('message.error'));
        });
    }
  };

  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    const payload = {
      type_upload: 'cover-post',
      file_name: file.name,
      file_type: file.type,
    };
    try {
      signaturesService.getSignatures(payload).then(async (data: any) => {
        setValue('cover', data.url);
      });
    } catch (err) {
      toast.error(t('message.error'));
    }
    setSelectedImage(URL.createObjectURL(file));
  };

  if (loading && !location.state) return <Loading />;
  return (
    <>
      <h2 className="section-title txt-center">
        {id ? t('blog.edit_blog') : t('blog.create_blog')}
      </h2>
      <form className="form-post" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="form-post-group">
          <div className="form-post-image">
            <img src={selectedImage} alt="post cover" />
          </div>
          <div className="form-post-header">
            <div
              className={
                errors.cover
                  ? 'form-post-file form-post-error'
                  : 'form-post-file'
              }
            >
              <label htmlFor="cover">{t('blog.upload_image')}</label>
              <input
                {...register('cover')}
                onChange={handleChangeFile}
                type="file"
                id="cover"
                className="form-post-input"
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="form-post-status">
              <label htmlFor="status">
                {t('blog.public')}
                <input
                  {...register('status')}
                  type="checkbox"
                  id="status"
                  className="form-post-checkbox"
                />
                <span className="check"></span>
              </label>
            </div>
          </div>
          <div
            className={
              errors.title ? 'form-post-item form-post-error' : 'form-post-item'
            }
          >
            <label htmlFor="title">{t('blog.title')}</label>
            <input
              {...register('title', { required: true, minLength: 20 })}
              type="text"
              id="title"
              className="form-post-input"
            />
            {errors.title && (
              <span>{t('message.title_error')}</span>
            )}
          </div>
          <div
            className={
              errors.description
                ? 'form-post-item form-post-error'
                : 'form-post-item'
            }
          >
            <label htmlFor="description">{t('blog.description')}</label>
            <textarea
              {...register('description', { required: true, minLength: 50 })}
              id="description"
              className="form-post-input"
              rows={3}
            />
            {errors.description && (
              <span>{t('message.desc_error')}</span>
            )}
          </div>
          <div
            className={
              errors.content
                ? 'form-post-item form-post-error'
                : 'form-post-item'
            }
          >
            <label htmlFor="content">{t('blog.content')}</label>
            <Controller
              control={control}
              name="content"
              rules={{ required: true, minLength: 100 }}
              render={({ field: { onChange, value } }) => (
                <Editor
                  value={value}
                  onEditorChange={(newText: string) => onChange(newText)}
                  init={{
                    height: 400,
                    menubar: false,
                    content_css: 'http://localhost:3000/css/tinymce.css',
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help | image code',
                  }}
                />
              )}
            />
            {errors.content && (
              <span>{t('message.content_error')}</span>
            )}
          </div>
          <div className="form-post-item">
            <label htmlFor="tags">{t('blog.tags')}</label>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder={t('blog.enter_tags')}
            />
          </div>
          <div className="form-post-footer">
            <Button
              type="submit"
              classBtn="btn btn-primary form-post-btn"
              text={t('blog.submit')}
              isLoading={isRequestingAPI}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormPost;
