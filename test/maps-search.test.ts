import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutoComplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'
import axios from 'axios';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
config({path: '.env.local'});

describe('Map-search', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockedAxios.get.mockResolvedValue({ data: {results: []} });
    });
    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            process.env.TOMTOM_API_KEY = 'blah'

            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('should not call the api if the tomtom api is not provided', async () => {
            delete process.env.TOMTOM_API_KEY
            await expect(getAutoCompleteDetails('Charlotte Street')).rejects.toThrow('Please provide the tomtom api key')
            expect(mockedAxios.get).not.toHaveBeenCalled();

        });
    })

    describe('getPlaceAutocomplete', () => {
        it('handles no results', async () => {
            const res = await getPlaceAutoComplete('apiKey', 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles error from the api',  async () => {
            mockedAxios.get.mockRejectedValue(new Error('Request unauthorised'));
            const res = getPlaceAutoComplete('apiKey', '');
            await expect(res).rejects.toThrow('Request unauthorised')
        })

        it('should only fetch australian addresses', async() => {
            await getPlaceAutoComplete('apiKey', 'asfasffasfasafsafs');
            expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.tomtom.com/search/2/search/asfasffasfasafsafs.json?countrySet=AU`, {
                params: {
                    key: 'apiKey',
                    limit: 100,
                }
            })
        });
    })

})
