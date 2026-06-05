<template>
  <div class="min-vh-100 d-flex align-items-center" style="background: #A0C898">
    <router-view />
  </div>
</template>

<script>
export default { 
  name: 'App' 
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .card-body {
    padding: 1.5rem !important;
  }
  
  h2 {
    font-size: 1.5rem !important;
  }
  
  .form-label {
    font-size: 0.85rem;
  }
  
  input, button {
    font-size: 14px !important;
    padding: 10px 12px !important;
  }
  
  .container {
    max-width: 95% !important;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .container {
    max-width: 90% !important;
  }
  
  .card-body {
    padding: 2rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    max-width: 70% !important;
  }
}

@media (min-width: 1025px) {
  .container {
    max-width: 450px !important;
  }
}

input:focus {
  box-shadow: 0 0 0 0.2rem rgba(249, 168, 37, 0.25) !important;
}

.btn-primary {
  background: linear-gradient(135deg, #406039 0%) !important;
  border: none !important;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  transition: all 0.3s ease;
}

a {
  color: #95B9D2 !important;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.card {
  border-radius: 1rem !important;
  overflow: hidden;
}

.alert-success {
  background: #e8f5e9;
  color: #95B9D2;
  border-color: #a5d6a7;
}

@media (max-width: 768px) {
  button, 
  a,
  input {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  
  button:active {
    transform: scale(0.98);
  }
}
</style>