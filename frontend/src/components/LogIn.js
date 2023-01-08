import { Formik, Field } from 'formik';

const LogIn = () => {
    const initialValues = {
        username: '',
        password: '',
    };

    const validate = (values) => {
        const errors = {};
        if(values.username === '') errors.username = 'Username is required';
        if(values.password === '') errors.password = 'Password is required';

        return errors;
    }

    return (
        <div className='bg-dark flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Log In</h2>
            <Formik initialValues={initialValues} validate={validate} >
                {(values) => (
                    <form onSubmit={values.handleSubmit} className='flex flex-col items-center'>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Username
                            </label><br />
                            <Field type='text' name='username' />
                            {values.errors.username ? (<div className='text-red-400'>{values.errors.username}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Password
                            </label><br />
                            <Field type='password' name='password' />
                            {values.errors.password ? (<div className='text-red-400'>{values.errors.password}</div>) : null}
                        </div>
                        <button className='bg-gray-700 text-gray-300 my-4 px-3 py-1 align-center'>Log In</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LogIn;