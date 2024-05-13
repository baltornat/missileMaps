import styled, { keyframes } from 'styled-components';

const drawRocketTrail = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const removeRocketTrail = keyframes`
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 100;
  }
`;

const startPulse = (r, pulse) => keyframes`
  0% {
    r: ${r};
  }
  50% {
    r: ${pulse};
  }
  100% {
    r: ${r};
  }
`;

const Trajectory = styled.path`
    pointer-events: none;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    fill: none;
    animation: ${drawRocketTrail} 1.2s linear forwards 1s,
        ${removeRocketTrail} 1.2s linear forwards 2.5s;
`;

const StartingPoint = styled.circle`
    pointer-events: none;
    animation: ${(props) => startPulse(props.r, props.pulse)} 1s infinite;
`;

const Radius = styled.circle`
    pointer-events: none;
    fill: none;
    stroke-width: 1.5;
    animation: ${(props) => startPulse(props.r, props.pulse)} 1s infinite;
`;

export { Trajectory, StartingPoint, Radius };