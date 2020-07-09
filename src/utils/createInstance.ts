import { GlobalUserAgent, GlobalSessionCookies, GlobalcsrfToken, GlobalCountry } from '../globals'
import  axios from 'axios'




/**
 * Creates the axios instance that gets used for all following API calls.
 */
export const createInstance = () => {
 
    if (!GlobalcsrfToken) throw new Error('No CSRF Token found. Set it first with the init function')

    let headers = {
        "accept": "application/vnd.linkedin.normalized+json+2.1",
        "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6",
        "csrf-token": GlobalcsrfToken,
        "User-Agent" : GlobalUserAgent,
        "Cookie": GlobalSessionCookies,
        "x-li-lang": "de_DE",
        "x-li-track": "{\"clientVersion\":\"1.6.4335\",\"osName\":\"web\",\"timezoneOffset\":2,\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":2}",
        "x-restli-protocol-version": "2.0.0",
        "sec-fetch-dest": 'empty',
        "sec-fetch-mode": 'cors',
        "sec-fetch-site": 'same-origin'
    }
 

    return axios.create({
        baseURL: 'https://www.linkedin.com/voyager/api',
        headers,
        withCredentials: true
    })


}

/**
 * Create the axios instance used to scrap all profile IDs from the directory pages
 */
export const createProfileDirectoryInstance = () => {

    let headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": GlobalSessionCookies,
        "user-agent": GlobalUserAgent
    }

    return axios.create({
        baseURL: `https://${GlobalCountry}.linkedin.com/directory/`,
        headers,
        withCredentials: true,
        timeout: 5000
    })

}
