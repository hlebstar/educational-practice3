<template>
  <div class="container">
    <div class="card shadow-lg border-0">
      <div class="card-body">
        <h2 class="text-center mb-4"> Вход</h2>
        
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Логин</label>
            <input type="text" class="form-control" v-model="form.login" required>
          </div>
          
          <div class="mb-4">
            <label class="form-label">Пароль</label>
            <input type="password" class="form-control" v-model="form.password" required>
          </div>
          
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Войти</button>
        </form>
        
        <p class="text-center mt-4 mb-0">
          <span style="color: #666;">Нет аккаунта?</span>
          <router-link to="/register"> Зарегистрироваться</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { login: '', password: '' },
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      
      console.log('Отправка запроса:', this.form)
      
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
          credentials: 'include'
        })
        
        console.log('Статус ответа:', res.status)
        const data = await res.json()
        console.log('Данные ответа:', data)
        
        if (res.ok && data.user) {
          console.log('Успешный вход, пользователь:', data.user)
          this.$router.push(data.user.role === 'admin' ? '/admin' : '/dashboard')
        } else {
          this.error = data.error || 'Неверный логин или пароль'
        }
      } catch (err) {
        console.error('Ошибка:', err)
        this.error = 'Ошибка соединения с сервером'
      }
    }
  }
}
</script>