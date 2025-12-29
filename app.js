// Osmofilter CRM Leads - Application Logic

class OsmofilterCRM {
    constructor() {
        this.companies = [];
        this.keywords = [];
        this.products = [];
        this.doubts = [];
        
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderAll();
    }
    
    async loadData() {
        try {
            // Cargar datos desde GitHub (archivos JSON)
            const [companiesRes, keywordsRes, productsRes, doubtsRes] = await Promise.all([
                fetch('data/companies.json'),
                fetch('data/keywords.json'),
                fetch('data/products.json'),
                fetch('data/doubts.json')
            ]);
            
            this.companies = await companiesRes.json();
            this.keywords = await keywordsRes.json();
            this.products = await productsRes.json();
            this.doubts = await doubtsRes.json();
        } catch (error) {
            console.log('Inicializando datos por primera vez...');
            // Si no existen los archivos, usar datos vacíos
            this.companies = [];
            this.keywords = [];
            this.products = [];
            this.doubts = [];
        }
    }
    
    setupEventListeners() {
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Filters
        document.getElementById('filterStatus').addEventListener('change', () => this.filterCompanies());
        document.getElementById('filterProduct').addEventListener('change', () => this.filterCompanies());
        document.getElementById('searchCompany').addEventListener('input', () => this.filterCompanies());
        
        // Modals
        document.getElementById('addKeywordBtn').addEventListener('click', () => this.showModal('keywordModal'));
        document.getElementById('addProductBtn').addEventListener('click', () => this.showModal('productModal'));
        
        // Close modals
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // Cancel buttons
        document.getElementById('cancelEdit')?.addEventListener('click', () => {
            document.getElementById('editModal').style.display = 'none';
        });
        document.getElementById('cancelKeyword')?.addEventListener('click', () => {
            document.getElementById('keywordModal').style.display = 'none';
        });
        document.getElementById('cancelProduct')?.addEventListener('click', () => {
            document.getElementById('productModal').style.display = 'none';
        });
        
        // Forms
        document.getElementById('editForm').addEventListener('submit', (e) => this.saveCompany(e));
        document.getElementById('keywordForm').addEventListener('submit', (e) => this.addKeyword(e));
        document.getElementById('productForm').addEventListener('submit', (e) => this.addProduct(e));
    }
    
    switchTab(tabName) {
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }
    
    renderAll() {
        this.updateStats();
        this.renderCompanies();
        this.renderProducts();
        this.renderKeywords();
        this.renderDoubts();
        this.populateProductFilter();
    }
    
    updateStats() {
        const total = this.companies.length;
        const pending = this.companies.filter(c => c.status === 'pending').length;
        const myClients = this.companies.filter(c => c.status === 'my-client').length;
        
        document.getElementById('totalCompanies').textContent = total;
        document.getElementById('pendingCompanies').textContent = pending;
        document.getElementById('myClients').textContent = myClients;
    }
    
