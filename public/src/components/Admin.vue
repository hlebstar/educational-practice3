<template>
  <div class="container-fluid mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 style="color: #2e7d32;"> Админ панель</h2>
      <button @click="logout" class="btn btn-success">Выйти</button>
    </div>


    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    
    <div v-else-if="orders.length === 0" class="alert alert-info text-center">
      Нет заявок
    </div>

    <div v-else class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Контакты</th>
            <th>Адрес</th>
            <th>Услуга</th>
            <th>Дата/время</th>
            <th>Оплата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td><strong>{{ order.full_name || order.name }}</strong></td>
            <td>{{ order.phone }}<br><small class="text-muted">{{ order.email }}</small></td>
            <td>{{ order.address }}</td>
            <td>{{ order.service_type }}</td>
            <td>{{ order.desired_date }} {{ order.desired_time }}</td>
            <td>{{ order.payment_type }}</td>
            <td>
              <span :class="'badge ' + statusClass(order.status)" style="font-size: 12px;">
                {{ statusText(order.status) }}
              </span>
              <div v-if="order.cancel_reason" class="small text-danger mt-1">
                {{ order.cancel_reason }}
              </div>
            </td>
             <td>
              <select class="form-select form-select-sm" v-model="order.newStatus" @change="updateStatus(order)" style="min-width: 110px;">
                <option value="новая"> Новая</option>
                <option value="в работе"> В работу</option>
                <option value="выполнено"> Выполнено</option>
                <option value="отменено">Отменить</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="row mb-4">
      <div class="col-md-3 col-6 mb-2">
        <div class="card text-center bg-success bg-opacity-25">
          <div class="card-body">
            <h3 class="text-success">{{ stats.total }}</h3>
            <p class="text-muted mb-0">Всего заявок</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6 mb-2">
        <div class="card text-center bg-success bg-opacity-25">
          <div class="card-body">
            <h3 class="text-success">{{ stats.new }}</h3>
            <p class="text-muted mb-0">Новые</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6 mb-2">
        <div class="card text-center bg-success bg-opacity-25">
          <div class="card-body">
            <h3 class="text-success">{{ stats.work }}</h3>
            <p class="text-muted mb-0">В работе</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6 mb-2">
        <div class="card text-center bg-success bg-opacity-25">
          <div class="card-body">
            <h3 class="text-success">{{ stats.done }}</h3>
            <p class="text-muted mb-0">Выполнено</p>
          </div>
        </div>
      </div>
    </div>



    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h4 style="color: #2e7d32; margin-bottom: 20px;"> Причина отмены</h4>
        <textarea v-model="cancelReason" class="form-control mb-3" rows="3" placeholder="Укажите причину отмены заявки..." style="border-color: #c8e6c9;"></textarea>
        <div class="d-flex gap-2">
          <button @click="confirmCancel" class="btn btn-danger">Подтвердить отмену</button>
          <button @click="closeModal" class="btn btn-secondary">Отмена</button>
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
      showModal: false,
      cancelReason: '',
      currentOrder: null
    }
  },
  computed: {
    stats() {
      const total = this.orders.length
      const newCount = this.orders.filter(o => o.status === 'новая').length
      const workCount = this.orders.filter(o => o.status === 'в работе').length
      const doneCount = this.orders.filter(o => o.status === 'выполнено').length
      return { total, new: newCount, work: workCount, done: doneCount }
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
        this.orders = await orders.adminGetAll()
        this.orders.forEach(o => { o.newStatus = o.status })
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async updateStatus(order) {
      if (order.newStatus === 'отменено') {
        this.currentOrder = order
        this.cancelReason = ''
        this.showModal = true
        order.newStatus = order.status
      } else {
        await orders.updateStatus(order.id, order.newStatus, '')
        await this.loadOrders()
      }
    },
    async confirmCancel() {
      if (!this.cancelReason.trim()) {
        alert('Укажите причину отмены')
        return
      }
      await orders.updateStatus(this.currentOrder.id, 'отменено', this.cancelReason)
      this.closeModal()
      await this.loadOrders()
    },
    closeModal() {
      this.showModal = false
      this.currentOrder = null
      this.cancelReason = ''
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>

<style scoped>
.container-fluid {
  width: 100%;
  padding: 0 20px;
}

.table-responsive {
  overflow-x: auto;
  width: 100%;
}

th, td {
  vertical-align: middle;
  text-align: left;
  padding: 12px !important;
  white-space: nowrap;
}

th:first-child, td:first-child {
  white-space: normal;
}

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
  padding: 25px;
  border-radius: 15px;
  max-width: 400px;
  width: 90%;
}

.form-select:focus, textarea:focus {
  border-color: #f9a825 !important;
  box-shadow: 0 0 0 0.2rem rgba(249, 168, 37, 0.25) !important;
}

.btn-secondary {
  background: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background: #5a6268;
}
</style>