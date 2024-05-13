import React from 'react';
import {
    ATTACK_SEARCH,
    ATTACK_SEARCH_SCHEDULE,
    ATTACK_EARLIEST,
    ATTACK_LATEST,
} from '../../constants/constants.js';
import AttackManagerProd from '@splunk/attack-manager-prod';
import AttackManagerTest from '@splunk/attack-manager-test';

const SearchManager = ({ searchType, environment }) => {
    if (searchType === 'Attack' && environment === 'Prod') {
        return (
            <AttackManagerProd
                searchSchedule={ATTACK_SEARCH_SCHEDULE}
                searchQuery={ATTACK_SEARCH}
                earliest={ATTACK_EARLIEST}
                latest={ATTACK_LATEST}
            />
        );
    } else if (searchType === 'Attack' && environment === 'Test') {
        return <AttackManagerTest searchSchedule={ATTACK_SEARCH_SCHEDULE} />;
    }
};

export default SearchManager;
