import React from 'react';
import AttackMessage from '@splunk/attack-message';
import { StyledMessageBox } from './MessageBoxStyles';

const MessageBox = ({ messages }) => {
    return (
        <StyledMessageBox>
            <svg key={Math.random() * 100000} width={650} height={400}>
                {messages.map((item) => (
                    <AttackMessage key={Math.random() * 100000} data={item} />
                ))}
            </svg>
        </StyledMessageBox>
    );
};

export default MessageBox;
