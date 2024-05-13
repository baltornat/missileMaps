import React, { useState, useEffect } from 'react';
import { Geographies, ComposableMap, ZoomableGroup } from 'react-simple-maps';
import {
    COLOR_PALETTE,
    MAP_PROJECTION,
    RESET_CHOROPLETH_COUNTER,
} from '../../constants/constants.js';
import geoUrl from '../../utils/world.json';
import ChoroplethGeography from '@splunk/choropleth-geography';
import Rocket from '@splunk/rocket';

function needsReset(counter) {
    return counter === RESET_CHOROPLETH_COUNTER + 1;
}

const removeDuplicates = (array) => {
    const seen = new Set();
    return array.filter((entry) => {
        const key = `${entry.countryCode}-${entry.rocketsByCountry}`;
        if (!seen.has(key)) {
            seen.add(key);
            return true;
        }
        return false;
    });
};

function rocketsPerCountry(rockets) {
    const tempArray = rockets.map((item) => ({
        countryCode: item.countryCode,
        rocketsByCountry: item.rocketsByCountry / 5000,
    }));
    return removeDuplicates(tempArray);
}

function getOpacityIncrement(geo, currentRocketsPerCountry) {
    const temp = currentRocketsPerCountry.find((item) => item.countryCode === geo.id);
    return temp ? temp.rocketsByCountry : 0;
}

const Map = ({ searchSchedule, rockets }) => {
    const [currentRocketsPerCountry, setCurrentRocketPerCountry] = useState(
        rocketsPerCountry(rockets)
    );
    const [currentSearchCounter, setCurrentSearchCounter] = useState(0);

    useEffect(() => {
        setCurrentRocketPerCountry(rocketsPerCountry(rockets));
        setCurrentSearchCounter((prevCounter) =>
            needsReset(prevCounter + 1) ? 1 : prevCounter + 1
        );
    }, [rockets]);

    return (
        <ComposableMap
            width={1920}
            height={1080}
            projection={MAP_PROJECTION}
            projectionConfig={{
                center: [0, 32],
                scale: 300,
            }}
            style={{
                backgroundColor: COLOR_PALETTE.BACKGROUND_COLOR,
            }}
        >
            <ZoomableGroup center={[10, 30]} zoom={0.85}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            return (
                                <ChoroplethGeography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    searchCounter={currentSearchCounter}
                                    opacityIncrement={getOpacityIncrement(
                                        geo,
                                        currentRocketsPerCountry
                                    )}
                                    searchSchedule={searchSchedule}
                                />
                            );
                        })
                    }
                </Geographies>
                {rockets.map((item) => (
                    <Rocket
                        key={Math.random() * 100000}
                        randomDelay={item.randomDelay}
                        from={[item.lon, item.lat]}
                        signature={item.signature}
                        rocketsByCity={item.rocketsByCity}
                    />
                ))}
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default Map;
