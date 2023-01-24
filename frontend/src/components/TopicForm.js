import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../reducers/authSlice';

const TopicForm = () => {

    const navigate = useNavigate();

    const auth = useSelector(selectCurrentUser);
    if(auth.user.role !== 'admin'){
        navigate('/t/Home');
    }

    const initialValues = {
        topic: '',
        description: '',
        picture: '',
    };

    const topicSchema = Yup.object().shape({
        topic: Yup.string()
            .min(2, 'Too short')
            .max(15, 'Too long')
            .required('required')
            .test('Unique topic', 'This topic already exists', (value) => {
                return new Promise((res, rej) => {
                    axios.get(`http://localhost:4000/api/topics/?filter[topic]=${value}`)
                        .then((t) => {
                            if(t.data.length !== 0){
                                res(false);
                            }
                            else{
                                res(true);
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
            }),
        description: Yup.string()
            .min(2, 'Too short')
            .max(200, 'Too long')
            .required('required')
    });

    const handleSubmit = async (values, actions) => {
        const newTopic = {
            name: values.topic,
            description: values.description,
        };
        if(values.picture)
            newTopic.picture = values.picture;
        let data = new FormData();
        data.append('name', newTopic.topic);
        data.append('description', newTopic.description);
        if(newTopic.picture) data.append('picture', newTopic.picture);
        try{
            await axios.post('http://localhost:4000/api/topics', data, {withCredentials: true});
            navigate(`/t/${newTopic.name}`)
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div className='bg-dark flex h-screen flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4 font-semibold'>Create a topic</h2>
            <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={topicSchema} onSubmit={handleSubmit}>
                {({ errors, setFieldValue }) => (
                    <Form  className='flex flex-col items-center'>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Topic
                            </label><br />
                            <Field name='topic' />
                            {errors.topic ? (<div className='text-red-400'>{errors.topic}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Description
                            </label><br />
                            <Field name='description' />
                            {errors.desc ? (<div className='text-red-400'>{errors.desc}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Picture
                            </label><br />
                            <input type='file' name='picture' accept='image/*' onBlur={(e)=>setFieldValue("picture", e.target.files[0])} />
                        </div>
                        <button type='submit' className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Create a topic</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TopicForm;