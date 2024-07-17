const axios = require('axios');

const url = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create';
const headers = {
    'Content-Type': 'application/json',
    'accept-language': 'EN',
    'authorization': 'Bearer [your authorization]',
    'requestUId': '1b01dff2-b3a3-4567-adde-cd9dd73c8b6d',
    'resourceOwnerId': '[your applicationKey]'
};
const data = {
    qrType: 'PP',
    ppType: 'BILLERID',
    ppId: '068384100982686',
    amount: '1.00',
    ref1: 'REFERENCE1',
    ref2: 'REFERENCE2',
    ref3: 'SCB'
};

axios.post(url, data, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
