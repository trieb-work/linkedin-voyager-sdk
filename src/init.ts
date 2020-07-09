import Set from './globals'
/**
  * The init function sets the mandatory parameters cookie, csrftoken and user-agent globally, so that all
  * following function calls make use of these parameters
*/ 

export interface Incoming {
  cookieObject? :{name :string, value :string}[];
  cookieString? :string;
  csrftoken? :string;
  userAgent :string;
  country? :"de" | "es" | "www";
}

/**
 * This init function instantiates this module and sets the mandatory global values like cookies, useragent etc. 
 * @param {object} param0.cookieObject The cookies object array. 
 * @param {string} param0.cookieString The cookies as normal string
 * @param {string} param0.csrfToken The csrftoken used to secure calls to the XING API. We try to extract it from the cookies when not set
 * @param {string} param0.UserAgent The user-agent we should use to call the API.
 * @param {object} param0
 */
export default function Init({ cookieObject, cookieString, csrftoken, userAgent, country } :Incoming){
    
    // set the session cookie globally. We join the array together to be just a cookie string
    const SessionCookies = cookieString ? cookieString : cookieObject ? cookieObject.map(x => x.name+'='+x.value).join('; ') : ''

    let csrfToken :string


    if (csrftoken) {
        csrfToken = csrftoken
    } else {
        if(!cookieObject) throw new Error('No CSRFToken and no Cookie Object found. We can only extract the CSRFToken from a cookie object.')
        const cookie = cookieObject.find( x => x.name === 'JSESSIONID')
        if (!cookie) throw new Error('The cookie object does not include the JSESSIONID cookie. Can\'t extract the csrftoken')
        csrfToken = cookie.value.replace(/\"/g,'')

    }

    Set({csrftoken: csrfToken, SessionCookies, userAgent, country})
  


}