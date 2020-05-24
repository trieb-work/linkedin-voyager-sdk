export { getFullProfile } from './profile/index'
export { getCompany } from './company/index'

export let GlobalSessionCookies :string
export let GlobalcsrfToken :string
export let GlobalUserAgent :string


export function init(cookie :{name :string, value :string}[], csrftoken :string, useragent :string){
    
    // set the session cookie globally. We join the array together to be just a cookie string
    GlobalSessionCookies = cookie.map(x => x.name+'='+x.value).join('; ')
    GlobalcsrfToken = csrftoken
    GlobalUserAgent = useragent


}



