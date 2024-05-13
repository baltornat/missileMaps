import React, { useState, useEffect } from 'react';
import { useMapContext, Marker } from 'react-simple-maps';
import { COLOR_PALETTE, DESTINATION } from '../../constants/constants.js';
import { Trajectory, StartingPoint, Radius } from './RocketStyles.js';

function getColor(signature) {
    if (signature === 'Firewall Drop') {
        return COLOR_PALETTE.RED;
    } else if (signature === 'Firewall Allow') {
        return COLOR_PALETTE.GREEN;
    } else {
        return COLOR_PALETTE.YELLOW;
    }
}

function getSize(rocketsByCity) {
    if (rocketsByCity < 11) {
        return 1;
    } else if (rocketsByCity > 10 && rocketsByCity < 21) {
        return 1.5;
    } else if (rocketsByCity > 20 && rocketsByCity < 51) {
        return 2;
    } else if (rocketsByCity > 50 && rocketsByCity < 101) {
        return 2.5;
    } else if (rocketsByCity > 100 && rocketsByCity < 501) {
        return 3;
    } else if (rocketsByCity > 500 && rocketsByCity < 1001) {
        return 3.5;
    } else {
        return 4;
    }
}

const Rocket = ({ randomDelay, from, signature, rocketsByCity }) => {
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        let delayedStart;

        const startAnimation = () => {
            setAnimationStarted(true);
        };
        delayedStart = setTimeout(startAnimation, randomDelay);
        return () => clearTimeout(delayedStart);
    }, []);

    useEffect(() => {
        let timeout;

        const endAnimation = () => {
            setAnimationStarted(false);
        };
        if (animationStarted) {
            timeout = setTimeout(endAnimation, 4700);
        }
        return () => clearTimeout(timeout);
    }, [animationStarted]);

    const { path } = useMapContext();
    const rocketColor = getColor(signature);
    const rocketSize = getSize(rocketsByCity);

    if (!animationStarted) {
        return null;
    } else {
        return (
            <g key={Math.random() * 100000}>
                <Trajectory
                    id={randomDelay}
                    stroke={rocketColor}
                    d={path({
                        type: 'LineString',
                        coordinates: [from, DESTINATION],
                    })}
                    pathLength="100"
                    strokeWidth={rocketSize}
                />
                <Marker coordinates={from}>
                    <StartingPoint fill={rocketColor} r={rocketSize} pulse={rocketSize + 1} />
                    {rocketsByCity > 100 ? (
                        <Radius stroke={rocketColor} r={rocketSize + 3} pulse={rocketSize + 4} />
                    ) : null}
                </Marker>
            </g>
        );
    }
};

export default Rocket;