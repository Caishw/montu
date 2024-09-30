import axios from 'axios'

export type Address = {
    placeId: string,
    streetNumber: string,
    countryCode: string,
    country: string,
    freeformAddress: string,
    municipality: string,
    streetName: string,
    postalCode: string,
}

export type Results = {
    id: string,
    address: Address,

}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutoComplete(key: string, address: string): Promise<Address[]> {
    const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json?countrySet=AU`, {
        params: {
            key,
            limit: 100,
        }
    });
    return autocomplete.data.results.map((result: Results) => {
        return {
            placeId: result.id,
            streetNumber: result.address.streetNumber,
            countryCode: result.address.countryCode,
            country: result.address.country,
            freeformAddress: result.address.freeformAddress,
            municipality: result.address.municipality,
            streetName: result.address.streetName,
            postalCode: result.address.postalCode,
        }
    })
}
