import { createInstance, createProfileDirectoryInstance } from '../utils/createInstance'
import cheerio from 'cheerio'

interface returnData {
    id: string
}

let Globalinstance

export  async function getFullProfile({id}){
    const instance = createInstance()

 

    /**
     * the profileView request gives you a full profile with Jobs, certificates, skills, etc..
     */
    let result = await instance.get(`/identity/profiles/${encodeURIComponent(id)}/profileView`)
    if (result.status !== 200) throw new Error('Wrong response from LinkedIn')
    let profileArray = result.data.included
    const profileView = result.data


    /**
     * the profileContactInfo offers data like email address, phone numbers etc..
     */
    let resultContactInfo = await instance.get(`/identity/profiles/${encodeURIComponent(id)}/profileContactInfo`)
    if (resultContactInfo.status !== 200) throw new Error('Wrong response from LinkedIn')
    let resultContactInfoData = resultContactInfo.data['data']
    const profileContactInfo = resultContactInfo.data['data']

    // this array gives us the sorting of the positions. The first element is the current position
    const positionSort = profileArray.find(x => x.$type === "com.linkedin.voyager.identity.profile.PositionView")["*elements"]

    let positions = profileArray.filter( x => x.$type === 'com.linkedin.voyager.identity.profile.Position')
    const currentPosition = positions.find(x => x.entityUrn === positionSort[0])

    let currentProfile = profileArray.find( (x: { $type: string }) => x.$type === "com.linkedin.voyager.identity.profile.Profile")

    const city = currentProfile?.locationName?.split(',')[0] || null
    const website = resultContactInfoData.websites ? getWebsite(resultContactInfoData.websites) : null
    let profile = {
        Last_Name: currentProfile.lastName,
        First_Name: currentProfile.firstName,
        Email: resultContactInfoData.emailAddress,
        Mobile: '',
        Phone: '',
        'LinkedIn_ID': id,
        Company: currentPosition.companyName || null,
        Designation: currentPosition.title || null,
        City: city,
        Zip_Code: '',
        Street: '',
        Country: currentProfile.geoCountryName,
        Website: website
    }

    const rawProfile = { profileView,  profileContactInfo }

    return { ZohoCRMprofile: profile, rawProfile }

    
}

export async function getMe(){
    const instance = createInstance()
    

    const MeResult = await instance.get("/me");
    if (MeResult.status !== 200) throw new Error('Wrong response from LinkedIn')
    let id = MeResult['data']['data']['*miniProfile'].split(':')[3]
  
    let response = await instance.get("/identity/profiles/"+id+"/profileContactInfo");
    let data :returnData = response['data']['data']
    data.id = id


    return data

}

/**
 * This function takes the current letter or prefix (like a,b,c,....) and the current page (1,2,3,4 ...) and returns an array
 * of profile IDs back.
 * @param prefix 
 * @param page 
 */
export async function getProfileIds(prefix :string, page :number){
    let instance
    if (Globalinstance) {
        instance = Globalinstance
    } else {
        instance = createProfileDirectoryInstance()
    }
    const url = await instance.get('/people-'+prefix+'-'+page )
    if (url.status !== 200) throw new Error('Wrong response code from LinkedIn')
    
    const ids = getProfileIdsFromHtml(url.data)
    if (typeof ids !== 'object' ) throw new Error('Parsing IDs from HTML failed. Maybe LinkedIn changed their page layout?')
    
    return ids

}

/**
 * a helper function that parses profile IDs from a profile directory page.
 * @param html The plain HTML file of the page
 */
function getProfileIdsFromHtml(html){
    var $ = cheerio.load(html)
    var profileids = []
    const elemProfileIdPos = $('ul.column li a')
    for(let i=0; i<elemProfileIdPos.length; i++){
      let href = $(elemProfileIdPos[i]).attr('href')
      let match = href.match('/in/(.*)')
      let profileid = match ? match[1].split('?')[0] : undefined
      if (profileid) profileids.push(profileid)
    }
    return profileids
}
/**
 * Little helper to extract a website - first priority company website
 * @param websites 
 */
function getWebsite(websites){
    const Company = websites.find(x => x.type.category === 'COMPANY')
    if (Company) return Company.url
    return websites[0].url

}