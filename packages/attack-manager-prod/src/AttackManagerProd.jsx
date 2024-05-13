import React, { useState, useEffect } from 'react';
import { StyledMapContainer, StyledMissileMapName, Logo } from './AttackManagerProdStyles.js';
import { RESET_ELEMENTS, COLOR_PALETTE } from '../../constants/constants.js';
import Map from '@splunk/map';
import MessageBox from '@splunk/message-box';
import ExecutionDate from '@splunk/execution-date';
import AttackCounter from '@splunk/attack-counter';
import CustomLogo from '../../assets/logo.svg';
import SearchJob from '@splunk/search-job';

function executeSearch(searchQuery, earliest, latest) {
    const searchJob = SearchJob.create({
        search: searchQuery,
        earliest_time: earliest,
        latest_time: latest,
        auto_cancel: '50',
    });
    return searchJob;
}

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

const AttackManagerProd = ({ searchSchedule, searchQuery, earliest, latest }) => {
    const [executionCounter, setExecutionCounter] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mainSearchResults, setMainSearchResults] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, RESET_ELEMENTS);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const mainJob = executeSearch(searchQuery, earliest, latest);
        mainJob.getResults({ count: 0 }).subscribe((results) => {
            const temp = prepareResults(results.results, searchSchedule);
            setMainSearchResults(temp);
        });
        const intervalId = setInterval(() => {
            const mainJob = executeSearch(searchQuery, earliest, latest);
            mainJob.getResults({ count: 0 }).subscribe((results) => {
                const temp = prepareResults(results.results, searchSchedule);
                setMainSearchResults(temp);
            });
            setExecutionCounter(executionCounter === 10 ? 0 : (prevCounter) => prevCounter + 1);
        }, searchSchedule);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return mainSearchResults ? (
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
    ) : null;
};

export default AttackManagerProd;