    renderCompanies(filteredList = null) {
        const tbody = document.getElementById('companiesBody');
        const companiesToRender = filteredList || this.companies;
        
        if (companiesToRender.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <div class="empty-state-icon">📭</div>
                        <div class="empty-state-text">No hay empresas que mostrar</div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = companiesToRender.map(company => `
            <tr>
                <td><strong>${company.name}</strong></td>
                <td><a href="${company.url}" target="_blank">${this.truncateUrl(company.url)}</a></td>
                <td>
                    <div class="products-tags">
                        ${company.products.map(p => `<span class="product-tag">${p}</span>`).join('')}
                    </div>
                </td>
                <td><span class="status-badge status-${company.status}">${this.getStatusLabel(company.status)}</span></td>
                <td>${new Date(company.foundDate).toLocaleDateString('es-ES')}</td>
                <td>
                    <button class="btn-primary btn-small" onclick="crm.editCompany('${company.id}')">Editar</button>
                    <button class="btn-danger btn-small" onclick="crm.deleteCompany('${company.id}')">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }
    
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        
        if (this.products.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-state-icon">🛠️</div>
                    <div class="empty-state-text">No hay productos registrados aún</div>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.products.map(product => {
            const count = this.companies.filter(c => 
                c.products.some(p => p.toLowerCase().includes(product.name.toLowerCase()))
            ).length;
            
            return `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <div class="count">${count}</div>
                    <div class="label">empresas</div>
                    <button class="btn-danger btn-small" style="margin-top: 10px;" onclick="crm.deleteProduct('${product.id}')">Eliminar</button>
                </div>
            `;
        }).join('');
    }
    
    renderKeywords() {
        const container = document.getElementById('keywordsList');
        
        if (this.keywords.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No hay palabras clave configuradas</div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.keywords.map(keyword => `
            <div class="keyword-item">
                <div class="keyword-text">
                    <div class="keyword-name">${keyword.text}</div>
                    <div class="keyword-meta">${keyword.results || 0} resultados encontrados</div>
                </div>
                <span class="keyword-category">${keyword.category}</span>
                <button class="btn-danger btn-small" onclick="crm.deleteKeyword('${keyword.id}')">Eliminar</button>
            </div>
        `).join('');
    }
    
    renderDoubts() {
        const container = document.getElementById('doubtsContainer');
        
        if (this.doubts.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-state-icon">✅</div>
                    <div class="empty-state-text">No hay páginas pendientes de revisión</div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.doubts.map(doubt => `
            <div class="doubt-card">
                <h3>${doubt.title || 'Página sin título'}</h3>
                <a href="${doubt.url}" target="_blank">${doubt.url}</a>
                <p style="margin-top: 10px; color: #666;">${doubt.snippet || ''}</p>
                <div class="doubt-actions">
                    <button class="btn-success" onclick="crm.approveDoubt('${doubt.id}')">✅ Añadir</button>
                    <button class="btn-danger" onclick="crm.rejectDoubt('${doubt.id}')">❌ Descartar</button>
                </div>
            </div>
        `).join('');
    }
    
    populateProductFilter() {
        const select = document.getElementById('filterProduct');
        const uniqueProducts = [...new Set(this.companies.flatMap(c => c.products))];
        
        select.innerHTML = '<option value="all">Todos los productos</option>' +
            uniqueProducts.map(p => `<option value="${p}">${p}</option>`).join('');
    }
    
    filterCompanies() {
        const status = document.getElementById('filterStatus').value;
        const product = document.getElementById('filterProduct').value;
        const search = document.getElementById('searchCompany').value.toLowerCase();
        
        let filtered = this.companies;
        
        if (status !== 'all') {
            filtered = filtered.filter(c => c.status === status);
        }
        
        if (product !== 'all') {
            filtered = filtered.filter(c => c.products.includes(product));
        }
        
        if (search) {
            filtered = filtered.filter(c => 
                c.name.toLowerCase().includes(search) ||
                c.url.toLowerCase().includes(search)
            );
        }
        
        this.renderCompanies(filtered);
    }
    
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    
    editCompany(id) {
        const company = this.companies.find(c => c.id === id);
        if (!company) return;
        
        document.getElementById('editId').value = company.id;
        document.getElementById('editName').value = company.name;
        document.getElementById('editUrl').value = company.url;
        document.getElementById('editStatus').value = company.status;
        document.getElementById('editProducts').value = company.products.join(', ');
        document.getElementById('editNotes').value = company.notes || '';
        
        this.showModal('editModal');
    }
    
    async saveCompany(e) {
        e.preventDefault();
        
        const id = document.getElementById('editId').value;
        const company = this.companies.find(c => c.id === id);
        
        if (company) {
            company.name = document.getElementById('editName').value;
            company.url = document.getElementById('editUrl').value;
            company.status = document.getElementById('editStatus').value;
            company.products = document.getElementById('editProducts').value
                .split(',')
                .map(p => p.trim())
                .filter(p => p);
            company.notes = document.getElementById('editNotes').value;
            company.lastModified = new Date().toISOString();
        }
        
        await this.saveToGitHub();
        document.getElementById('editModal').style.display = 'none';
        this.renderAll();
        
        alert('✅ Empresa actualizada correctamente');
    }
    
    async deleteCompany(id) {
        if (!confirm('¿Seguro que quieres eliminar esta empresa?')) return;
        
        this.companies = this.companies.filter(c => c.id !== id);
        await this.saveToGitHub();
        this.renderAll();
    }
    
    async addKeyword(e) {
        e.preventDefault();
        
        const keyword = {
            id: Date.now().toString(),
            text: document.getElementById('newKeyword').value,
            category: document.getElementById('keywordCategory').value,
            results: 0,
            addedDate: new Date().toISOString()
        };
        
        this.keywords.push(keyword);
        await this.saveToGitHub();
        
        document.getElementById('keywordModal').style.display = 'none';
        document.getElementById('keywordForm').reset();
        this.renderKeywords();
        
        alert('✅ Palabra clave añadida. Se usará en la próxima búsqueda automática.');
    }
    
    async deleteKeyword(id) {
        if (!confirm('¿Seguro que quieres eliminar esta palabra clave?')) return;
        
        this.keywords = this.keywords.filter(k => k.id !== id);
        await this.saveToGitHub();
        this.renderKeywords();
    }
    
    async addProduct(e) {
        e.preventDefault();
        
        const product = {
            id: Date.now().toString(),
            name: document.getElementById('newProduct').value,
            category: document.getElementById('productCategory').value,
            addedDate: new Date().toISOString()
        };
        
        this.products.push(product);
        await this.saveToGitHub();
        
        document.getElementById('productModal').style.display = 'none';
        document.getElementById('productForm').reset();
        this.renderProducts();
    }
    
    async deleteProduct(id) {
        if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
        
        this.products = this.products.filter(p => p.id !== id);
        await this.saveToGitHub();
        this.renderProducts();
    }
    
    async approveDoubt(id) {
        const doubt = this.doubts.find(d => d.id === id);
        if (!doubt) return;
        
        // Crear nueva empresa desde la duda
        const newCompany = {
            id: Date.now().toString(),
            name: doubt.title || this.extractDomain(doubt.url),
            url: doubt.url,
            status: 'pending',
            products: [],
            foundDate: new Date().toISOString(),
            notes: doubt.snippet || ''
        };
        
        this.companies.push(newCompany);
        this.doubts = this.doubts.filter(d => d.id !== id);
        
        await this.saveToGitHub();
        this.renderAll();
        this.switchTab('empresas');
    }
    
    async rejectDoubt(id) {
        this.doubts = this.doubts.filter(d => d.id !== id);
        await this.saveToGitHub();
        this.renderDoubts();
    }
    
    async saveToGitHub() {
        // Esta función se conectará con GitHub API
        // Por ahora guardamos en localStorage como backup
        localStorage.setItem('osmofilter_companies', JSON.stringify(this.companies));
        localStorage.setItem('osmofilter_keywords', JSON.stringify(this.keywords));
        localStorage.setItem('osmofilter_products', JSON.stringify(this.products));
        localStorage.setItem('osmofilter_doubts', JSON.stringify(this.doubts));
        
        console.log('Datos guardados (se sincronizarán con GitHub)');
    }
    
    // Helper functions
    getStatusLabel(status) {
        const labels = {
            'pending': '⏳ Pendiente',
            'captured': '✅ Captado',
            'my-client': '👤 Mi Cliente',
            'colleague-client': '👥 Cliente Compañero',
            'in-progress': '🔄 En Proceso'
        };
        return labels[status] || status;
    }
    
    truncateUrl(url) {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain.length > 40 ? domain.substring(0, 40) + '...' : domain;
        } catch {
            return url.substring(0, 40) + '...';
        }
    }
    
    extractDomain(url) {
        try {
            return new URL(url).hostname.replace('www.', '').split('.')[0];
        } catch {
            return 'Empresa';
        }
    }
}

// Initialize app
let crm;
document.addEventListener('DOMContentLoaded', () => {
    crm = new OsmofilterCRM();
});
