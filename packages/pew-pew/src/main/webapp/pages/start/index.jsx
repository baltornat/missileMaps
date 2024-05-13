import React from 'react';

import layout from '@splunk/react-page';
import SearchManager from '@splunk/search-manager';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

getUserTheme()
    .then((theme) => {
        layout(
            <StyledContainer>
                <StyledGreeting>Hello, from inside PewPew!</StyledGreeting>
                <div>Your component will appear below.</div>
                <SearchManager name="from inside SearchManager" />
            </StyledContainer>,
            {
                theme,
            }
        );
    })
    .catch((e) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = e;
        document.body.appendChild(errorEl);
    });
