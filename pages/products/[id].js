import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { FirebaseContext } from '../../firebase/index';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';


const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;     
`


const Product = () => {
    //routing para obtener id actual;
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [queryDB, setQueryDB] = useState(true);

    const router = useRouter();
    const { query: { id } } = router;
    const { firebase, user } = useContext(FirebaseContext);


    useEffect(() => {
        let isCancelled = false;

        if (id && queryDB) {
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product = await queryProduct.get();

                if (!isCancelled) {
                    if (product.exists) {
                        setProduct(product.data());
                    } else {
                        setError(true);
                    }

                    setQueryDB(false);
                }
            };
            getProduct();
        }
        return () => {
            isCancelled = true;
        }
    }, [id, product])

    if (Object.keys(product).length === 0 && !error) return <h1>'loading...'</h1>;
    const { comments, created, description, company,
        name, url, imgUrl, votes, creator, votedBy } = product;

    const voteProduct = () => {
        if (!user) {
            return router.push('/login');
        }
        //obtener y sumar voto
        const newTotal = votes + 1;

        if (votedBy.includes(user.uid)) return;

        //guardar id del que voto

        const newDidVoted = [...votedBy, user.uid];
        //update db
        firebase.db.collection('products')
            .doc(id)
            .update({
                votes: newTotal,
                votedBy: newDidVoted
            });
        //update state

        setProduct({
            ...product,
            votes: newTotal
        })
        setQueryDB(true); //hay voto, por lo que se debe consultar a DB
    };

    const commentChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const isCreator = id => {
        if (creator.id === id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if (!user) {
            return router.push('/');
        }

        //extra info

        comment.userId = user.uid;
        comment.username = user.displayName;
        const newComments = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });
        setProduct({
            ...product,
            comments: newComments
        });
        setQueryDB(true);
    }

    const canDelete = () => {
        if (!user) return false;
        if (creator.id === user.uid) return true;
    }

    const deleteProduct = async () => {
        if (!user) {
            return router.push('/login');
        }
        if (creator.id !== user.uid) {
            return router.push('/');
        }
        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/');
        } catch (err) {
            console.log(err);
        }


    }

    return (
        <Layout>
            <>
                {error ? <Error404 /> : (
                    <div className="container">
                        <h1 css={css`
                         text-align: center;
                         margin-top: 5rem;
                 `}>{name}</h1>

                        <ProductContainer>
                            <div>
                                <p>Published {formatDistanceToNow(new Date(created))} ago</p>
                                <p>by {creator.name} from {company}</p>
                                <img src={imgUrl} />
                                <p>{description}</p>

                                {user && (
                                    <>
                                        <h2>Ask a question!</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Field>
                                                <input
                                                    type="text"
                                                    name="message"
                                                    onChange={commentChange}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type="submit"
                                                value="Add comment"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                 margin: 2rem 0;
                             `}>Commentss: </h2>
                                {comments.length === 0 ? 'There are no comments yet' : (
                                    <ul>
                                        {comments.map((comment, i) => (
                                            <li
                                                css={css`
                                                 border: 1px solid #e1e1e1;
                                                 padding: 2rem;
                                             `}
                                                key={i}
                                            >
                                                <p>{comment.message}</p>
                                                <p>Written by {''}

                                                    <span
                                                        css={css`
                                                         font-weight: bold;
                                                     `}
                                                    >{comment.username}</span></p>
                                                {isCreator(comment.userId) &&
                                                    <ProductCreator>Is the creator</ProductCreator>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <aside>
                                <Button
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visit URL</Button>
                                <div>
                                    <p css={css`
                                     text-align: center;
                                     margin-top: 5rem;
                                 `}>{votes} Votes</p>
                                    {user && (
                                        <Button
                                            onClick={voteProduct}
                                        >
                                            Vote
                                        </Button>
                                    )}
                                </div>
                            </aside>
                        </ProductContainer>
                        {canDelete() &&
                            <Button
                                onClick={deleteProduct}
                            >Delete Product</Button>
                        }
                    </div>

                )}

            </>
        </Layout>
    );
}

export default Product;