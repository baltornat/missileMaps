import React from 'react';

import layout from '@splunk/react-page';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

getUserTheme()
    .then((theme) => {
        layout(
            <StyledContainer>
                <StyledGreeting>Pew Pew</StyledGreeting>
                <div>
                    Attack Map shows the origin and type of packets that are blocked by the
                    firewall.
                </div>
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
