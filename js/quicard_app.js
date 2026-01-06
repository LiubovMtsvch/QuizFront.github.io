//dashboard
// Quick action cards click
        document.querySelectorAll('.grid > div').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                alert(`${title} seçildi! Bu özellik yakında eklenecek.`);
            });
        });

//for settings.
        // Initialize icons
        lucide.createIcons();
        
        // Current active tab
        let currentTab = 'dashboard';
        
        // Tab switching function
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            
            // Remove active class from all sidebar links
            document.querySelectorAll('aside nav a').forEach(link => {
                link.classList.remove('bg-blue-900/30', 'text-blue-300');
                link.classList.add('text-slate-300');
            });
            
            // Add active class to current sidebar link
            const sidebarLink = document.querySelector(`aside nav a[onclick*="${tabName}"]`);
            if (sidebarLink) {
                sidebarLink.classList.add('bg-blue-900/30', 'text-blue-300');
                sidebarLink.classList.remove('text-slate-300');
            }
            
            // Show selected tab
            const selectedTab = document.getElementById(`${tabName}-tab`);
            if (selectedTab) {
                selectedTab.classList.remove('hidden');
                currentTab = tabName;
                
                // Update page title and subtitle
                const titles = {
                    'dashboard': { main: 'Ana Panel', sub: 'Fizik quizlerinizi yönetin' },
                    'profile': { main: 'Profil Ayarları', sub: 'Profil bilgilerinizi güncelleyin' },
                    'ai': { main: 'AI API Ayarları', sub: 'AI sağlayıcı ve API anahtarınızı yönetin' },
                    'security': { main: 'Güvenlik Ayarları', sub: 'Şifre ve oturum güvenliğiniz' },
                    'general': { main: 'Genel Ayarlar', sub: 'Tema, dil ve bildirim ayarları' },
                    'data': { main: 'Veri Yönetimi', sub: 'Verilerinizi yedekleyin veya silin' },
                    'billing': { main: 'Abonelik Ayarları', sub: 'Planınızı ve ödemelerinizi yönetin' }
                };
                
                document.getElementById('page-title').textContent = titles[tabName]?.main || 'Ayarlar';
                document.getElementById('page-subtitle').textContent = titles[tabName]?.sub || '';
                
                // Show/hide search bar based on tab
                const searchBar = document.getElementById('dashboard-search');
                if (tabName === 'dashboard') {
                    searchBar.classList.remove('hidden');
                } else {
                    searchBar.classList.add('hidden');
                }
                
                // Update mobile tab buttons
                document.querySelectorAll('#mobile-tabs .tab-button').forEach(button => {
                    if (button.textContent.includes(titles[tabName]?.main?.substring(0, 5))) {
                        button.classList.add('active');
                    }
                });
            }
            
            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        }
        
        // Toggle sidebar on mobile
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-sidebar-overlay');
            
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        }
        
        // Toggle notifications
        function toggleNotifications() {
            const dropdown = document.getElementById('notificationDropdown');
            dropdown.classList.toggle('hidden');
        }
        
        // Toggle API key visibility
        function toggleApiKeyVisibility() {
            const input = document.getElementById('api-key');
            const toggleText = document.getElementById('toggle-key-text');
            
            if (input.type === 'password') {
                input.type = 'text';
                toggleText.textContent = 'Gizle';
            } else {
                input.type = 'password';
                toggleText.textContent = 'Göster';
            }
        }
        
        // Toggle password visibility
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        }
        
        // Test API connection
        function testApiConnection() {
            const status = document.getElementById('api-status');
            const statusText = document.getElementById('api-status-text');
            
            // Simulate testing
            status.className = 'w-3 h-3 bg-yellow-500 rounded-full animate-pulse';
            statusText.textContent = 'Test ediliyor...';
            statusText.className = 'text-yellow-400 font-medium';
            
            setTimeout(() => {
                const success = Math.random() > 0.2; // 80% success rate
                
                if (success) {
                    status.className = 'w-3 h-3 bg-green-500 rounded-full';
                    statusText.textContent = 'Bağlantı başarılı';
                    statusText.className = 'text-green-400 font-medium';
                    showNotification('✅ AI API bağlantısı başarılı!', 'success');
                } else {
                    status.className = 'w-3 h-3 bg-red-500 rounded-full';
                    statusText.textContent = 'Bağlantı başarısız';
                    statusText.className = 'text-red-400 font-medium';
                    showNotification('❌ API anahtarı geçersiz veya bağlantı yok', 'error');
                }
            }, 1500);
        }
        
        // Change theme
        function setTheme(theme) {
            document.documentElement.classList.remove('dark', 'light');
            
            if (theme === 'auto') {
                // Check system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.add('light');
                }
            } else {
                document.documentElement.classList.add(theme);
            }
            
            // Save to localStorage
            localStorage.setItem('theme', theme);
            showNotification(`Tema ${theme} olarak ayarlandı`, 'success');
        }
        
        // Change password
        function changePassword() {
            const current = document.getElementById('current-password').value;
            const newPass = document.getElementById('new-password').value;
            const confirm = document.getElementById('confirm-password').value;
            
            if (!current || !newPass || !confirm) {
                showNotification('Lütfen tüm alanları doldurun', 'error');
                return;
            }
            
            if (newPass !== confirm) {
                showNotification('Yeni şifreler eşleşmiyor', 'error');
                return;
            }
            
            if (newPass.length < 8) {
                showNotification('Şifre en az 8 karakter olmalı', 'error');
                return;
            }
            
            // Simulate API call
            showNotification('Şifre değiştiriliyor...', 'info');
            
            setTimeout(() => {
                showNotification('✅ Şifreniz başarıyla değiştirildi', 'success');
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            }, 2000);
        }
        
        // Save all settings
        function saveAllSettings() {
            showNotification('Tüm ayarlar kaydediliyor...', 'info');
            
            // Simulate save process
            setTimeout(() => {
                showNotification('✅ Tüm ayarlar başarıyla kaydedildi', 'success');
            }, 1500);
        }
        
        // Show notification
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            document.querySelectorAll('.notification').forEach(n => n.remove());
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg border transform transition-all duration-300 ${
                type === 'success' ? 'bg-green-900/90 border-green-700' :
                type === 'error' ? 'bg-red-900/90 border-red-700' :
                'bg-blue-900/90 border-blue-700'
            }`;
            
            const icon = type === 'success' ? 'check-circle' : 
                        type === 'error' ? 'alert-circle' : 'info';
            
            notification.innerHTML = `
                <div class="flex items-center gap-3">
                    <i data-lucide="${icon}" class="w-5 h-5 ${type === 'success' ? 'text-green-300' : type === 'error' ? 'text-red-300' : 'text-blue-300'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            lucide.createIcons();
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
        
        // Handle AI provider change
        document.getElementById('ai-provider').addEventListener('change', function() {
            const customEndpoint = document.getElementById('custom-endpoint-container');
            if (this.value === 'custom') {
                customEndpoint.classList.remove('hidden');
            } else {
                customEndpoint.classList.add('hidden');
            }
        });
        
        // Handle daily limit slider
        document.getElementById('daily-limit').addEventListener('input', function() {
            document.getElementById('limit-value').textContent = `${this.value}/gün`;
        });
        
        // Handle 2FA toggle
        document.getElementById('2fa-toggle').addEventListener('change', function() {
            const setupDiv = document.getElementById('2fa-setup');
            if (this.checked) {
                setupDiv.classList.remove('hidden');
            } else {
                setupDiv.classList.add('hidden');
            }
        });
        
        // Password strength indicator
        document.getElementById('new-password').addEventListener('input', function() {
            const strengthBar = document.getElementById('password-strength-bar');
            const strengthText = document.getElementById('password-strength');
            const password = this.value;
            
            let strength = 0;
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 25) {
                strengthBar.className = 'bg-red-500 h-2 rounded-full';
                strengthText.textContent = 'Zayıf';
                strengthText.className = 'text-red-400 font-medium';
            } else if (strength < 50) {
                strengthBar.className = 'bg-orange-500 h-2 rounded-full';
                strengthText.textContent = 'Orta';
                strengthText.className = 'text-orange-400 font-medium';
            } else if (strength < 75) {
                strengthBar.className = 'bg-yellow-500 h-2 rounded-full';
                strengthText.textContent = 'İyi';
                strengthText.className = 'text-yellow-400 font-medium';
            } else {
                strengthBar.className = 'bg-green-500 h-2 rounded-full';
                strengthText.textContent = 'Güçlü';
                strengthText.className = 'text-green-400 font-medium';
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        // Initialize
        switchTab('dashboard');
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-sidebar-overlay');
            const menuButton = document.querySelector('button[onclick="toggleSidebar()"]');
            
            if (window.innerWidth < 768 && 
                !sidebar.contains(event.target) && 
                !menuButton.contains(event.target) && 
                !overlay.classList.contains('hidden')) {
                toggleSidebar();
            }
        });