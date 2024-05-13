import React from 'react';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import SearchManager from '@splunk/search-manager';

const themeToVariant = {
    enterprise: { colorScheme: 'dark', family: 'enterprise' },
};

const AttackMap = () => {
    return (
        <SplunkThemeProvider {...themeToVariant.enterprise}>
            <SearchManager searchType="Attack" environment="Prod" />
        </SplunkThemeProvider>
    );
};

export default AttackMap;
