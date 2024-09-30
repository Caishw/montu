import {config} from 'dotenv'
import {describe} from '@jest/globals'
import {getAutoCompleteDetails} from '../src'

config({path: '.env.local'});

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            expect(res.length).toBeGreaterThan(1)
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('postalCode')
        })
    })
})
