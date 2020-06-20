import init from '../src/init'
import { getFullProfile, getProfileIds } from '../src/profile'

/**
 * Create this file on your own and add your cookie string for testing
 */
import values from './test_values'


const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
const cookieObject = values.cookieObject
const profileId = { id: 'ilham-kadri'}

describe("Real API test", () => {
    it("tests if we can pull a profile successfully", async () => {
        init({ cookieObject, userAgent } )
        const { ZohoCRMprofile, rawProfile } = await getFullProfile( profileId )
        //console.log(ZohoCRMprofile)
        console.log( rawProfile )

        expect(ZohoCRMprofile).toBeDefined


    })

    it('tests if we can pull IDs from the people directory', async () => {
        init({ cookieObject, userAgent, country: 'de' })

        const ids = await getProfileIds('a', 2)
        console.log('Got ', ids.length, 'IDs from this call')
        expect(ids).toBeDefined




    })

})