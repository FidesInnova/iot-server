import ApiService from './ApiService'

export async function apiGetWalletBalance() {
    return ApiService.fetchData({
        url: import.meta.env.VITE_URL + 'v1/contract/get-wallet-balance',
        method: 'get',
    })
}

export async function apiRequestFaucet() {
    return ApiService.fetchData({
        url: import.meta.env.VITE_URL + 'v1/contract/request-faucet',
        method: 'post',
    })
}

export async function apiStoreCommitment(
    manufacturerName: string,
    deviceType: string,
    deviceHardwareVersion: string,
    firmwareVersion: string,
    lines: string,
    commitmentData: string
) {
    return ApiService.fetchData({
        url: import.meta.env.VITE_URL + 'v1/contract/store-commitment',
        method: 'post',
        data: {
            manufacturerName,
            deviceType,
            deviceHardwareVersion,
            firmwareVersion,
            lines,
            commitmentData,
        },
    })
}

export async function apiGetAdminWalletData() {
    return ApiService.fetchData({
        url: import.meta.env.VITE_URL + 'v1/contract/admin-wallet',
        method: 'get',
    })
}

export async function apiGetFaucetWalletData() {
    return ApiService.fetchData({
        url: import.meta.env.VITE_URL + 'v1/contract/faucet-wallet',
        method: 'get',
    })
}
