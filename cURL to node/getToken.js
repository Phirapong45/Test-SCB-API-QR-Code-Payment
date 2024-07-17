const axios = require('axios');

const url = 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic [your authorization]',
    'requestUId': 'your-request-uid',
    'resourceOwnerId': 'your-resource-owner-id'
};
const data = {
    applicationKey: '[your applicationKey]',
    applicationSecret: '[your applicationSecret]'
};

axios.post(url, data, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
