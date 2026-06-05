const API = '/api'

export const auth = {
  async register(data) {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    return res.json()
  },

  async login(data) {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    return res.json()
  },

  async logout() {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' })
  },

  async me() {
    const res = await fetch(`${API}/me`, { credentials: 'include' })
    return res.json()
  }
}

export const orders = {
  async getAll() {
    const res = await fetch(`${API}/orders`, { credentials: 'include' })
    return res.json()
  },

  async create(data) {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Ошибка создания')
    }
    return res.json()
  },

  async adminGetAll() {
    const res = await fetch(`${API}/admin/orders`, { credentials: 'include' })
    return res.json()
  },

  async updateStatus(id, status, reason) {
    const res = await fetch(`${API}/admin/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason }),
      credentials: 'include'
    })
    return res.json()
  },

   async updateStatus(id, status, reason) {
    const res = await fetch(`${API}/admin/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason }),
      credentials: 'include'
    })
    return res.json()
  }
}