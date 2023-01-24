import * as Yup from 'yup';
import { Formik, Field, Form } from "formik";
import { useLayoutEffect, useState } from "react";
import axios from "axios";

const Setting = () => {
    const initialValues = {
        email: '',
        password: '',
        password2: '',
        description: '',
        avatar: {},
    };

    const userSchema = Yup.object().shape({
        email: Yup.string()
        .email('Invalid email')
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
    description: Yup.string()
        .max(300, 'Too long!'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
    });

    const handleEdit = async (values, actions) => {
        const editUser = {};
        let eUser = new FormData();
        if(values.email) {
            eUser.append('email', values.email);
            editUser.email = values.email;
        }
        if(values.description){
            eUser.append('description', values.description);
            editUser.description = values.description;
        }
        if(values.password){
            eUser.append('password', values.password);
            editUser.password = values.password;
        }
        if(values.avatar){
            eUser.append('avatar', values.avatar);
            editUser.avatar = values.avatar;
        }
        if(editUser !== {}){
            try{
                await axios.put(`http://localhost:4000/api/users/current`, eUser, {withCredentials: true});
            }
            catch(err){
                console.error(err);
            }
        }
    }

    const [loading, setLoading]= useState(true);
    const [user, setUser] = useState(null);
    useLayoutEffect(() => {
        axios.get(`http://localhost:4000/api/users/current`, {withCredentials: true})
            .then((data) => {
                setUser(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            })
        }, [])

    if(loading) return <div>Loading</div>
    return <div className="bg-dark my-10 mx-20 text-cText-light p-4 rounded-lg">Profile/Settings
    <div className="flex gap-10">
        <div>
            <div>
            <p className="text-center">Avatar</p>
            <img src={`http://localhost:4000/${user.avatar}`} alt='avatar' className='w-[20rem] h-[20rem]' />
            </div>
            <div>
                <p>Info:</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>description: {user.description}</p>
            </div>
        </div>
        <div>
            <p>Change Info</p>
            <div>
                <Formik initialValues={initialValues} validateOnBlur={true} validateOnChange={false} validationSchema={userSchema} onSubmit={handleEdit}>
                    {({errors, setFieldValue}) => (
                        <Form  className='flex flex-row gap-10'>
                            <div className="flex flex-col items-center">
                            <div className='my-4'>
                                <label className='text-gray-300 text-xl'>
                                    Email
                                </label><br />
                                <Field className='text-black' name='email' />
                                {errors.email ? (<div className='text-red-400'>{errors.email}</div>) : null}
                            </div>
                            <div className='my-4'>
                                <label className='text-gray-300 text-xl'>
                                    Description
                                </label><br />
                                <Field name='description' className='text-black' />
                                {errors.description ? (<div className='text-red-400'>{errors.description}</div>) : null}
                            </div>
                            <div className='my-4'>
                                <label className='text-gray-300 text-xl'>
                                    Password
                                </label><br />
                                <Field type='password' name='password' className='text-black' />
                                {errors.password ? (<div className='text-red-400 word-all w-40'>{errors.password}</div>) : null}
                            </div>
                            <div className='my-4'>
                                <label className='text-gray-300 text-xl'>
                                    Confirm password
                                </label><br />
                                <Field type='password' name='password2' className='text-black' />
                                {errors.password2 ? (<div className='text-red-400'>{errors.password2}</div>) : null}
                            </div>
                            <button type='submit' className='py-1 px-4 text-white font-semibold mx-7 bg-button-orange rounded-2xl'>Change</button>
                            </div>
                            <div>
                                <label className='text-gray-300 text-xl'>Change avatar</label> <br />
                                <input type='file' name='avatar' accept='image/*' onBlur={(e)=>setFieldValue("avatar", e.target.files[0])} />
                            </div>
                            
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
    </div>
};

export default Setting;