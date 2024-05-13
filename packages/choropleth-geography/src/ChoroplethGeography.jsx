import React, { useState, useEffect } from 'react';
import {
    COLOR_PALETTE,
    COUNTRY_STROKE_WIDTH,
    RESET_CHOROPLETH_COUNTER,
} from '../../constants/constants.js';
import { ChoroplethPath } from './ChoroplethGeographyStyles.js';

const ChoroplethGeography = ({ geography, searchCounter, opacityIncrement, searchSchedule }) => {
    const [currentOpacity, setCurrentOpacity] = useState(0.1);
    const [previousOpacity, setPreviousOpacity] = useState(0.1);
    const [beforeReset1, setBeforeReset1] = useState();
    const [beforeReset2, setBeforeReset2] = useState();

    useEffect(() => {
        if (searchCounter === RESET_CHOROPLETH_COUNTER) {
            setBeforeReset1(currentOpacity);
            setBeforeReset2(previousOpacity);
            setPreviousOpacity(0.1);
            setCurrentOpacity(0.1);
        } else {
            setPreviousOpacity(currentOpacity);
            setCurrentOpacity(currentOpacity + opacityIncrement);
        }
    }, [searchCounter]);

    return (
        <ChoroplethPath
            key={geography.id}
            d={geography.svgPath}
            fill={COLOR_PALETTE.COUNTRY_COLOR}
            opacity={searchCounter === RESET_CHOROPLETH_COUNTER ? beforeReset2 : previousOpacity}
            from={searchCounter === RESET_CHOROPLETH_COUNTER ? beforeReset2 : previousOpacity}
            to={searchCounter === RESET_CHOROPLETH_COUNTER ? beforeReset1 : currentOpacity}
            dur={searchSchedule}
            threshold={searchCounter}
            stroke={COLOR_PALETTE.COUNTRY_STROKE_COLOR}
            strokeWidth={COUNTRY_STROKE_WIDTH}
        />
    );
};

export default ChoroplethGeography;