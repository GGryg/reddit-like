import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectAllTopics } from '../reducers/topicApiSlice';
import { useEffect } from 'react';
import { useAddCommentMutation } from '../reducers/commentsApiSlice';

const CommentForm = () => {
    const { topic, postId } = useParams();
    const navigate = useNavigate();
    const topics = useSelector(selectAllTopics)
    const findTopic = topics.find((t) => t.name === topic);

    useEffect(() => {
        if(!findTopic){
            navigate('/t/Home')
        }
    }, [findTopic, navigate]);

    const [ addComment ] = useAddCommentMutation();

    const initialValues = {
        content: '',
        links: '',
    };

    const commentSchema = Yup.object().shape({
        content: Yup.string()
            .min(1, 'Too short')
            .max(400, 'Too long')
            .required('required'),
        links: Yup.string(),
    });

    const handleSubmit = (values, actions) => {
        const newComment = {
            content: values.content,
            postId: postId,
        };
        if(values.links)
            newComment.links = values.links
        addComment(newComment);
        actions.resetForm();
    };

    return <div className='bg-dark border-2 p-2 border-dark-lighter w-[50rem] my-16 mx-[6rem] rounded-lg flex justify-center items-center'>
        <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={commentSchema} onSubmit={handleSubmit}>
            {({ errors }) => (
                <Form>
                    <div className='my-4'>
                        <Field as='textarea' name='content' placeholder="Comment" className='w-[700px] h-[200px] p-2 rounded-lg bg-search-default text-cText-light'/>
                        {errors.content ? (<div className='text-red-400'>{errors.content}</div>) : null}
                    </div>
                        <label className='text-gray-300 my-4 mx-4 text-xl'>
                            Link
                        </label>
                        <Field type='text' name='links'/>
                        {errors.links ? (<div className='text-red-400'>{errors.links}</div>) : null}
                    <button type='submit' className='py-1 px-4 text-cText-gray my-4 mx-4 font-semibold bg-button-light rounded-2xl'>Create a comment</button>
                </Form>
            )}
        </Formik></div>
};

export default CommentForm;