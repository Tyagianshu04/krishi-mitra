// ============================================
// Charts & Visualization Module
// Location-aware crop comparison with detailed analytics
// ============================================

class CropCharts {
    constructor() {
        this.selectedCrops = [];
        this.availableCrops = [];
        this.currentState = null;
        this.currentDistrict = null;
        this.currentDistrictName = '';
        this.currentSeason = null;
        this.colors = [
            '#4a7c2c', '#1976d2', '#f5a623', '#c2185b', '#6ba83e',
            '#2d5016', '#52a447', '#ff7043', '#7b1fa2', '#00897b'
        ];
        this.init();
    }

    init() {
        this.populateStateDropdown();
    }

    populateStateDropdown() {
        const stateSelect = document.getElementById('comparisonStateSelect');
        if (!stateSelect) return;

        // Get states from agricultural data
        const states = INDIA_AGRICULTURAL_DATA?.states || {};
        
        let html = '<option value="">-- Select State --</option>';
        Object.entries(states).forEach(([code, state]) => {
            html += `<option value="${code}">${state.name}</option>`;
        });
        
        stateSelect.innerHTML = html;
    }

    onStateChange(stateCode) {
        this.currentState = parseInt(stateCode);
        this.currentDistrict = null;
        this.currentDistrictName = '';
        this.selectedCrops = [];
        
        // Populate districts dropdown
        const districtSelect = document.getElementById('comparisonDistrictSelect');
        if (districtSelect && typeof DISTRICTS_DATA !== 'undefined') {
            const districts = DISTRICTS_DATA[stateCode] || [];
            let html = '<option value="">-- Select District --</option>';
            districts.forEach(d => {
                html += `<option value="${d.code}">${d.name}</option>`;
            });
            districtSelect.innerHTML = html;
        }
        
        this.updateCropSelector();
    }

    onDistrictChange(districtCode) {
        this.currentDistrict = parseInt(districtCode);
        
        // Get district name
        const districtSelect = document.getElementById('comparisonDistrictSelect');
        if (districtSelect) {
            this.currentDistrictName = districtSelect.options[districtSelect.selectedIndex]?.text || '';
        }
        
        this.selectedCrops = [];
        this.updateCropSelector();
    }

    onSeasonChange(seasonId) {
        this.currentSeason = parseInt(seasonId);
        this.selectedCrops = [];
        this.updateCropSelector();
    }

    updateCropSelector() {
        const grid = document.getElementById('cropSelectorGrid');
        if (!grid) return;

        if (!this.currentState || !this.currentSeason) {
            grid.innerHTML = '<p style="color: #9e9e9e; grid-column: 1/-1; text-align: center; padding: 20px;">Please select state, district and season to see available crops</p>';
            document.getElementById('comparisonResults')?.classList.add('hidden');
            return;
        }

        // Get crops from agricultural data for this state/season
        const agData = getAgriculturalData(this.currentState, this.currentDistrictName, this.currentSeason);
        if (!agData || !agData.crops) {
            grid.innerHTML = '<p style="color: #d93636; grid-column: 1/-1; text-align: center; padding: 20px;">No crop data available for this selection</p>';
            return;
        }

        this.availableCrops = agData.crops.map(crop => ({
            name: crop.name,
            scientific_name: crop.scientific_name || '',
            duration: crop.duration_days || 120,
            water_requirement: crop.water_requirement || 'Medium',
            profit: crop.profit_per_hectare || ((crop.avg_yield_quintal_per_hectare || 30) * (crop.msp || 2000) - (crop.investment_per_hectare || 40000)),
            investment: crop.investment_per_hectare || 40000,
            yield: crop.avg_yield_quintal_per_hectare || 30,
            msp: crop.msp || 0,
            is_specialty: crop.is_specialty || false,
            is_major_crop: crop.is_major_crop || false,
            suitability: crop.suitability_score || 75,
            specialty_reason: crop.specialty_reason || ''
        }));

        const stateName = agData.state?.name || 'Selected State';
        const districtLabel = this.currentDistrictName ? `, ${this.currentDistrictName}` : '';
        const seasonNames = { 1: 'Kharif', 2: 'Rabi', 3: 'Zaid' };

        grid.innerHTML = `
            <div style="grid-column: 1/-1; background: #f1f8e9; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #4a7c2c;">
                <p style="margin: 0; color: #2d5016; font-size: 0.9rem;">
                    <strong>${this.availableCrops.length} crops</strong> available for <strong>${stateName}${districtLabel}</strong> in <strong>${seasonNames[this.currentSeason]}</strong> season
                </p>
            </div>
            ${this.availableCrops.map((crop, index) => `
                <label class="crop-checkbox" style="display: flex; align-items: center; gap: 10px; padding: 12px; background: ${crop.is_specialty ? '#fff3e0' : crop.is_major_crop ? '#e3f2fd' : '#fafafa'}; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;" 
                    onmouseover="this.style.borderColor='#4a7c2c'" onmouseout="this.style.borderColor='transparent'">
                    <input type="checkbox" value="${index}" onchange="cropCharts.toggleCrop(${index}, this.checked)" style="width: 18px; height: 18px; accent-color: #4a7c2c;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #1a3d0a; font-size: 0.95rem;">${crop.name}</div>
                        <div style="display: flex; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
                            ${crop.is_specialty ? '<span style="font-size: 0.7rem; background: #ff9800; color: white; padding: 2px 6px; border-radius: 3px;">SPECIALTY</span>' : ''}
                            ${crop.is_major_crop ? '<span style="font-size: 0.7rem; background: #1976d2; color: white; padding: 2px 6px; border-radius: 3px;">MAJOR CROP</span>' : ''}
                            <span style="font-size: 0.75rem; color: #757575;">${crop.duration} days</span>
                            <span style="font-size: 0.75rem; color: #4a7c2c;">Rs ${(crop.profit/1000).toFixed(0)}K/ha</span>
                        </div>
                    </div>
                </label>
            `).join('')}
        `;
    }

