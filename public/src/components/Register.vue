<template>
  <div class="container" style="max-width: 450px;">
    <div class="card shadow-lg border-0">
      <div class="card-body p-4 p-md-5">
        <h2 class="text-center mb-4" style="color: #2e7d32;"> Регистрация</h2>
        
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>
        
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;">Логин</label>
            <input type="text" class="form-control" v-model="form.login" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;">Пароль</label>
            <input type="password" class="form-control" v-model="form.password" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;">ФИО</label>
            <input type="text" class="form-control" v-model="form.full_name" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;">Телефон</label>
            <input type="tel" class="form-control" v-model="form.phone" required>
          </div>
          
          <div class="mb-4">
            <label class="form-label" style="color: #2e7d32;">Email</label>
            <input type="email" class="form-control" v-model="form.email" required>
          </div>
          
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Зарегистрироваться</button>
        </form>
        
        <p class="text-center mt-4 mb-0">
          <span style="color: #666;">Уже есть аккаунт?</span>
          <router-link to="/login"> Войти</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { login: '', password: '', full_name: '', phone: '', email: '' },
      error: '',
      success: ''
    }
  },
  methods: {
    async handleRegister() {
      this.error = ''
      this.success = ''
      
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
          credentials: 'include'
        })
        
        const data = await res.json()
        
        if (res.ok) {
          this.success = 'Регистрация успешна! Перенаправление...'
          setTimeout(() => this.$router.push('/login'), 1500)
        } else {
          this.error = data.error || 'Ошибка регистрации'
        }
      } catch {
        this.error = 'Ошибка соединения с сервером'
      }
    }
  }
}
</script>