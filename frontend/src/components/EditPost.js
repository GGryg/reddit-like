import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';


const EditPost = () => {

    const { postId, topic } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useLayoutEffect(() => {
        axios.get(`http://localhost:4000/api/posts/${postId}`)
            .then((data) => {
                setPost(data);
            });
    }, [post, postId])

    if(post === null) return <div>Loading</div> 

    const initialValues = {
        title: '',
        content: '',
        links: '',
        picture: '',
    };

    const postSchema = Yup.object().shape({
        title: Yup.string()
            .min(1, 'Too short')
            .max(200, 'Too long'),
        content: Yup.string(),
        links: Yup.string(),
    });

    const handleEdit = async (values) => {
        const editPost = {
            title: values.title,
            content: values.content,
            links: values.content,
            picture: values.picture,
        };
        let ePost = new FormData();
        if(values.title){
          ePost.append('title', editPost.title);  
        }
        if(values.content){
            ePost.append('content', editPost.content);
        }
        if(values.links){
            ePost.append('links', editPost.links);
        }
        if(values.picture){
            ePost.append('picture', editPost.picture);
        }
        console.log(ePost);
        if(editPost!=={}){
            try{
                await axios.put(`http://localhost:4000/api/posts/${postId}`, ePost, {withCredentials: true});
                navigate(`/t/${topic}/post/${postId}`);
            }
            catch(err){
                console.error(err);
            }
        }
    };

    return <div>
        <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={postSchema} onSubmit={handleEdit}>
            {({errors, setFieldValue}) => (
            <Form className='flex flex-col items-center'>
                <div className='my-4'>
                    <label className='text-gray-300 text-xl'>
                        Title
                    </label><br />
                    <Field name='title' className='w-[400px]'/>
                    {errors.title ? (<div className='text-red-400'>{errors.title}</div>) : null}
                </div>
                <div className='my-4'>
                    <label className='text-gray-300 tex t-xl'>
                        Content
                    </label><br />
                    <Field as='textarea' name='content' className='w-[600px] h-[300px]'/>
                    {errors.content ? (<div className='text-red-400'>{errors.content}</div>) : null}
                </div>
                <div className='my-4'>
                    <label className='text-gray-300 text-xl'>
                        Link
                    </label><br />
                    <Field type='text' name='links'/>
                    {errors.links ? (<div className='text-red-400'>{errors.links}</div>) : null}
                </div>
                <div className='my-4'>
                    <label className='text-gray-300 text-xl'>
                        Picture
                    </label><br />
                    <input type='file' name='picture' accept='image/*' onBlur={(e)=>setFieldValue("picture", e.target.files[0])} />
                </div>
                <button type='submit' className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Edit post</button>
            </Form>
            )}
        </Formik>
    </div>
};

export default EditPost;