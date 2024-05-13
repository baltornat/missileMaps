import styled from 'styled-components';

const StyledMapContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
`;

const StyledMissileMapName = styled.div`
    position: absolute;
    top: 4%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
`;

const Logo = styled.div`
    position: fixed;
    top: 5%;
    right: 2%;
    z-index: 1;
`;

export { StyledMapContainer, StyledMissileMapName, Logo };
