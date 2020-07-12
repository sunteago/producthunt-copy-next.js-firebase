import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Head from "next/head";
import Footer from "./Footer";

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #e1e1e1;
            --orange: #da552f;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem; /* 16px */
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
          img {
            max-width: 100%;
          }
        `}
      />
      <Head>
        <title>Product Hunt, Firebase y Next.js</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap"
        />
        <link rel="stylesheet" href="/static/css/app.css" />
      </Head>

      <AppContainer>
        <Header />

        <main>{props.children}</main>
        <Footer />
      </AppContainer>
    </>
  );
};

export default Layout;