    toggleCrop(cropIndex, isSelected) {
        if (isSelected) {
            if (this.selectedCrops.length >= 5) {
                event.target.checked = false;
                this.showToast('You can compare up to 5 crops at a time', 'warning');
                return;
            }
            this.selectedCrops.push(cropIndex);
        } else {
            this.selectedCrops = this.selectedCrops.filter(c => c !== cropIndex);
        }

        this.updateComparison();
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const colors = { warning: '#f5a623', info: '#1976d2', success: '#4a7c2c', error: '#d93636' };
        toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: ${colors[type]}; color: white; padding: 14px 24px; border-radius: 6px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 0.9rem;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    updateComparison() {
        const resultsContainer = document.getElementById('comparisonResults');
        if (!resultsContainer) return;

        if (this.selectedCrops.length < 2) {
            resultsContainer.classList.add('hidden');
            return;
        }

        resultsContainer.classList.remove('hidden');
        this.renderComparison();
    }

    getSelectedCropData() {
        return this.selectedCrops.map(index => this.availableCrops[index]);
    }

    renderComparison() {
        const resultsContainer = document.getElementById('comparisonResults');
        const crops = this.getSelectedCropData();
        
        resultsContainer.innerHTML = `
            <div style="background: #e8f5e9; padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #4a7c2c;">
                <h3 style="margin: 0 0 8px 0; color: #2d5016;">Comparing ${crops.length} Crops</h3>
                <p style="margin: 0; color: #33691e; font-size: 0.9rem;">${crops.map(c => c.name).join(' vs ')}</p>
            </div>

            <!-- Quick Summary Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
                ${this.renderQuickSummaryCards(crops)}
            </div>

            <!-- Profit Comparison Chart -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Profit Comparison (Rs per Hectare)</h3>
                <canvas id="profitChart" style="width: 100%; height: 300px;"></canvas>
            </div>

            <!-- Investment vs Return Chart -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Investment vs Return Analysis</h3>
                <canvas id="investmentChart" style="width: 100%; height: 300px;"></canvas>
            </div>

            <!-- Duration & Profit per Day Chart -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Profit per Day (Daily Earning Potential)</h3>
                <canvas id="profitPerDayChart" style="width: 100%; height: 300px;"></canvas>
            </div>

            <!-- Water Requirement Chart -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Water Requirement Comparison</h3>
                <canvas id="waterChart" style="width: 100%; height: 250px;"></canvas>
            </div>

            <!-- ROI Comparison Chart -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Return on Investment (ROI %)</h3>
                <canvas id="roiChart" style="width: 100%; height: 300px;"></canvas>
            </div>

            <!-- Duration Timeline -->
            <div class="card" style="margin-bottom: 24px; padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Crop Duration Timeline</h3>
                <canvas id="timelineChart" style="width: 100%; height: 200px;"></canvas>
            </div>

            <!-- Detailed Comparison Table -->
            <div class="card" style="padding: 24px;">
                <h3 style="color: #2d5016; margin-bottom: 16px;">Detailed Comparison Table</h3>
                ${this.renderComparisonTable(crops)}
            </div>

            <!-- Recommendation Summary -->
            <div class="card" style="margin-top: 24px; padding: 24px; background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%);">
                ${this.renderRecommendationSummary(crops)}
            </div>
        `;

        // Draw all charts
        setTimeout(() => {
            this.drawProfitChart(crops);
            this.drawInvestmentChart(crops);
            this.drawProfitPerDayChart(crops);
            this.drawWaterChart(crops);
            this.drawROIChart(crops);
            this.drawTimelineChart(crops);
        }, 100);
    }

    renderQuickSummaryCards(crops) {
        // Find best in each category
        const bestProfit = crops.reduce((a, b) => a.profit > b.profit ? a : b);
        const bestProfitPerDay = crops.reduce((a, b) => (a.profit/a.duration) > (b.profit/b.duration) ? a : b);
        const lowestInvestment = crops.reduce((a, b) => a.investment < b.investment ? a : b);
        const quickest = crops.reduce((a, b) => a.duration < b.duration ? a : b);
        const bestROI = crops.reduce((a, b) => (a.profit/a.investment) > (b.profit/b.investment) ? a : b);

        return `
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #4a7c2c; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 1px;">Highest Profit</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #2d5016; margin-top: 4px;">${bestProfit.name}</div>
                <div style="font-size: 0.9rem; color: #4a7c2c;">Rs ${bestProfit.profit.toLocaleString()}/ha</div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #1976d2; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 1px;">Best Daily Earning</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #0d47a1; margin-top: 4px;">${bestProfitPerDay.name}</div>
                <div style="font-size: 0.9rem; color: #1976d2;">Rs ${Math.round(bestProfitPerDay.profit/bestProfitPerDay.duration).toLocaleString()}/day</div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #f5a623; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 1px;">Lowest Investment</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #e65100; margin-top: 4px;">${lowestInvestment.name}</div>
                <div style="font-size: 0.9rem; color: #f5a623;">Rs ${lowestInvestment.investment.toLocaleString()}/ha</div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #7b1fa2; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 1px;">Quickest Returns</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #7b1fa2; margin-top: 4px;">${quickest.name}</div>
                <div style="font-size: 0.9rem; color: #9c27b0;">${quickest.duration} days</div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #00897b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 1px;">Best ROI</div>
                <div style="font-size: 1.1rem; font-weight: 600; color: #00695c; margin-top: 4px;">${bestROI.name}</div>
                <div style="font-size: 0.9rem; color: #00897b;">${Math.round((bestROI.profit/bestROI.investment)*100)}% return</div>
            </div>
        `;
    }

    drawProfitChart(crops) {
        const canvas = document.getElementById('profitChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const labels = crops.map(c => c.name);
        const data = crops.map(c => c.profit);
        
        this.drawBarChart(ctx, canvas, labels, data, 'Rs ', '', this.colors);
    }

    drawInvestmentChart(crops) {
        const canvas = document.getElementById('investmentChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = chartWidth / crops.length;
        const maxValue = Math.max(...crops.map(c => Math.max(c.profit, c.investment)));

        // Draw bars for each crop (investment and revenue side by side)
        crops.forEach((crop, index) => {
            const x = padding + index * barWidth;
            const singleBarWidth = barWidth * 0.35;
            
            // Investment bar (lighter color)
            const invHeight = (crop.investment / maxValue) * chartHeight;
            ctx.fillStyle = '#ffcdd2';
            ctx.fillRect(x + barWidth * 0.1, canvas.height - padding - invHeight, singleBarWidth, invHeight);
            
            // Profit bar (green)
            const profitHeight = (crop.profit / maxValue) * chartHeight;
            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.fillRect(x + barWidth * 0.1 + singleBarWidth + 5, canvas.height - padding - profitHeight, singleBarWidth, profitHeight);

            // Labels
            ctx.fillStyle = '#424242';
            ctx.font = '11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Rs ' + (crop.investment/1000).toFixed(0) + 'K', x + barWidth * 0.1 + singleBarWidth/2, canvas.height - padding - invHeight - 5);
            ctx.fillText('Rs ' + (crop.profit/1000).toFixed(0) + 'K', x + barWidth * 0.1 + singleBarWidth + 5 + singleBarWidth/2, canvas.height - padding - profitHeight - 5);

            // Crop name
            ctx.save();
            ctx.translate(x + barWidth/2, canvas.height - padding + 20);
            ctx.font = '12px Arial';
            ctx.fillText(crop.name.substring(0, 15), 0, 0);
            ctx.restore();
        });

        // Legend
        ctx.fillStyle = '#ffcdd2';
        ctx.fillRect(canvas.width - 150, 20, 15, 15);
        ctx.fillStyle = '#424242';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Investment', canvas.width - 130, 32);
        
        ctx.fillStyle = '#4a7c2c';
        ctx.fillRect(canvas.width - 150, 40, 15, 15);
        ctx.fillStyle = '#424242';
        ctx.fillText('Profit', canvas.width - 130, 52);

        // Axes
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
    }

    drawProfitPerDayChart(crops) {
        const canvas = document.getElementById('profitPerDayChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const labels = crops.map(c => c.name);
        const data = crops.map(c => Math.round(c.profit / c.duration));
        
        // Custom colors - highlight the best performer
        const maxVal = Math.max(...data);
        const colors = data.map((val, i) => val === maxVal ? '#4a7c2c' : '#90a4ae');
        
        this.drawBarChart(ctx, canvas, labels, data, 'Rs ', '/day', colors);
    }

    drawWaterChart(crops) {
        const canvas = document.getElementById('waterChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 250;

        const waterValues = { 'Very Low': 1, 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5 };
        const waterColors = { 'Very Low': '#81c784', 'Low': '#aed581', 'Medium': '#fff176', 'High': '#ffb74d', 'Very High': '#ef5350' };
        
        const labels = crops.map(c => c.name);
        const data = crops.map(c => waterValues[c.water_requirement] || 3);
        const colors = crops.map(c => waterColors[c.water_requirement] || '#fff176');

        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = chartWidth / labels.length;
        const maxValue = 5;

        labels.forEach((label, index) => {
            const value = data[index];
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * barWidth + barWidth * 0.15;
            const y = canvas.height - padding - barHeight;
            const width = barWidth * 0.7;
            
            ctx.fillStyle = colors[index];
            ctx.fillRect(x, y, width, barHeight);
            
            // Water requirement text
            ctx.fillStyle = '#424242';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(crops[index].water_requirement, x + width / 2, y - 8);
            
            // Crop name
            ctx.font = '11px Arial';
            ctx.fillText(label.substring(0, 12), x + width / 2, canvas.height - padding + 18);
        });

        // Y-axis labels
        const yLabels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        yLabels.forEach((label, i) => {
            const y = canvas.height - padding - ((i + 1) / 5) * chartHeight;
            ctx.fillStyle = '#9e9e9e';
            ctx.fillText(label, padding - 5, y + 4);
        });
    }

    drawROIChart(crops) {
        const canvas = document.getElementById('roiChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        const labels = crops.map(c => c.name);
        const data = crops.map(c => Math.round((c.profit / c.investment) * 100));
        
        // Gradient colors based on ROI value
        const colors = data.map(val => {
            if (val >= 200) return '#2e7d32';
            if (val >= 150) return '#4a7c2c';
            if (val >= 100) return '#689f38';
            if (val >= 50) return '#9e9d24';
            return '#f57f17';
        });
        
        this.drawBarChart(ctx, canvas, labels, data, '', '%', colors);
    }

    drawTimelineChart(crops) {
        const canvas = document.getElementById('timelineChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;

        const padding = { left: 120, right: 60, top: 30, bottom: 30 };
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const maxDuration = Math.max(...crops.map(c => c.duration));
        const rowHeight = chartHeight / crops.length;

        crops.forEach((crop, index) => {
            const y = padding.top + index * rowHeight + rowHeight * 0.2;
            const barWidth = (crop.duration / maxDuration) * chartWidth;
            const barHeight = rowHeight * 0.6;
            
            // Draw timeline bar
            ctx.fillStyle = this.colors[index % this.colors.length];
            ctx.fillRect(padding.left, y, barWidth, barHeight);
            
            // Draw crop name on left
            ctx.fillStyle = '#424242';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(crop.name.substring(0, 15), padding.left - 10, y + barHeight/2 + 4);
            
            // Draw duration on bar
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.font = 'bold 11px Arial';
            ctx.fillText(`${crop.duration} days`, padding.left + 10, y + barHeight/2 + 4);
        });

        // Draw scale at bottom
        ctx.fillStyle = '#9e9e9e';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 4; i++) {
            const days = Math.round((maxDuration / 4) * i);
            const x = padding.left + (chartWidth / 4) * i;
            ctx.fillText(`${days}d`, x, canvas.height - 10);
        }
    }

    drawBarChart(ctx, canvas, labels, data, prefix = '', suffix = '', colors = null) {
        const padding = 60;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const maxValue = Math.max(...data);
        const barWidth = chartWidth / labels.length;
        
        labels.forEach((label, index) => {
            const value = data[index];
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * barWidth + barWidth * 0.15;
            const y = canvas.height - padding - barHeight;
            const width = barWidth * 0.7;
            
            // Draw bar
            ctx.fillStyle = colors ? (Array.isArray(colors) ? colors[index % colors.length] : colors) : this.colors[index % this.colors.length];
            ctx.fillRect(x, y, width, barHeight);
            
            // Draw value on top
            ctx.fillStyle = '#2c3e20';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            const displayValue = value >= 1000 ? (value/1000).toFixed(0) + 'K' : value.toLocaleString();
            ctx.fillText(prefix + displayValue + suffix, x + width / 2, y - 8);
            
            // Draw label below bar
            ctx.save();
            ctx.translate(x + width / 2, canvas.height - padding + 15);
            ctx.rotate(-Math.PI / 8);
            ctx.font = '11px Arial';
            ctx.fillStyle = '#424242';
            ctx.textAlign = 'right';
            ctx.fillText(label.substring(0, 15), 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
    }

    renderComparisonTable(crops) {
        return `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; min-width: 700px;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 14px; text-align: left; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Crop</th>
                            <th style="padding: 14px; text-align: right; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Investment</th>
                            <th style="padding: 14px; text-align: right; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Profit/ha</th>
                            <th style="padding: 14px; text-align: right; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Duration</th>
                            <th style="padding: 14px; text-align: right; border-bottom: 2px solid #4a7c2c; color: #1976d2; font-weight: 700;">Profit/Day</th>
                            <th style="padding: 14px; text-align: right; border-bottom: 2px solid #4a7c2c; color: #2d5016;">ROI %</th>
                            <th style="padding: 14px; text-align: center; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Water</th>
                            <th style="padding: 14px; text-align: center; border-bottom: 2px solid #4a7c2c; color: #2d5016;">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crops.map((crop, i) => {
                            const profitPerDay = Math.round(crop.profit / crop.duration);
                            const roi = Math.round((crop.profit / crop.investment) * 100);
                            const waterColors = { 'Very Low': '#81c784', 'Low': '#aed581', 'Medium': '#fff176', 'High': '#ffb74d', 'Very High': '#ef5350' };
                            
                            return `
                                <tr style="border-bottom: 1px solid #e0e0e0; ${i % 2 === 0 ? 'background: #fafafa;' : ''}">
                                    <td style="padding: 14px;">
                                        <div style="font-weight: 600; color: #1a3d0a;">${crop.name}</div>
                                        ${crop.scientific_name ? `<div style="font-size: 0.8rem; color: #757575; font-style: italic;">${crop.scientific_name}</div>` : ''}
                                    </td>
                                    <td style="padding: 14px; text-align: right; color: #d32f2f;">Rs ${crop.investment.toLocaleString()}</td>
                                    <td style="padding: 14px; text-align: right; color: #2d5016; font-weight: 600;">Rs ${crop.profit.toLocaleString()}</td>
                                    <td style="padding: 14px; text-align: right;">${crop.duration} days</td>
                                    <td style="padding: 14px; text-align: right; font-weight: 700; color: #1976d2; background: #e3f2fd;">Rs ${profitPerDay.toLocaleString()}</td>
                                    <td style="padding: 14px; text-align: right; color: ${roi >= 100 ? '#2e7d32' : '#f57f17'}; font-weight: 600;">${roi}%</td>
                                    <td style="padding: 14px; text-align: center;">
                                        <span style="background: ${waterColors[crop.water_requirement] || '#fff176'}; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem;">${crop.water_requirement}</span>
                                    </td>
                                    <td style="padding: 14px; text-align: center;">
                                        ${crop.is_specialty ? '<span style="background: #ff9800; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">SPECIALTY</span>' : 
                                          crop.is_major_crop ? '<span style="background: #1976d2; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">MAJOR</span>' : 
                                          '<span style="background: #9e9e9e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">SUITABLE</span>'}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderRecommendationSummary(crops) {
        // Find the best crop based on different criteria
        const bestProfit = crops.reduce((a, b) => a.profit > b.profit ? a : b);
        const bestProfitPerDay = crops.reduce((a, b) => (a.profit/a.duration) > (b.profit/b.duration) ? a : b);
        const bestROI = crops.reduce((a, b) => (a.profit/a.investment) > (b.profit/b.investment) ? a : b);
        const lowestRisk = crops.reduce((a, b) => a.investment < b.investment ? a : b);

        // Count wins
        const wins = {};
        [bestProfit, bestProfitPerDay, bestROI, lowestRisk].forEach(crop => {
            wins[crop.name] = (wins[crop.name] || 0) + 1;
        });
        const overallBest = Object.entries(wins).sort((a, b) => b[1] - a[1])[0][0];

        return `
            <h3 style="color: #2d5016; margin: 0 0 16px 0;">Analysis Summary & Recommendation</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 20px;">
                <div style="background: white; padding: 14px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #757575; margin-bottom: 4px;">For Maximum Profit</div>
                    <div style="font-weight: 600; color: #2d5016;">${bestProfit.name}</div>
                    <div style="font-size: 0.85rem; color: #4a7c2c;">Rs ${bestProfit.profit.toLocaleString()}/ha total return</div>
                </div>
                <div style="background: white; padding: 14px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #757575; margin-bottom: 4px;">For Best Daily Returns</div>
                    <div style="font-weight: 600; color: #1976d2;">${bestProfitPerDay.name}</div>
                    <div style="font-size: 0.85rem; color: #1976d2;">Rs ${Math.round(bestProfitPerDay.profit/bestProfitPerDay.duration).toLocaleString()}/day earning</div>
                </div>
                <div style="background: white; padding: 14px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #757575; margin-bottom: 4px;">For Best ROI</div>
                    <div style="font-weight: 600; color: #00897b;">${bestROI.name}</div>
                    <div style="font-size: 0.85rem; color: #00897b;">${Math.round((bestROI.profit/bestROI.investment)*100)}% return on investment</div>
                </div>
                <div style="background: white; padding: 14px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: #757575; margin-bottom: 4px;">For Low Risk/Investment</div>
                    <div style="font-weight: 600; color: #f5a623;">${lowestRisk.name}</div>
                    <div style="font-size: 0.85rem; color: #e65100;">Only Rs ${lowestRisk.investment.toLocaleString()}/ha investment</div>
                </div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #4a7c2c;">
                <div style="font-size: 0.9rem; color: #757575; margin-bottom: 8px;">Overall Recommendation</div>
                <div style="font-size: 1.2rem; font-weight: 700; color: #2d5016; margin-bottom: 8px;">${overallBest}</div>
                <p style="margin: 0; color: #424242; font-size: 0.9rem; line-height: 1.6;">
                    Based on the comparison of ${crops.length} crops, <strong>${overallBest}</strong> emerges as the best overall choice, 
                    balancing profitability, risk, and time to returns. 
                    ${crops.find(c => c.name === overallBest)?.specialty_reason ? 
                        `This is a specialty crop of your region: ${crops.find(c => c.name === overallBest).specialty_reason}` : 
                        'Consider your specific farm conditions, available irrigation, and market access when making your final decision.'}
                </p>
            </div>
        `;
    }
}

// Initialize charts system
let cropCharts;
document.addEventListener('DOMContentLoaded', () => {
    cropCharts = new CropCharts();
});

// Export for global access
if (typeof window !== 'undefined') {
    window.CropCharts = CropCharts;
}
