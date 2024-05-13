import styled, { keyframes } from 'styled-components';
import { RESET_CHOROPLETH_COUNTER } from '../../constants/constants';

const changeOpacity = (from, to) => keyframes`
  0% {
    opacity: ${from};
  }
  100% {
    opacity: ${to};
  }
`;

const resetOpacity = (from, to) => keyframes`
  0% {
    opacity: ${from};
  }
  75% {
    opacity: ${to};
  }
  95% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.1;
  }
`;

const ChoroplethPath = styled.path`
    pointer-events: none;
    animation: ${(props) =>
            props.from != props.to
                ? props.threshold === RESET_CHOROPLETH_COUNTER
                    ? resetOpacity(props.from, props.to)
                    : changeOpacity(props.from, props.to)
                : 'none'}
        ${(props) => props.dur / 1000}s linear forwards;
`;

export { ChoroplethPath };