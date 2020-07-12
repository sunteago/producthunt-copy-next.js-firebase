import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout';
import { useRouter } from 'next/router';
import ProductsDetail from '../components/layouts/ProductsDetail';
import useProducts from '../hooks/useProducts';


const Search = () => {
    const router = useRouter();
    const { query: { q } } = router;
    const { products } = useProducts('created');

    const [result, setResult] = useState([]);

    useEffect(() => {
        const search = q.toLowerCase();
        const filter = products.filter(product => {
            return (
                product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)
            )
        });
        setResult(filter);
    }, [q, products])
    return (
        <Layout>
            <div className="product-listing">
                <div className="container">
                    <ul className="bg-white">
                        {result.map(product => (
                            <ProductsDetail
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Search;