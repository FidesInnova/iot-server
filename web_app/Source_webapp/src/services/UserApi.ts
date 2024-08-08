import ApiService from './ApiService'

export async function apiGetCurUserProfile<T>() {
    return ApiService.fetchData<T>({
        url: import.meta.env.VITE_URL + 'v1/user/get-my-profile',
        method: 'get',
    })
}

export async function apiEditUserProfile<T>(
    userId: string,
    userProfileData: any
) {
    return ApiService.fetchData<T>({
        url: `${import.meta.env.VITE_URL}v1/user/edit-user-by-user/${userId}`,
        method: 'patch',
        data: userProfileData,
    })
}

export async function apiChangePasswordByEmail<T>(
    userEmail: string,
    newPassword: string
) {
    return ApiService.fetchData<T>({
        url: `${
            import.meta.env.VITE_URL
        }v1/user/change-password-and-activate-account`,
        method: 'post',
        data: {
            email: userEmail,
            newPassword: newPassword,
        },
    })
}

export async function apiCreateNewBuilding<T>(data: any) {
    return ApiService.fetchData<T>({
        url: `${import.meta.env.VITE_URL}v1/building/create`,
        method: 'post',
        data: {
            name: data.name,
            details: data.details,
        },
    })
}

export async function apiDeleteByBuildId<T>(buildId: string) {
    return ApiService.fetchData<T>({
        url: `${import.meta.env.VITE_URL}v1/building/delete-by-build-id/${buildId}`,
        method: 'delete',
    })
}

export async function apiEditBuildingByBuildId<T>(
    buildId: string,
    data: object
) {
    return ApiService.fetchData<T>({
        url: `${import.meta.env.VITE_URL}v1/building/edit-by-build-id`,
        method: 'patch',
        data: {
            buildId: buildId,
            data: data,
        },
    })
}

export async function apiGetBuildingsByUserId<T>(
    userId: string,
) {
    return ApiService.fetchData<T>({
        url: `${import.meta.env.VITE_URL}v1/building/get-buildings-by-user-id/${userId}`,
        method: 'get',
    })
}

export async function apiGetBuildingByBuildId<T>(buildId: string) {
    return ApiService.fetchData<T>({
        url: `${
            import.meta.env.VITE_URL
        }v1/building/get-building-by-build-id/${buildId}`,
        method: 'get',
    })
}

export async function apiRequestVerifyEmail<T>(email: string) {
    return ApiService.fetchData<T>({
        url: `${
            import.meta.env.VITE_URL
        }v1/user/request-otp-code-for-verify-email`,
        method: 'post',
        data: {
            email: email,
        },
    })
}

export async function apiGetUserProfileByUserId<T>(userId: string) {
    return ApiService.fetchData<T>({
        url: import.meta.env.VITE_URL + `v1/user/get-profile-by-id/${userId}`,
        method: 'get',
    })
}

export async function apiGetNodeTheme<T>() {
    return ApiService.fetchData<T>({
        url: import.meta.env.VITE_URL + `v1/theme`,
        method: 'get',
    })
}

export async function apiGetMainNodeTheme<T>() {
    return ApiService.fetchData<T>({
        url: `https://panel.fidesinnova.io/app/v1/theme`,
        method: 'get',
    })
}
