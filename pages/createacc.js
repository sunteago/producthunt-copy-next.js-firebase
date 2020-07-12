import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error} from '../components/ui/Form';

import firebase from '../firebase/index';

import useValidation from '../hooks/useValidation';
import createAccValidate from '../validation/createAccValidate';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: ''
}

const Createacc = () => {
    const [err, setErr] = useState(false);

    const { values, errors, handleSubmit, handleChange } =
    useValidation(INITIAL_STATE, createAccValidate, CreateAccount);

    const { username, email, password } = values;

    async function CreateAccount() {
        try {
            console.log(username);
            await firebase.register(username, email, password);
            Router.push('/');
        } catch(err) {
            setErr(err.message);
        }
    }




    return (
        <Layout>
            <h1
                css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
            >Create Account</h1>
            <Form
                onSubmit={handleSubmit}
            >
                <Field>
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Your name"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Field>
                {errors.username && <Error>{errors.username}</Error>}
                <Field>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Your email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Field>
                {errors.email && <Error>{errors.email}</Error>}

                <Field>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Field>
                {errors.password && <Error>{errors.password}</Error>}
                <InputSubmit
                    type="submit"
                    value="Create Account"
                />
                {err && <Error>{err}</Error>}
            </Form>
        </Layout>
    );
}

export default Createacc;