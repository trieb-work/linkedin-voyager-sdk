export let GlobalSessionCookies :string
export let GlobalcsrfToken :string
export let GlobalUserAgent :string

export default function Set({csrftoken, SessionCookies, userAgent} :{ csrftoken:string, SessionCookies :string, userAgent :string} ){
    GlobalSessionCookies = SessionCookies
    GlobalcsrfToken = csrftoken
    GlobalUserAgent = userAgent
}