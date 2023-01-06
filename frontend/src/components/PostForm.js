import { Formik, Field } from 'formik';

const PostForm = () => {
    const initialValues = {
        text: ''
    };
    const validate = (values) => {
        const errors = {};
        if(values.text === '') errors.text = 'Text is required';
        return errors;
    }

    return (
        <>
            <Formik initialValues={initialValues} validate={validate} >
                {(values) => (
                <div className='bg-dark p-2 border-2 border-gray-600 w-256 rounded-md flex items-center'>
                    <form onSubmit={values.handleSubmit} className='bg-gray-600 h-7 w-256 rounded-md'>
                            <Field type='text' name='text' placeholder='Create post' className='bg-gray-600 px-2 w-11/12 h-6 focus:outline-none text-white rounded-md'></Field>
                        <button type='submit' className='text-white'>Post</button>
                    </form>
                    {values.errors ? (<div className='text-white mx-3'>{values.errors.text}</div>) : null}

                </div>
                )}
            </Formik>
        </>
    )
};

export default PostForm;