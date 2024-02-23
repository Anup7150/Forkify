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

// since the getJSON and sendJSON functions use the similar kind of code, we will create a function that will be used by both of them
export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ?
            fetch(url, {
                method: 'POST', // the method we are using to send the data
                headers: {
                    'Content-Type': 'application/json' // the type of data format we are sending the data
                },
                body: JSON.stringify(uploadData), // we are converting the data to a json string before sending it
            }) : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        return data;
    } catch (err) {
        // here we will re throw the error so that the error will be caught somewhere else
        throw err;
        // console.error(err);
    }
}

// export const getJSON = async function (url) {
//     try {
//         const fetchPro = fetch(url);
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} (${res.status})`)

//         return data;
//     } catch (err) {
//         // here we will re throw the error so that the error will be caught somewhere else
//         throw err;
//         // console.error(err);
//     }
// }

// // we are creating a function to send data to the api
// // we will use the POST method to send the data to the api
// export const sendJSON = async function (url, uploadData) {
//     try {
//         // we will need to pass another option paramater to the fetch method
//         const fetchPro = fetch(url, {
//             method: 'POST', // the method we are using to send the data
//             headers: {
//                 'Content-Type': 'application/json' // the type of data format we are sending the data
//             },
//             body: JSON.stringify(uploadData), // we are converting the data to a json string before sending it
//         });
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} (${res.status})`)

//         return data;
//     } catch (err) {
//         // here we will re throw the error so that the error will be caught somewhere else
//         throw err;
//         // console.error(err);
//     }
// }