import axios from 'axios'

export const convertCurrency = async (currency: string, amount: number) => {
    try {
        const result = await axios(
            `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${amount}`,
            { method: 'GET' })

        return result.data
    }
    catch (e) {
        console.error('convertCurrency', e)
    }
}
