import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import Error404 from '../components/layouts/404';

import { FirebaseContext } from '../firebase/index';

import useValidation from '../hooks/useValidation';
import createProdValidate from '../validation/createProdValidate';

const INITIAL_STATE = {
    name: '',
    company: '',
    // image: '',
    url: '',
    description: ''
}

const NewProduct = () => {
    //state de las img

    const [imgName, setImageName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState('');


    const [err, setErr] = useState(false);

    //hook de router para redireccionar
    const router = useRouter();

    const createProduct = async () => {
        if (!user) {
            return router.push('/login');
        }
        //crear objeto de nuevo producto
        const product = {
            name,
            company,
            url,
            imgUrl,
            description,
            votes: 0,
            comments: [],
            created: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName
            },
            votedBy: []
        }

        //insertar en db
        firebase.db.collection('products').add(product);
        return router.push('/');
    }

    const { values, errors, handleSubmit, handleChange } =
        useValidation(INITIAL_STATE, createProdValidate, createProduct);

    const { name, company, image, url, description } = values;

    const { user, firebase } = useContext(FirebaseContext);

    //si el usuario no esta autenticado llevar a home


    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    };

    const handleProgress = progress => setProgress({ progress });

    const handleUploadError = error => {
        setUploading(error);
        console.log(error);
    };

    const handleUploadSuccess = name => {
        setProgress(100);
        setUploading(false);
        setImageName(name);
        firebase
            .storage
            .ref("products")
            .child(name)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setImgUrl(url);
            });
    }


    return (
        <Layout>
            {!user ? <Error404 /> : (
                <>
                    <h1
                        css={css`
                      text-align: center;
                      margin-top: 5rem;
                  `}
                    >New Product</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <legend>Info: </legend>

                            <Field>
                                <label htmlFor="name">Product name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Product name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </Field>
                            {errors.name && <Error>{errors.name}</Error>}

                            <Field>
                                <label htmlFor="company">Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Company name"
                                    name="company"
                                    value={company}
                                    onChange={handleChange}
                                />
                            </Field>
                            {errors.company && <Error>{errors.company}</Error>}

                            <Field>
                                <label htmlFor="image">Image</label>
                                <FileUploader
                                    accept="images/*"
                                    id="image"
                                    name="image"
                                    value={image}
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("products")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Field>

                            <Field>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="url"
                                    placeholer="Product URL"
                                    id="url"
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                />
                            </Field>
                            {errors.url && <Error>{errors.url}</Error>}
                        </fieldset>
                        <fieldset>
                            <legend>About your product</legend>
                            <Field>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                />
                            </Field>
                            {errors.description && <Error>{errors.description}</Error>}

                        </fieldset>

                        <InputSubmit
                            type="submit"
                            value="Create Product"
                        />
                        {err && <Error>{err}</Error>}
                    </Form>
                </>
            )}

        </Layout>
    );
}
export default NewProduct;