import { GlobalUserAgent, GlobalSessionCookies, GlobalcsrfToken } from '../globals'
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