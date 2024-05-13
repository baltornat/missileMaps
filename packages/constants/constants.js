// FUNCTIONAL SETTINGS

export const DESTINATION = [9.16505, 45.506]; // [longitude, latitude] -> defaults to Milan
export const RESET_ELEMENTS = 3600000; // Reset timer of visual elements in ms (e.g. how frequently reset counters)
export const RESET_CHOROPLETH_COUNTER = 10; // Number of searches to run before resetting the choropleth
export const OUTLIER_THRESHOLD = 1; // How many standard deviations away from the mean to calculate both the upper and lower bounds

// VISUAL SETTINGS

export const MAP_PROJECTION = 'geoMercator'; // Map projection -> https://www.react-simple-maps.io/docs/projections/
export const COUNTRY_STROKE_WIDTH = '1.5'; // Country borders width in pixels
export const COLOR_PALETTE = {
    // Colors in use
    RED: '#c81414',
    DARKORANGE: '#e85b00',
    LIGHTORANGE: '#f99300',
    YELLOW: '#fac814',
    GREEN: '#00b015',
    WHITE: '#ffffff',
    COUNTRY_COLOR: '#007ed8',
    COUNTRY_STROKE_COLOR: '#222234',
    BACKGROUND_COLOR: '#152638',
    TITLE_COLOR: '#3c444d',
};

// SEARCH SETTINGS

export const ATTACK_EARLIEST = '-1m@m'; // Earliest time for the attack search
export const ATTACK_LATEST = '@m'; // Latest time for the attack search

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  REQUIRED FIELDS IN BOTH MAPS                                                                            //
//  - src_city:             Source City                                                                     //
//  - src_country:          Source Country                                                                  //
//  - src_country_code:     Source Country Code                                                             //
//  - src_lat:              Source Latitude                                                                 //
//  - src_lon:              Source Longitude                                                                //
//  - rockets_by_city:      Number of requests from the same src_city (in the provided timerange)           //
//  - rockets_by_country:   Total number of requests from the same src_country (in the provided timerange)  //
//  OPTIONAL FIELDS ATTACK MAP (EXAMPLES)                                                                   //
//  - firewall:             Name of the firewall if multiple                                                //
//  - action:               Traffic type (e.g. "Allowed"/"Blocked"...)                                      //
//  - signature:            Message attached to the action (e.g. "Firewall Drop"/"Blacklisted IP"...)       //
//  - service:              Severity of the service (e.g. "Informational"/"Critical"...)                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ATTACK_SEARCH = '';
export const ATTACK_SEARCH_SCHEDULE = 60000; // Execution frequency of the attack search in ms
