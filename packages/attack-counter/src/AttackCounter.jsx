import React, { useState, useEffect } from 'react';
import { RESET_ELEMENTS, COLOR_PALETTE } from '../../constants/constants';
import { StyledAttackCounter } from './AttackCounterStyles.js';

const AttackCounter = ({ data }) => {
    const [totalCounter, setTotalCounter] = useState(0);
    const [firewallDropCounter, setFirewallDropCounter] = useState(0);
    const [firewallAllowCounter, setFirewallAllowCounter] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTotalCounter(0);
            setFirewallDropCounter(0);
            setFirewallAllowCounter(0);
        }, RESET_ELEMENTS);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        data.forEach((item) => {
            setTimeout(() => {
                switch (item.signature) {
                    case 'Firewall Drop':
                        setFirewallDropCounter(
                            (prevCounter) => prevCounter + parseInt(item.rocketsByCity)
                        );
                        break;
                    default:
                        setFirewallAllowCounter(
                            (prevCounter) => prevCounter + parseInt(item.rocketsByCity)
                        );
                }
                setTotalCounter((prevCounter) => prevCounter + parseInt(item.rocketsByCity));
            }, item.randomDelay + 1000);
        });
    }, [data]);

    const drop = {
        color: COLOR_PALETTE.RED,
    };

    const allow = {
        color: COLOR_PALETTE.GREEN,
    };

    return (
        <StyledAttackCounter>
            <h2 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.WHITE }}>
                Total packets: {totalCounter}
            </h2>
            <br />
            <h2 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.WHITE }}>Main Firewall</h2>
            <h4 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.WHITE }}>
                Firewall drop: <span style={drop}>{firewallDropCounter}</span>
            </h4>
            <h4 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.WHITE }}>
                Firewall allow: <span style={allow}>{firewallAllowCounter}</span>
            </h4>
        </StyledAttackCounter>
    );
};

export default AttackCounter;
