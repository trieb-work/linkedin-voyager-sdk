import { createInstance } from '../utils/createInstance'

interface returnData {
    id: string
}

export  async function getFullProfile({id}){
    const instance = createInstance()

 

    let result = await instance.get(`https://www.linkedin.com/voyager/api/identity/profiles/${id}/profileView`)
    if (result.status !== 200) throw new Error('Wrong response from LinkedIn')
    let profileArray = result.data.included

    let resultContactInfo = await instance.get(`https://www.linkedin.com/voyager/api/identity/profiles/${id}/profileContactInfo`)
    if (resultContactInfo.status !== 200) throw new Error('Wrong response from LinkedIn')
    let resultContactInfoData = resultContactInfo.data['data']

    // this array gives us the sorting of the positions. The first element is the current position
    const positionSort = profileArray.find(x => x.$type === "com.linkedin.voyager.identity.profile.PositionView")["*elements"]

    let positions = profileArray.filter( x => x.$type === 'com.linkedin.voyager.identity.profile.Position')
    const currentPosition = positions.find(x => x.entityUrn === positionSort[0])

    let currentProfile = profileArray.find( (x: { $type: string }) => x.$type === "com.linkedin.voyager.identity.profile.Profile")

    const city = currentProfile.locationName.split(',')[0] || null
    const website = resultContactInfoData.websites ? resultContactInfoData.websites.find(x => x.type.category === 'COMPANY').url : null
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


    return { ZohoCRMprofile: profile }

    
}

export async function getMe(){
    const instance = createInstance()
    

    const MeResult = await instance.get("https://www.linkedin.com/voyager/api/me");
    if (MeResult.status !== 200) throw new Error('Wrong response from LinkedIn')
    let id = MeResult['data']['data']['*miniProfile'].split(':')[3]
  
    let response = await instance.get("https://www.linkedin.com/voyager/api/identity/profiles/"+id+"/profileContactInfo");
    let data :returnData = response['data']['data']
    data.id = id


    return data



}