import { API_AXIOS } from "../../http/interceptor"
import { showError, showSuccess } from "../../utils/toastHelpers";

export const createOfferLetter = async ({ sendData }) => {
    try {
        const { data } = await API_AXIOS.post('offerLetter', sendData)
        showSuccess(data?.message)
        return data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}

export const getOfferLetterList = async ({
    pagePrams = 1,
    search = ''
}) => {
    try {
        const { data } = await API_AXIOS.get('offerLetter', {
            params: {
                page: pagePrams,
                search
            }
        })
        showSuccess(data?.message)
        return data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }

}

export const getOfferLetterDetailPublic = async ({
    orgId = null,
    letterId = null
}) => {
    try {
        const { data } = await API_AXIOS.get('getOfferLetterDetails', {
            params: {
                orgId,
                letterId
            }
        })
        showSuccess(data?.message)
        return data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}

export const getOfferLetterDetailAuth = async (id) => {
    try {
        const { data } = await API_AXIOS.get(`getDetailsById/${id}`)
        showSuccess(data?.message)
        return data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}