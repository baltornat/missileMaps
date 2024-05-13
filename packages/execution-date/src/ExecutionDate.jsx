import React from 'react';
import { StyledDate } from './ExecutionDateStyles.js';
import { COLOR_PALETTE } from '../../constants/constants';

const ExecutionDate = ({ currentDate }) => {
    return (
        <StyledDate>
            <h3 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.WHITE }}>
                Since {currentDate.getDate()}/{String(currentDate.getMonth() + 1)}/
                {currentDate.getFullYear()} - {currentDate.getHours()}:
                {String(currentDate.getMinutes()).padStart(2, '0')}
            </h3>
        </StyledDate>
    );
};

export default ExecutionDate;