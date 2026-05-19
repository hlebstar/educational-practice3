 let currentOrderId = null;

        async function loadOrders() {
            try {
                const response = await fetch('/api/all-orders');
                const data = await response.json();
                
                if (data.success) {
                    displayOrders(data.orders);
                    updateStats(data.orders);
                } else {
                    document.getElementById('ordersTable').innerHTML = 
                        '<tr><td colspan="10" style="text-align: center; color: red;"> Ошибка загрузки</td></tr>';
                }
            } catch (error) {
                document.getElementById('ordersTable').innerHTML = 
                    '<tr><td colspan="10" style="text-align: center; color: red;"> Ошибка соединения</td></tr>';
            }
        }

        function displayOrders(orders) {
            const tbody = document.getElementById('ordersTable');
            
            if (!orders || orders.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">Нет заявок</td></tr>';
                return;
            }

            let html = '';
            for (let order of orders) {
                let statusClass = '';
                let statusText = '';
                
                if (order.status === 'новая') {
                    statusClass = 'status-new';
                    statusText = 'Новая';
                } else if (order.status === 'в работе') {
                    statusClass = 'status-work';
                    statusText = ' В работе';
                } else if (order.status === 'выполнено') {
                    statusClass = 'status-done';
                    statusText = ' Выполнено';
                } else if (order.status === 'отменено') {
                    statusClass = 'status-canceled';
                    statusText = ' Отменено';
                }

                let actions = '';
                if (order.status === 'новая') {
                    actions = `<button class="btn-work" onclick="updateStatus(${order.id}, 'в работе')"> В работу</button>`;
                } else if (order.status === 'в работе') {
                    actions = `
                        <div class="action-group">
                            <button class="btn-done" onclick="updateStatus(${order.id}, 'выполнено')"> Выполнить</button>
                            <button class="btn-cancel" onclick="showCancelModal(${order.id})"> Отменить</button>
                        </div>
                    `;
                } else if (order.status === 'новая') {
                    actions = `<button class="btn-cancel" onclick="showCancelModal(${order.id})"> Отменить</button>`;
                } else {
                    actions = '<span style="color:#999;">—</span>';
                }

                html += `
                    <tr>
                        <td>${order.id}</td>
                        <td><strong>${order.full_name}</strong></td>
                        <td>
                            ${order.phone}<br>
                            <small style="color:#999;">${order.email || ''}</small>
                        </td>
                        <td style="max-width: 200px;">${order.address}</td>
                        <td>${order.service_type}</td>
                        <td>${order.desired_date}</td>
                        <td>${order.desired_time}</td>
                        <td>${order.payment_type}</td>
                        <td><span class="status ${statusClass}">${statusText}</span></td>
                        <td>${actions}</td>
                    </tr>
                `;
            }
            tbody.innerHTML = html;
        }

        function updateStats(orders) {
            const total = orders.length;
            const newCount = orders.filter(o => o.status === 'новая').length;
            const workCount = orders.filter(o => o.status === 'в работе').length;
            const doneCount = orders.filter(o => o.status === 'выполнено').length;
            
            document.getElementById('totalCount').textContent = total;
            document.getElementById('newCount').textContent = newCount;
            document.getElementById('workCount').textContent = workCount;
            document.getElementById('doneCount').textContent = doneCount;
        }

        async function updateStatus(orderId, status) {
            try {
                const response = await fetch('/api/update-order-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order_id: orderId, status, cancel_reason: null })
                });
                const data = await response.json();
                if (data.success) {
                    loadOrders();
                } else {
                    alert(' ' + (data.error || 'Ошибка'));
                }
            } catch (error) {
                alert(' Ошибка соединения');
            }
        }

        function showCancelModal(orderId) {
            currentOrderId = orderId;
            document.getElementById('cancelModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('cancelModal').style.display = 'none';
            document.getElementById('cancelReason').value = '';
            currentOrderId = null;
        }

        document.getElementById('confirmCancelBtn').onclick = async function() {
            const reason = document.getElementById('cancelReason').value.trim();
            if (!reason) {
                alert(' Укажите причину отмены');
                return;
            }
            
            try {
                const response = await fetch('/api/update-order-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ order_id: currentOrderId, status: 'отменено', cancel_reason: reason })
                });
                const data = await response.json();
                if (data.success) {
                    closeModal();
                    loadOrders();
                } else {
                    alert(' ' + (data.error || 'Ошибка'));
                }
            } catch (error) {
                alert(' Ошибка соединения');
            }
        };

        loadOrders();