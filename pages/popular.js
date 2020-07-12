import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layouts/Layout';
import ProductsDetail from '../components/layouts/ProductsDetail';
import useProducts from '../hooks/useProducts';

const Popular = () => {

  const { products } = useProducts('votes');
  
  return (
    <Layout>
      <div className="product-listing">
        <div className="container">
          <ul className="bg-white">
            {products.map(product => (
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

export default Popular;