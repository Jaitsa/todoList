import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

import './LoginPage.css';
import '../registerPage/RegisterPage.css';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://demo2.z-bit.ee/users/get-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.email,
                    password: values.password
                }),
            });
            const data = await response.json();
            console.log('Response:', data);

            localStorage.setItem('access_token', data.access_token);

            if (response.ok) {
                setIsLoggedIn(true);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoggedIn) {
        return <Navigate to='/todo' />;
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Неправильный email адрес')
                    .required('Обязательное поле!'),
                password: Yup.string()
                    .min(2, 'Минимум 2 символа для заполнения')
                    .required('Обязательное поле!'),
            })}
            onSubmit={handleSubmit}
        >
            <Form className='form'>
                <h2>LOGIN</h2>
                <MyTextInput
                    label='Email'
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='off'
                />
                <MyTextInput
                    label='Password'
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='off'
                />
                <button type='submit'>Sign in</button>
                <p className='alreadyRegistered'>Don't have an account? <Link to="/">REGISTER</Link></p>
            </Form>
        </Formik>
    );
};

export default LoginPage;
