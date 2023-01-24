import axios from 'axios';
import { Formik, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../reducers/authApiSlice';
import { setCurrentUser } from '../reducers/authSlice';

const LogIn = () => {
    const [ login ] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const handleSubmit = async (values, actions) => {
        try{
            const user = {
                username: values.username,
                password: values.password,
            };
            const { token } = await login(user).unwrap();
            localStorage.setItem('token', token);
            const current_user = await axios.get(`http://localhost:4000/api/users/?filter[username]=${user.username}`).then((ret) => {console.log(ret); return {id: ret.data[0]._id ,username: ret.data[0].username, role: ret.data[0].role, email: ret.data[0].email, avatar: ret.data[0].avatar, description: ret.data[0].description}});
            dispatch(setCurrentUser({user: current_user, isAuthenticated: true, token: token}));
            navigate('/t/home');
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div className='bg-dark h-screen flex flex-col items-center'>
            <h2 className='text-gray-300 text-3xl my-4 font-semibold'>Log In</h2>
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
                        <button type='submit' className='py-1 px-4 text-cText-gray font-semibold bg-button-light rounded-2xl'>Log In</button>
                        
                    </form>
                )}
            </Formik>
        </div>
    )
}



export default LogIn;