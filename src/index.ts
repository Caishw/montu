import {Address, getPlaceAutoComplete} from './maps-api'

export async function getAutoCompleteDetails(address: string): Promise<Address[]> {
    if(process.env.TOMTOM_API_KEY)
    return await getPlaceAutoComplete(process.env.TOMTOM_API_KEY,address)
    else throw new Error('Please provide the tomtom api key')
}
