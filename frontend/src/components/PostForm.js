import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const PostForm = () => {
    const { topic } = useParams();
    const navigate = useNavigate();

    if(topic === 'Home'){
        navigate('/t/Home');
    }

    const initialValues = {
        title: '',
        content: '',
        links: '',
        picture: '',
    };

    const postSchema = Yup.object().shape({
        title: Yup.string()
            .min(1, 'Too short')
            .max(200, 'Too long')
            .required('required'),
        content: Yup.string(),
        links: Yup.string(),
    });

    const handleSubmit = async (values, actions) => {
        const newPost = {
            title: values.title,
            topic: topic,
        }
        if(values.content){
            newPost.content = values.content;
        }
        if(values.links)
            newPost.links = values.links
        if(values.picture)
            newPost.picture = values.picture;
        let test = new FormData();
        test.append('title', newPost.title);
        test.append('topic', newPost.topic);
        if(newPost.links) test.append('links', newPost.links);
        if(newPost.picture) test.append('picture', newPost.picture);
        try{

            const a = await axios.post('http://localhost:4000/api/posts/', test, {withCredentials: true});
            navigate(`/topic${topic}/post/${a._id}`)
        }
        catch(err){
            console.error(err);
        }
    };

    return <div className='bg-dark border-2 p-2 border-dark-lighter w-256 my-4 mx-40 rounded-lg flex justify-center items-center'>
        <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={postSchema} onSubmit={handleSubmit}>
            {({ errors, setFieldValue }) => (
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
                    <button type='submit' className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Create a post</button>
                </Form>
            )}
        </Formik></div>
};


export default PostForm;