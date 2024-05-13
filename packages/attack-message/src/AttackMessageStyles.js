import styled, { keyframes } from 'styled-components';

const moveUp = keyframes`
    from {
        transform: translateY(50%);
    }
    to {
        transform: translateY(15%);
    }
`;

const StyledMessage = styled.text`
    pointer-events: none;
    font-size: 16px;
    font-family: 'Arial';
    transform: translateY(50%);
    animation: ${moveUp} 1.2s forwards;
    tspan {
        font-size: 13px;
        fill: #ffffff;
    }
`;

export { StyledMessage };
