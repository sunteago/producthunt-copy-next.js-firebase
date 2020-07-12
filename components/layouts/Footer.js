import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Search from '../ui/Search';
import Navigation from './Navigation';

const FooterContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    justify-content: center
    @media (min-width: 768px) {
        display: flex;
        justify-content: right;
    }
`;


const Footer = () => {

    return (
        <footer
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            `}
        >
            <FooterContainer>
                <div
                    css={css`
                        display: flex;
                        justify-content: flex-end;
                    `}
                >
                   Developed by Santiago Vallejo - 2020
                </div>

            </FooterContainer>
        </footer>
    );
}

export default Footer;