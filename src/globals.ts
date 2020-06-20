export let GlobalSessionCookies :string
export let GlobalcsrfToken :string
export let GlobalUserAgent :string
export let GlobalCountry :string

/**
 * Sets the global parameters that will stay the same for all API calls
 * @param {string} param0.csrftoken
 * @param {object} param0 
 */
export default function Set({csrftoken, SessionCookies, userAgent, country} :{ csrftoken:string, SessionCookies :string, userAgent :string, country :string} ){
    GlobalSessionCookies = SessionCookies
    GlobalcsrfToken = csrftoken
    GlobalUserAgent = userAgent
    GlobalCountry = country
}