import { Formik, Field } from 'formik';

const Register = () => {
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
        if(values.username === '') errors.username = 'Username is required';
        /*
        *   Later add valitation for not repeating email and username
        */
       if(values.password === '') errors.password = 'Password is required';
       else if(!/^[A-Z0-9_]{6,}$/i.test(values.email)) errors.password = 'Password needs to be at least 6 characters and only letters, numbers and _ is allowed';
       if(values.password2 === values.password) errors.password2 = "Passwords aren't identical";
       return errors;
    }

    return (
        <div className='bg-dark flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Register</h2>
            <Formik initialValues={initialValues} validate={validate} >
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
                            {values.errors.password ? (<div className='text-red-400'>{values.errors.password}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Repeat password
                            </label><br />
                            <Field type='text' name='password2' />
                            {values.errors.password2 ? (<div className='text-red-400'>{values.errors.password2}</div>) : null}
                        </div>
                        <button type='submit' className='bg-gray-700 text-gray-300 my-4 px-3 py-1 rounded-lg'>Register</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Register;