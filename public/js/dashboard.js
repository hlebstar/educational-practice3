   async function loadOrders() {
            try {
                const response = await fetch('/api/my-orders');
                const data = await response.json();
                
                console.log('Ответ от сервера:', data);
                
                if (!data.success) {
                    document.getElementById('ordersContainer').innerHTML = 
                        '<div class="error"> ' + (data.error || 'Ошибка загрузки') + '</div>';
                    return;
                }
                
                if (data.orders.length === 0) {
                    document.getElementById('ordersContainer').innerHTML = `
                        <div class="empty">
                             У вас пока нет заявок<br><br>
                            <a href="/new-order" class="btn btn-green">Создать заявку</a>
                        </div>
                    `;
                    return;
                }
                
                let html = '';
                for (let order of data.orders) {
                    let statusClass = '';
                    let statusText = '';
                    
                    if (order.status === 'новая') {
                        statusClass = 'status-new';
                        statusText = ' Новая';
                    } else if (order.status === 'в работе') {
                        statusClass = 'status-work';
                        statusText = ' В работе';
                    } else if (order.status === 'выполнено') {
                        statusClass = 'status-done';
                        statusText = ' Выполнено';
                    } else if (order.status === 'отменено') {
                        statusClass = 'status-canceled';
                        statusText = ' Отменено';
                    } else {
                        statusClass = 'status-new';
                        statusText = order.status;
                    }
                    
                    html += `
                        <div class="order-card">
                            <div class="order-header">
                                <span class="order-id">Заявка №${order.id}</span>
                                <span class="status ${statusClass}">${statusText}</span>
                            </div>
                            <div class="order-info">
                                <p><strong> Адрес:</strong> ${order.address}</p>
                                <p><strong> Контакт:</strong> ${order.contact}</p>
                                <p><strong> Услуга:</strong> ${order.service_type}</p>
                                <p><strong> Оплата:</strong> ${order.payment_type}</p>
                                <p><strong> Дата:</strong> ${order.desired_date} | ⏰ ${order.desired_time}</p>
                            </div>
                            ${order.cancel_reason ? `<div style="background:#ffebee; padding:8px; border-radius:8px; margin-top:10px;"><strong>❌ Причина отмены:</strong> ${order.cancel_reason}</div>` : ''}
                        </div>
                    `;
                }
                
                document.getElementById('ordersContainer').innerHTML = html;
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('ordersContainer').innerHTML = 
                    '<div class="error"> Ошибка соединения с сервером</div>';
            }
        }
        
        loadOrders();