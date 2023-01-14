import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { registerUser, checkEmail, checkUsername } from '../actions/UsersActions';

const Register = ({registerUser, checkEmail}) => {
    const initialValues = {
        email: '',
        username: '',
        password: '',
        password2: '',
    };

    const validate = (values) => {
        const errors = {};
        if(values.email === '') errors.email = 'Email is required';
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email';
        else{
            const check = checkEmail(values.email);
            console.log(check);
            if(check !== null) errors.email = 'Email already in use'
        }
        if(values.username === '') errors.username = 'Username is required';
        else{
            const check = checkUsername(values.username);
            if(check !== null) errors.username = 'Username already in use'
        }
       if(values.password === '') errors.password = 'Password is required';
       else if(!/^[a-zA-Z0-9_]{6,}$/i.test(values.password)) errors.password = 'Password needs to be at least 6 characters and only letters, numbers or _';
       if(values.password2 !== values.password) errors.password2 = "Passwords aren't identical";
       return errors;
    };

    const handleSubmit = (values, actions) => {
        const newUser = {
            id: v4(),
            email: values.email,
            username: values.username,
            password: values.password,
        };
        registerUser(newUser);
        actions.resetForm();
    };

    return (
        <div className='bg-dark flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Register</h2>
            <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validate={validate} onSubmit={handleSubmit}>
                {(values) => (
                    <form onSubmit={values.handleSubmit} className='flex flex-col items-center'>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Email
                            </label><br />
                            <Field type='text' name='email' />
                            {values.errors.email ? (<div className='text-red-400'>{values.errors.email}</div>) : null}
                        </div>
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
                            {values.errors.password ? (<div className='text-red-400 word-all w-40'>{values.errors.password}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Repeat password
                            </label><br />
                            <Field type='password' name='password2' />
                            {values.errors.password2 ? (<div className='text-red-400'>{values.errors.password2}</div>) : null}
                        </div>
                        <button type='submit' className='bg-gray-700 text-gray-300 my-4 px-3 py-1 rounded-lg'>Register</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors,
});

const mapDispatchToProps = {
    registerUser,
    checkEmail,
    checkUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);