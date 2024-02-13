// in this file we will define some helper functions that we will use in our app
// we will create some helper functions that will be reused in different parts of the application

import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        return data;
    } catch (err) {
        // here we will re throw the error so that the error will be caught somewhere else
        throw err;
        // console.error(err);
    }
}