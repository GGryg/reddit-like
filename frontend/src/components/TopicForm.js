import axios from 'axios';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { createTopic } from '../actions/TopicsActions';
import { Formik, Field, Form } from 'formik';

const TopicForm = ({createTopic}) => {
    const initialValues = {
        topic: '',
        description: '',
    };

    const topicSchema = Yup.object().shape({
        topic: Yup.string()
            .min(2, 'Too short')
            .max(15, 'Too long')
            .required('required')
            .test('Unique topic', 'This topic already exists', (value) => {
                return new Promise((res, rej) => {
                    axios.get(`http://localhost:4000/topics/${value}`)
                        .then((t) => {
                            if(t.data !== null){
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
        desc: Yup.string()
            .min(2, 'Too short')
            .max(200, 'Too long')
            .required('required')
    });

    const handleSubmit = (values, actions) => {
        const newTopic = {
            topic: values.topic,
            desc: values.desc,
        };
        createTopic(newTopic);
        actions.resetForm();
    };

    return (
        <div className='bg-dark flex h-screen flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Create a topic</h2>
            <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={topicSchema} onSubmit={handleSubmit}>
                {({ errors }) => (
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
                            <Field name='desc' />
                            {errors.desc ? (<div className='text-red-400'>{errors.desc}</div>) : null}
                        </div>
                        <button type='submit' className='bg-gray-700 text-gray-300 my-4 px-3 py-1 rounded-lg'>Create a topic</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state: state,
});

const mapDispatchToProps = {
    createTopic,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);