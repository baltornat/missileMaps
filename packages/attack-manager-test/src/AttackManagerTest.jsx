import React, { useState, useEffect } from 'react';
import { StyledMapContainer, StyledMissileMapName, Logo } from './AttackManagerTestStyles.js';
import { attackData } from '../../test-data/attack_data.js';
import { RESET_ELEMENTS, COLOR_PALETTE } from '../../constants/constants.js';
import Map from '@splunk/map';
import MessageBox from '@splunk/message-box';
import ExecutionDate from '@splunk/execution-date';
import AttackCounter from '@splunk/attack-counter';
import CustomLogo from '../../assets/logo.svg';

function prepareResults(results, searchSchedule) {
    const totalItems = results.length;
    const interval = (searchSchedule - 5200) / totalItems;
    const shuffledResults = [...results].sort(() => Math.random() - 0.5);
    const updatedResults = shuffledResults.map((item, index) => ({
        city: item.src_city,
        country: item.src_country,
        countryCode: item.src_country_code,
        lat: item.src_lat,
        lon: item.src_lon,
        rocketsByCity: item.rockets_by_city,
        rocketsByCountry: item.rockets_by_country,
        signature: item.signature,
        randomDelay: index * interval,
    }));
    return updatedResults;
}

const AttackManagerTest = ({ searchSchedule }) => {
    const [executionCounter, setExecutionCounter] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mainSearchResults, setMainSearchResults] = useState(
        prepareResults(attackData, searchSchedule)
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, RESET_ELEMENTS);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMainSearchResults(prepareResults(attackData, searchSchedule));
            setExecutionCounter(executionCounter === 10 ? 0 : (prevCounter) => prevCounter + 1);
        }, searchSchedule);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <StyledMapContainer>
            <StyledMissileMapName>
                <h5 style={{ fontFamily: 'Arial', color: COLOR_PALETTE.TITLE_COLOR }}>
                    Attack Map
                </h5>
            </StyledMissileMapName>
            <Map searchSchedule={searchSchedule} rockets={mainSearchResults} />
            <MessageBox messages={mainSearchResults} />
            <ExecutionDate currentDate={currentDate} />
            <AttackCounter data={mainSearchResults} />
            <Logo>
                <CustomLogo />
            </Logo>
            <div hidden={true}>https://github.com/baltornat</div>
        </StyledMapContainer>
    );
};

export default AttackManagerTest;
