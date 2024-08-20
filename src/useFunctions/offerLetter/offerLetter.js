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
        throw new Error(error);
    }
}

export const getOfferLetterList = async ({
    pageParam = 1,
    search = ''
}) => {
    try {
        const { data } = await API_AXIOS.get('offerLetter', {
            params: {
                page: pageParam,
                search
            }
        })
        // showSuccess(data?.message)
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
        const { data } = await API_AXIOS.post('offerLetter/getOfferDetails', {
            orgId,
            letterId
        })
        // showSuccess(data?.message)
        return data?.data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}

export const getOfferLetterDetailAuth = async (id) => {
    try {
        const { data } = await API_AXIOS.get(`getDetailsById/${id}`)
        // showSuccess(data?.message)
        return data;
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}

export const submitOfferLetterWithSign = async ({
    orgId,
    letterId,
    pdfUrl
}) => {
    try {
        const { data } = await API_AXIOS.post('offerLetter/signOffer', {
            orgId,
            letterId,
            url: pdfUrl
        });
        showSuccess(data?.message)
        return data
    }
    catch (error) {
        console.log('error', error)
        showError(error?.response?.data?.message);
    }
}