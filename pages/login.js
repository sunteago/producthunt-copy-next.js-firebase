import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error} from '../components/ui/Form';

import firebase from '../firebase/index';

import useValidation from '../hooks/useValidation';
import loginValidate from '../validation/loginValidate';


const INITIAL_STATE = {
  email: '',
  password: ''
}


const Login = () => {
  const [err, setErr] = useState(false);

async function login() {
    try {
        await firebase.login(email,password);
        Router.push('/');
    } catch (err) {
        setErr(err.message)
    }
  }
  const { values, errors, submitForm, handleSubmit, handleChange } =
      useValidation(INITIAL_STATE, loginValidate, login);

  const { username, email, password } = values;



  return (
      <Layout>
          <h1
              css={css`
                      text-align: center;
                      margin-top: 5rem;
                  `}
          >Log in</h1>
          <Form
              onSubmit={handleSubmit}
          >
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
                  value="Log in"
              />
              {err && <Error>{err}</Error>}
          </Form>
      </Layout>
  );
}

export default Login;