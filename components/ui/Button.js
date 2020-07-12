import styled from '@emotion/styled';

const Button = styled.a`
    font-weight: 700;
    display: block;
    margin: 2rem auto;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'White' : '#000'};
    &:hover {
        cursor: pointer;
    }
    &:last-of-type {
        margin-right: 0;
    }
`;

export default Button;