import React from 'react';
import layout from '@splunk/react-page';
import AttackMap from './AttackMap';

layout(<AttackMap />, {
    pageTitle: 'Attack Map',
    hideChrome: true,
    layout: 'scrolling',
});
