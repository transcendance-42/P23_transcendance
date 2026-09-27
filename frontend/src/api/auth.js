export async function apiLogin(email, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (!response.ok || !data.success)
        throw new Error(data.message || data.error || 'Login failed')
    return { token: data.access_token, userId: data.userId }
}

export async function apiRefresh() {
    const response = await fetch('/api/token/refresh', {method: 'POST'})
    const data = await response.json()
    if (!response.ok || !data.success)
        throw new Error(data.message || data.error || 'Refresh failed')
    return { token: data.acces_token, userId: data.userId }
}

// export async function apiLogout() {}