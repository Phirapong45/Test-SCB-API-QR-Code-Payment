const axios = require('axios');
const QRCode = require('qrcode');
const fs = require('fs').promises;

const getToken = async () => {
    const url = 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': '[your authorization]',
        'requestUId': 'your-request-uid',
        'resourceOwnerId': 'your-resource-owner-id'
    };
    const data = {
        applicationKey: '[your applicationKey]',
        applicationSecret: '[your applicationSecret]'
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error getting token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createQRCode = async (accessToken) => {
    const url = 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create';
    const headers = {
        'Content-Type': 'application/json',
        'accept-language': 'EN',
        'authorization': `Bearer ${accessToken}`,
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

    try {
        const response = await axios.post(url, data, { headers, timeout: 20000 });
        const qrRawData = response.data.data.qrRawData;
        return qrRawData;
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            console.error('No Response:', error.request);
        } else {
            console.error('Error Setting Up Request:', error.message);
        }
        throw error;
    }
};

const main = async () => {
    try {
        const token = await getToken();
        const qrRawData = await createQRCode(token.data.accessToken);

        // Generate QR Code image and save to file
        const qrImagePath = 'qr_code.png';
        await QRCode.toFile(qrImagePath, qrRawData);
        console.log('QR Code image generated and saved as', qrImagePath);

        // Display the URL of the generated QR code
        const qrImageUrl = await QRCode.toDataURL(qrRawData);
        console.log('QR Code URL:', qrImageUrl);

    } catch (error) {
        console.error('Error in main function:', error.message);
    }
};

main();
