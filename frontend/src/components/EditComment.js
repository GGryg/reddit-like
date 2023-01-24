import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';


const EditComment = () => {

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
        content: '',
        links: '',
    };

    const commentSchema = Yup.object().shape({
        content: Yup.string()
            .required('required'),
        links: Yup.string(),
    });

    const handleEdit = (values) => {
        const editComment = {
            content: values.content,
            links: values.content,
        };
        let eComment = new FormData();

        if(values.content){
            ePost.append('content', editPost.content);
        }
        if(values.links){
            ePost.append('links', editPost.links);
        }
        console.log(ePost);
        if(editComment!=={}){
            axios.put(`http://localhost:4000/api/comments/${commentId}`, eComment, {withCredentials: true});
            navigate(`/t/${topic}/post/${postId}`);
        }
    };

    return <div>
        <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={commentSchema} onSubmit={handleEdit}>
            {({errors}) => (
            <Form className='flex flex-col items-center'>
                <div className='my-4'>
                    <label className='text-gray-300 tex t-xl'>
                        Content
                    </label><br />
                    <Field as='textarea' name='content' className='w-[700px] h-[200px] p-2 rounded-lg bg-search-default text-cText-light'/>
                    {errors.content ? (<div className='text-red-400'>{errors.content}</div>) : null}
                </div>
                <div className='my-4'>
                    <label className='text-gray-300 text-xl'>
                        Link
                    </label><br />
                    <Field type='text' name='links'/>
                    {errors.links ? (<div className='text-red-400'>{errors.links}</div>) : null}
                </div>
                <button type='submit' className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Edit comment</button>
            </Form>
            )}
        </Formik>
    </div>
};

export default EditComment;