import { Formik, Form, useField } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

import '../loginPage/LoginPage.css';
import './RegisterPage.css';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    );
};

const RegisterPage = () => {
    const [isRegisteredIn, setIsRegisteredIn] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    newPassword: values.newPassword
                }),
            });
            const data = await response.json();
            console.log('New User:', data);

            if (response.ok) {
                setIsRegisteredIn(true);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (isRegisteredIn) {
        return <Navigate to='/login' />
    }

    return (
        <div className='register-page'>
            <Formik
                initialValues={{
                    email: '',
                    firstname: '',
                    lastname: '',
                    newPassword: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Неправильный email адрес')
                        .required('Обязательное поле!'),
                    firstname: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!'),
                    lastname: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!'),
                    newPassword: Yup.string()
                        .required('No password provided.')
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                })}

                onSubmit={handleSubmit}
            >
                <Form className="form">
                    <h2>REGISTRATION</h2>
                    <MyTextInput
                        label='Email'
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='off'
                    />
                    <MyTextInput
                        label='Firstname'
                        id='firstname'
                        name='firstname'
                        type='text'
                        autoComplete='off'
                    />
                    <MyTextInput
                        label='Lastname'
                        id='lastname'
                        name='lastname'
                        type='text'
                        autoComplete='off'
                    />
                    <MyTextInput
                        label='Password'
                        id='newPassword'
                        name='newPassword'
                        type='password'
                        autoComplete='off'
                    />
                    <button type='submit'>Create an account</button>
                    <p className='alreadyRegistered'>Already have an account? <Link to='/login'>LOGIN</Link></p>
                </Form>
            </Formik>
        </div>
    );
}

export default RegisterPage;
