<template>
  <div>
    <header class="header">
      <div class="header-row">
        <div class="logo">Мой не Сам</div>
        <div class="nav-right">
          <router-link to="/login" class="login-link">Войти</router-link>
          <router-link to="/register" class="reg-link">Регистрация</router-link>
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-row">
        <div class="hero-left">
          <h1>Клининговые услуги<br>для вашего дома</h1>
          <p>Безопасная уборка с использованием экологичных средств. Заботимся о вашем здоровье и природе.</p>
          <div class="hero-buttons">
            <router-link to="/register" class="btn-services">Заказать уборку</router-link>
          </div>
        </div>
        <div class="hero-right">
          <div class="product-card">
            <div class="product-img"></div>
            <div class="product-img-overlay"></div>
            <div class="product-brand">RSSMANN 750ml</div>
          </div>
        </div>
      </div>
    </section>

    <section class="full-image-section">
      <div class="image-overlay"></div>
      <div class="image-content">
        <h2>Профессиональная уборка</h2>
        <p>Качество, которому доверяют тысячи клиентов</p>
      </div>
    </section>

    <section class="services">
      <div class="services-container">
        <h2 class="services-title">Наши услуги</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-img service-img-1">
              <div class="img-overlay"></div>
            </div>
            <h3>Общий клининг</h3>
            <p>Поддержание чистоты в квартирах и офисах</p>
          </div>
          <div class="service-card">
            <div class="service-img service-img-2">
              <div class="img-overlay"></div>
            </div>
            <h3>Генеральная уборка</h3>
            <p>Полная уборка всех поверхностей и углов</p>
          </div>
          <div class="service-card">
            <div class="service-img service-img-3">
              <div class="img-overlay"></div>
            </div>
            <h3>Послестроительная уборка</h3>
            <p>Удаление пыли и строительного мусора</p>
          </div>
          <div class="service-card">
            <div class="service-img service-img-4">
              <div class="img-overlay"></div>
            </div>
            <h3>Химчистка ковров</h3>
            <p>Глубокая чистка и выведение пятен</p>
          </div>
          <div class="service-card">
            <div class="service-img service-img-5">
              <div class="img-overlay"></div>
            </div>
            <h3>Мойка окон</h3>
            <p>Чистота стекол и подоконников</p>
          </div>
          <div class="service-card">
            <div class="service-img service-img-6">
              <div class="img-overlay"></div>
            </div>
            <h3>Дезинфекция помещений</h3>
            <p>Обеззараживание воздуха и поверхностей</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-col">
          <h3>Мой не Сам</h3>
          <p>Эко-клининг для вашего дома</p>
        </div>
        <div class="footer-col">
          <h3>Контакты</h3>
          <p>Телефон: +7 (999) 999-99-99</p>
          <p>Email: info@moinesam.ru</p>
          <p>Адрес: г. Великий Новгород</p>
        </div>
        <div class="footer-col">
          <h3>Часы работы</h3>
          <p>Пн-Пт: 9:00 - 19:00</p>
          <p>Сб-Вс: 10:00 - 18:00</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  background: white;
  padding: 20px 60px;
  border-bottom: 1px solid #eee;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login-link {
  text-decoration: none;
  color: #2e7d32;
  font-size: 14px;
}

.reg-link {
  background: #2e7d32;
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 14px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
}

.hero {
  padding: 80px 60px;
  background: #f9f9f9;
  min-height: calc(100vh - 80px);
}

.hero-row {
  display: flex;
  gap: 60px;
  align-items: center;
}

.hero-left {
  flex: 1;
}

.hero-left h1 {
  font-size: 48px;
  color: #2e7d32;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-left p {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.btn-services {
  border: 2px solid #2e7d32;
  color: #2e7d32;
  padding: 14px 35px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
}

.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.product-card {
  width: 320px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.product-img {
  width: 100%;
  height: 400px;
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\03_general_cleaning_modern_room_mop.jpg');
  background-size: cover;
  background-position: center;
}

.product-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.product-brand {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  z-index: 2;
}

.full-image-section {
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\01_general_cleaning_living_room_mop.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.image-content {
  position: relative;
  z-index: 1;
  color: white;
  max-width: 600px;
  padding: 20px;
}

.image-content h2 {
  font-size: 42px;
  margin-bottom: 20px;
}

.image-content p {
  font-size: 18px;
  margin-bottom: 30px;
}

.services {
  padding: 80px 60px;
  background: white;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-title {
  text-align: center;
  font-size: 36px;
  color: #2e7d32;
  margin-bottom: 50px;
}

.services-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.service-card {
  width: 350px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-img {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.service-img-1 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\06_carpet_vacuum_cleaning.jpg');
}

.service-img-2 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\07_office_corridor_cleaning.jpg');
}

.service-img-3 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\12_eco_cleaning_products.jpg');
}

.service-img-4 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\10_cleaning_products_shelf.jpg');
}

.service-img-5 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\15_glass_building_window_cleaning.jpg');
}

.service-img-6 {
  background-image: url('D:\птк сесии\modulpodgotovka\public\src\images\09_cleaning_product_bottle.jpg');
}

.service-card h3 {
  font-size: 20px;
  color: #2e7d32;
  margin: 20px 0 10px;
  padding: 0 15px;
}

.service-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 15px;
}

.footer {
  background: #1a1a1a;
  color: #ccc;
  padding: 50px 60px 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  justify-content: space-between;
  margin-bottom: 40px;
}

.footer-col {
  min-width: 200px;
}

.footer-col h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
}

.footer-col p {
  margin: 8px 0;
  font-size: 14px;
}
</style>