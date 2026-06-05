<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 style="color: #2e7d32;">Мои заявки</h1>
      <div>
        <router-link to="/new-order" class="btn btn-success me-2"> Новая заявка</router-link>
        <button @click="logout" class="btn btn-danger">Выйти</button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else-if="orders.length === 0" class="alert alert-info text-center">
      У вас пока нет заявок. Создайте первую!
    </div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title text-success">{{ order.service_type }}</h5>
            <span :class="'badge ' + statusClass(order.status)" style="font-size: 14px; padding: 5px 12px;">
              {{ statusText(order.status) }}
            </span>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-6">
              <p><strong> Адрес:</strong> {{ order.address }}</p>
              <p><strong> Контакт:</strong> {{ order.contact || order.phone }}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Дата/время:</strong> {{ order.desired_date }} {{ order.desired_time }}</p>
              <p><strong>Оплата:</strong> {{ order.payment_type }}</p>
            </div>
          </div>
          <div v-if="order.cancel_reason" class="alert alert-warning mt-2">
            <strong>Причина отмены:</strong> {{ order.cancel_reason }}
          </div>
          
          <div v-if="order.status === 'новая'" class="mt-3">
            <button @click="openCancelModal(order)" class="btn btn-danger btn-sm">Отменить заявку</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCancelModal" class="modal-overlay" @click.self="closeCancelModal">
      <div class="modal-content">
        <div class="modal-header">
          <h4 style="color: #dc3545;"> Отмена заявки</h4>
        </div>
        <div class="modal-body">
          <p>Вы уверены, что хотите отменить заявку <strong>№{{ currentOrder?.id }}</strong>?</p>
          <label class="form-label mt-3">Причина отмены:</label>
          <textarea v-model="cancelReason" class="form-control" rows="3" placeholder="Укажите причину отмены..."></textarea>
        </div>
        <div class="modal-footer">
          <button @click="closeCancelModal" class="btn btn-secondary">Закрыть</button>
          <button @click="confirmCancelOrder" class="btn btn-danger">Подтвердить отмену</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orders, auth } from '../api'

export default {
  data() {
    return {
      orders: [],
      loading: true,
      showCancelModal: false,
      cancelReason: '',
      currentOrder: null
    }
  },
  methods: {
    statusClass(status) {
      const map = { 'новая': 'bg-warning', 'в работе': 'bg-primary', 'выполнено': 'bg-success', 'отменено': 'bg-danger' }
      return map[status] || 'bg-secondary'
    },
    statusText(status) {
      const map = { 'новая': ' Новая', 'в работе': ' В работе', 'выполнено': ' Выполнено', 'отменено': 'Отменено' }
      return map[status] || status
    },
    async logout() {
      await auth.logout()
      this.$router.push('/login')
    },
    async loadOrders() {
      try {
        this.orders = await orders.getAll()
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    openCancelModal(order) {
      this.currentOrder = order
      this.cancelReason = ''
      this.showCancelModal = true
    },
    closeCancelModal() {
      this.showCancelModal = false
      this.currentOrder = null
      this.cancelReason = ''
    },
    async confirmCancelOrder() {
      if (!this.cancelReason.trim()) {
        alert('Укажите причину отмены')
        return
      }
      await orders.updateStatus(this.currentOrder.id, 'отменено', this.cancelReason)
      this.closeCancelModal()
      await this.loadOrders()
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 450px;
  width: 90%;
  overflow: hidden;
}

.modal-header {
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

textarea:focus {
  border-color: #f9a825 !important;
  box-shadow: 0 0 0 0.2rem rgba(249, 168, 37, 0.25) !important;
}
</style>