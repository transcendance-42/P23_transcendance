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
    const response = await fetch('/api/token/refresh', {
        method: 'POST',
        credentials: 'include'
    })
    const data = await response.json()
    if (response.status === 429) {
        const retryAfter = Number(
        response.headers.get('Retry-After') ?? 2)

        const error = new Error('Too many request')
        error.status = 429
        error.retryAfter = retryAfter
        throw error
        }
    if (!response.ok || !data.success)
        throw new Error(data.message || data.error || 'Refresh failed')
    return { token: data.acces_token, userId: data.userId }
}

export async function apiLogout() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    const data = await response.json()
    if (!response.ok || !data.success)
        throw new Error(data.message || data.error || 'Logout failed')
    return { success:true }    
}