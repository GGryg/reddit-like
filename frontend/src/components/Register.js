import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { useAddUserMutation } from '../reducers/userApiSlice';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
        .test('Unique Email', 'Email already in use', (value) => {
            return new Promise((res, rej) => {
                axios.get(`http://localhost:4000/api/users/?filter[email]=${value}`)
                    .then((r) => {
                        if(r.data.length === 0)
                            res(true);
                        else
                            res(false);
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
                axios.get(`http://localhost:4000/api/users/?filter[username]=${value}`)
                    .then((r) => {
                        if(r.data.length === 0)
                            res(true);
                        else
                            res(false);
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

const Register = () => {
    const [ addUser ] = useAddUserMutation();
    const initialValues = {
        email: '',
        username: '',
        password: '',
        password2: '',
    };

    const handleSubmit = (values, actions) => {
        const newUser = {
            email: values.email,
            username: values.username,
            password: values.password,
        };
        addUser(newUser);
        actions.resetForm();
    };

    return (
        <div className='bg-dark h-screen flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4 font-semibold'>Register</h2>
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
                        <button type='submit' className='py-1 px-4 text-white font-semibold mx-7 bg-button-orange rounded-2xl'>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};



export default Register;