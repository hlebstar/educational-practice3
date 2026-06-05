<template>
  <div class="container">
    <div class="card shadow-lg border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0" style="color: #2e7d32;"> Новая заявка</h2>
          <router-link to="/dashboard" class="btn btn-secondary">Назад</router-link>
        </div>
        
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>
        
        <form @submit.prevent="handleCreateOrder">
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;"> Адрес уборки *</label>
            <input 
              type="text" 
              class="form-control" 
              v-model="form.address" 
              required
              placeholder="г. Великий Новгород, ул. Большая СПБ, д. 43, кв. 7">
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;"> Контактный телефон *</label>
            <input 
              type="tel" 
              class="form-control" 
              v-model="form.phone" 
              required
              placeholder="+7 (999) 123-45-67">
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;"> Вид услуги *</label>
            <select class="form-select" v-model="form.service" required>
              <option value="">Выберите услугу</option>
              <option value="общий клининг"> Общий клининг</option>
              <option value="генеральная уборка"> Генеральная уборка</option>
              <option value="послестроительная уборка"> Послестроительная уборка</option>
              <option value="химчистка ковров и мебели"> Химчистка ковров и мебели</option>
            </select>
          </div>
          
          <div class="mb-3">
            <label class="form-label" style="color: #2e7d32;">Тип оплаты *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input 
                  type="radio" 
                  class="form-check-input" 
                  value="наличные" 
                  v-model="form.payment" 
                  id="cash">
                <label class="form-check-label" for="cash">
                   Наличные
                </label>
              </div>
              <div class="form-check">
                <input 
                  type="radio" 
                  class="form-check-input" 
                  value="банковская карта" 
                  v-model="form.payment" 
                  id="card">
                <label class="form-check-label" for="card">
                   Банковская карта
                </label>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label" style="color: #2e7d32;"> Желаемая дата *</label>
              <input 
                type="date" 
                class="form-control" 
                v-model="form.date" 
                required
                :min="minDate">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label" style="color: #2e7d32;"> Желаемое время *</label>
              <input 
                type="time" 
                class="form-control" 
                v-model="form.time" 
                required>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="form-label" style="color: #2e7d32;"> Дополнительные пожелания</label>
            <textarea 
              class="form-control" 
              v-model="form.comment" 
              rows="3"
              placeholder="Например: нужен пылесос, есть домашние животные, нужна парковка..."></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">
             Отправить заявку
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { orders } from '../api'

export default {
  data() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    
    return {
      form: {
        address: '',
        phone: '',
        service: '',
        payment: 'наличные',
        date: '',
        time: '',
        comment: ''
      },
      minDate: `${year}-${month}-${day}`,
      error: '',
      success: ''
    }
  },
  methods: {
    async handleCreateOrder() {
      this.error = ''
      this.success = ''
      
      if (!this.form.address) {
        this.error = 'Адрес уборки'
        return
      }
      if (!this.form.phone) {
        this.error = 'Актуальный номер телефона'
        return
      }
      if (!this.form.service) {
        this.error = 'Выберите вид услуги'
        return
      }
      if (!this.form.date) {
        this.error = 'Выберите дату'
        return
      }
      if (!this.form.time) {
        this.error = 'Выберите время'
        return
      }
      
      try {
        const data = {
          address: this.form.address,
          phone: this.form.phone,
          service: this.form.service,
          payment: this.form.payment,
          date: this.form.date,
          time: this.form.time,
          comment: this.form.comment
        }
        
        await orders.create(data)
        
        this.success = 'Заявка успешно создана! Перенаправление...'
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 1500)
        
      } catch (err) {
        this.error = err.message || 'Ошибка при создании заявки'
      }
    }
  }
}
</script>

<style scoped>
textarea {
  resize: vertical;
  min-height: 80px;
}

input[type="date"]:focus,
input[type="time"]:focus,
textarea:focus,
select:focus {
  border-color: #75ef7d !important;
  box-shadow: 0 0 0 0.2rem rgba(249, 168, 37, 0.25) !important;
}
</style>