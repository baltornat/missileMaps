import React, { useState, useEffect } from 'react';
import { StyledMessage } from './AttackMessageStyles';
import { COLOR_PALETTE } from '../../constants/constants';

function getColor(signature) {
    if (signature === 'Firewall Drop') {
        return COLOR_PALETTE.RED;
    } else if (signature === 'Firewall Allow') {
        return COLOR_PALETTE.GREEN;
    } else {
        return COLOR_PALETTE.YELLOW;
    }
}

const AttackMessage = ({ data }) => {
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        let delayedStart;
        const startAnimation = () => {
            setAnimationStarted(true);
        };
        delayedStart = setTimeout(startAnimation, data.randomDelay + 1000);
        return () => clearTimeout(delayedStart);
    }, []);

    useEffect(() => {
        let timeout;
        const endAnimation = () => {
            setAnimationStarted(false);
        };
        if (animationStarted) {
            timeout = setTimeout(endAnimation, 1200);
        }
        return () => clearTimeout(timeout);
    }, [animationStarted]);

    const messageColor = getColor(data.signature);

    if (!animationStarted) {
        return null;
    } else {
        return (
            <StyledMessage
                key={data.randomDelay}
                x="50%"
                y="30%"
                textAnchor="middle"
                fill={messageColor}
            >
                From: {data.city} - {data.signature}
            </StyledMessage>
        );
    }
};

export default AttackMessage;
