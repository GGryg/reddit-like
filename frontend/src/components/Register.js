import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { registerUser } from '../actions/UsersActions';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
        .test('Unique Email', 'Email already in use', (value) => {
            return new Promise((res, rej) => {
                axios.get(`http://localhost:4000/users/email/${value}`)
                    .then((r) => {
                        res(!r.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        }),
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .test('Unique Username', 'Username already in use', (value) => {
            return new Promise((res, rej) => {
                axios.get(`http://localhost:4000/users/name/${value}`)
                    .then((r) => {
                        res(!r.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        }),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .required('Required'),
  });

const Register = ({registerUser}) => {
    const initialValues = {
        email: '',
        username: '',
        password: '',
        password2: '',
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
        <div className='bg-dark h-screen flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4'>Register</h2>
            <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
                {({ errors }) => (
                    <Form  className='flex flex-col items-center'>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Email
                            </label><br />
                            <Field name='email' />
                            {errors.email ? (<div className='text-red-400'>{errors.email}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Username
                            </label><br />
                            <Field type='text' name='username' />
                            {errors.username ? (<div className='text-red-400'>{errors.username}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Password
                            </label><br />
                            <Field type='password' name='password' />
                            {errors.password ? (<div className='text-red-400 word-all w-40'>{errors.password}</div>) : null}
                        </div>
                        <div className='my-4'>
                            <label className='text-gray-300 text-xl'>
                                Confirm password
                            </label><br />
                            <Field type='password' name='password2' />
                            {errors.password2 ? (<div className='text-red-400'>{errors.password2}</div>) : null}
                        </div>
                        <button type='submit' className='bg-gray-700 text-gray-300 my-4 px-3 py-1 rounded-lg'>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = {
    registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);