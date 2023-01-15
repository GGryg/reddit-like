import { Formik, Field } from 'formik';
import { connect } from 'react-redux';

import { loginUser } from './../actions/UsersActions';

const LogIn = ({loginUser, errorsA}) => {
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
    const handleSubmit = (values, actions) => {
        const user = {
            username: values.username,
            password: values.password,
        };
        loginUser(user);
        actions.resetForm();
    }

    return (
        <div className='bg-dark h-screen flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Log In</h2>
            <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validate={validate} onSubmit={handleSubmit}>
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
                        <button type='submit' className='bg-gray-700 text-gray-300 my-4 px-3 py-1 rounded-lg'>Log In</button>
                        
                    </form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = state => ({
    errorsA: state.errors
});

const mapDispatchToProps = {
    loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);