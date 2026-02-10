// ============================================
// Marketplace Module
// Handles marketplace functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeMarketplace();
});

function initializeMarketplace() {
    setupListProduceModal();
    setupContactCultivatorButtons();
    setupBidButtons();
    setupContractButtons();
    setupFPORegistration();
    setupCategoryFilters();
    setupQuickActionCards();
}

// ============================================
// Quick Action Cards Navigation
// ============================================

function setupQuickActionCards() {
    const actionCards = document.querySelectorAll('.quick-action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            navigateToSection(action);
        });
    });
}

function navigateToSection(action) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(link => {
        link.classList.remove('active');
    });
    
    // Navigate to the appropriate section
    let sectionId = '';
    switch(action) {
        case 'crop-recommendation':
            sectionId = 'crop-recommendation-section';
            break;
        case 'disease-detection':
            sectionId = 'disease-detection-section';
            break;
        case 'sell-produce':
            sectionId = 'sell-produce-section';
            break;
        case 'corporate':
            sectionId = 'corporate-section';
            break;
        default:
            sectionId = 'overview-section';
    }
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update sidebar link
        const sidebarLink = document.querySelector(`.sidebar-nav .nav-item[data-page="${action}"]`);
        if (sidebarLink) {
            sidebarLink.classList.add('active');
        }
        
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// List New Produce Modal
// ============================================

function setupListProduceModal() {
    const listBtn = document.getElementById('listProduceBtn');
    if (listBtn) {
        listBtn.addEventListener('click', openListProduceModal);
    }
}

function openListProduceModal() {
    const modal = createModal('list-produce-modal', `
        <div class="modal-header">
            <h3>List Your Produce</h3>
            <button class="modal-close" onclick="closeModal('list-produce-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <form id="listProduceForm" class="marketplace-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Crop Category *</label>
                        <select id="cropCategory" required>
                            <option value="">Select Category</option>
                            <option value="cereals">Cereals & Millets</option>
                            <option value="pulses">Pulses & Legumes</option>
                            <option value="oilseeds">Oilseeds</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="spices">Spices & Condiments</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Crop Name *</label>
                        <input type="text" id="cropName" placeholder="e.g., Wheat, Rice, Tomato" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Variety/Grade *</label>
                        <input type="text" id="cropVariety" placeholder="e.g., HD-3226, Pusa-1121" required>
                    </div>
                    <div class="form-group">
                        <label>Available Quantity (Quintals) *</label>
                        <input type="number" id="cropQuantity" placeholder="e.g., 50" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Your Asking Price (₹/Quintal) *</label>
                        <input type="number" id="cropPrice" placeholder="e.g., 2500" required>
                    </div>
                    <div class="form-group">
                        <label>Harvest Date *</label>
                        <input type="month" id="harvestDate" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Quality Parameters</label>
                        <input type="text" id="qualityParams" placeholder="e.g., Moisture 12%, Purity 98%">
                    </div>
                    <div class="form-group">
                        <label>Harvest Season</label>
                        <select id="harvestSeason">
                            <option value="kharif">Kharif (Monsoon)</option>
                            <option value="rabi">Rabi (Winter)</option>
                            <option value="zaid">Zaid (Summer)</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Collection Point (Village/Town, District, State) *</label>
                        <input type="text" id="collectionPoint" placeholder="e.g., Karnal, Haryana" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Upload Produce Images</label>
                        <div class="file-upload-area" id="imageUploadArea">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <p>Click or drag images here</p>
                            <input type="file" id="produceImages" accept="image/*" multiple hidden>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Additional Details</label>
                        <textarea id="additionalDetails" rows="3" placeholder="Any special information about your produce..."></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('list-produce-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">List Produce</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // File upload handling
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('produceImages');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
        showSelectedFiles(fileInput.files);
    });
    fileInput.addEventListener('change', () => showSelectedFiles(fileInput.files));
    
    // Form submission
    document.getElementById('listProduceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitListProduce();
    });
}

function showSelectedFiles(files) {
    const uploadArea = document.getElementById('imageUploadArea');
    if (files.length > 0) {
        uploadArea.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a7c2c" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p>${files.length} image(s) selected</p>
        `;
    }
}

function submitListProduce() {
    const formData = {
        category: document.getElementById('cropCategory').value,
        name: document.getElementById('cropName').value,
        variety: document.getElementById('cropVariety').value,
        quantity: document.getElementById('cropQuantity').value,
        price: document.getElementById('cropPrice').value,
        harvestDate: document.getElementById('harvestDate').value,
        qualityParams: document.getElementById('qualityParams').value,
        season: document.getElementById('harvestSeason').value,
        location: document.getElementById('collectionPoint').value,
        details: document.getElementById('additionalDetails').value
    };
    
    // Simulate API call
    showLoadingInModal();
    
    setTimeout(() => {
        closeModal('list-produce-modal');
        showSuccessNotification('Your produce has been listed successfully! Buyers will contact you soon.');
        
        // Add new listing to the grid (mock)
        addNewListingToGrid(formData);
    }, 1500);
}

function addNewListingToGrid(data) {
    const grid = document.querySelector('.produce-listings-grid');
    if (!grid) return;
    
    const newCard = document.createElement('div');
    newCard.className = 'produce-card new-listing';
    newCard.innerHTML = `
        <div class="produce-badge fresh">Just Listed</div>
        <div class="produce-header">
            <div class="crop-image-box">
                <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop" alt="${data.name}">
            </div>
            <div class="crop-details">
                <h4>${data.name} (${data.variety})</h4>
                <span class="variety-tag">${data.category} • ${data.season}</span>
            </div>
        </div>
        <div class="produce-info">
            <div class="info-row">
                <span class="label">Available Quantity:</span>
                <span class="value">${data.quantity} Quintals</span>
            </div>
            <div class="info-row">
                <span class="label">Quality:</span>
                <span class="value">${data.qualityParams || 'Standard'}</span>
            </div>
            <div class="info-row">
                <span class="label">Harvest Date:</span>
                <span class="value">${data.harvestDate}</span>
            </div>
            <div class="info-row">
                <span class="label">Collection Point:</span>
                <span class="value">${data.location}</span>
            </div>
        </div>
        <div class="pricing-box">
            <div class="farmer-price-row">
                <span class="price-label">Your Asking Price</span>
                <span class="price-amount">₹${parseInt(data.price).toLocaleString()}/Qtl</span>
            </div>
        </div>
        <div class="seller-info">
            <div class="seller-avatar">YO</div>
            <div class="seller-details">
                <span class="seller-name">Your Listing</span>
                <span class="seller-rating">★ New Seller</span>
            </div>
        </div>
        <button class="btn btn-outline-primary btn-block" onclick="editListing(this)">Edit Listing</button>
    `;
    
    grid.insertBefore(newCard, grid.firstChild);
}

// ============================================
// Contact Cultivator
// ============================================

function setupContactCultivatorButtons() {
    document.querySelectorAll('.produce-card .btn-outline-primary').forEach(btn => {
        if (btn.textContent.includes('Contact Cultivator')) {
            btn.addEventListener('click', function() {
                const card = this.closest('.produce-card');
                const farmerName = card.querySelector('.seller-name')?.textContent || 'Farmer';
                const cropName = card.querySelector('.crop-details h4')?.textContent || 'Produce';
                openContactModal(farmerName, cropName);
            });
        }
    });
}

function openContactModal(farmerName, cropName) {
    const modal = createModal('contact-modal', `
        <div class="modal-header">
            <h3>Contact ${farmerName}</h3>
            <button class="modal-close" onclick="closeModal('contact-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <div class="contact-info-card">
                <p><strong>Regarding:</strong> ${cropName}</p>
            </div>
            <form id="contactForm" class="marketplace-form">
                <div class="form-group">
                    <label>Your Name *</label>
                    <input type="text" id="buyerName" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label>Your Phone Number *</label>
                    <input type="tel" id="buyerPhone" required placeholder="10-digit mobile number">
                </div>
                <div class="form-group">
                    <label>Your Email</label>
                    <input type="email" id="buyerEmail" placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label>Quantity Required (Quintals) *</label>
                    <input type="number" id="requiredQty" required placeholder="How much do you need?">
                </div>
                <div class="form-group">
                    <label>Your Message</label>
                    <textarea id="buyerMessage" rows="3" placeholder="Any specific requirements or questions..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('contact-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Send Enquiry</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingInModal();
        
        setTimeout(() => {
            closeModal('contact-modal');
            showSuccessNotification(`Your enquiry has been sent to ${farmerName}. They will contact you within 24 hours.`);
        }, 1000);
    });
}

// ============================================
// Submit Bid (Corporate Tenders)
// ============================================

function setupBidButtons() {
    document.querySelectorAll('.tender-card .btn-primary').forEach(btn => {
        if (btn.textContent.includes('Submit Bid')) {
            btn.addEventListener('click', function() {
                const card = this.closest('.tender-card');
                const company = card.querySelector('.tender-info h4')?.textContent || 'Company';
                const tenderId = card.querySelector('.tender-id')?.textContent || 'Tender';
                const commodity = card.querySelector('.tender-commodity .value')?.textContent || 'Commodity';
                const quantity = card.querySelector('.tender-specs .spec:first-child .value')?.textContent || 'Quantity';
                openBidModal(company, tenderId, commodity, quantity);
            });
        }
    });
}

function openBidModal(company, tenderId, commodity, quantity) {
    const modal = createModal('bid-modal', `
        <div class="modal-header">
            <h3>Submit Bid</h3>
            <button class="modal-close" onclick="closeModal('bid-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <div class="bid-info-card">
                <h4>${company}</h4>
                <p>${tenderId}</p>
                <p><strong>Commodity:</strong> ${commodity}</p>
                <p><strong>Required Qty:</strong> ${quantity}</p>
            </div>
            <form id="bidForm" class="marketplace-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Your Organization Name *</label>
                        <input type="text" id="orgName" required placeholder="FPO/Company Name">
                    </div>
                    <div class="form-group">
                        <label>Organization Type *</label>
                        <select id="orgType" required>
                            <option value="">Select Type</option>
                            <option value="fpo">Farmer Producer Organization (FPO)</option>
                            <option value="fpc">Farmer Producer Company</option>
                            <option value="cooperative">Cooperative Society</option>
                            <option value="individual">Individual Farmer</option>
                            <option value="trader">Licensed Trader</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Quantity You Can Supply (MT) *</label>
                        <input type="number" id="bidQuantity" required placeholder="In Metric Tonnes">
                    </div>
                    <div class="form-group">
                        <label>Your Bid Price (₹/Quintal) *</label>
                        <input type="number" id="bidPrice" required placeholder="Your offered price">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Delivery Location *</label>
                        <input type="text" id="bidLocation" required placeholder="Your godown/collection point">
                    </div>
                    <div class="form-group">
                        <label>Delivery Timeline</label>
                        <select id="bidTimeline">
                            <option value="immediate">Immediate (Within 7 days)</option>
                            <option value="15days">Within 15 days</option>
                            <option value="30days">Within 30 days</option>
                            <option value="scheduled">As per tender schedule</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Contact Person Name *</label>
                    <input type="text" id="contactPerson" required placeholder="Authorized person name">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="bidPhone" required placeholder="10-digit mobile">
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" id="bidEmail" required placeholder="Official email">
                    </div>
                </div>
                <div class="form-group">
                    <label>Quality Certificates (if any)</label>
                    <input type="text" id="qualityCerts" placeholder="FSSAI, Organic, ISO certifications...">
                </div>
                <div class="form-group">
                    <label>Additional Remarks</label>
                    <textarea id="bidRemarks" rows="2" placeholder="Any additional information..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('bid-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Bid</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('bidForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingInModal();
        
        setTimeout(() => {
            closeModal('bid-modal');
            showSuccessNotification(`Your bid has been submitted to ${company}. You will receive confirmation via email and SMS. Bid evaluation results will be shared within 7 working days.`);
        }, 1500);
    });
}

// ============================================
// Contract Farming Applications
// ============================================

function setupContractButtons() {
    document.querySelectorAll('.contract-card .btn-outline-primary').forEach(btn => {
        if (btn.textContent.includes('Apply for Contract')) {
            btn.addEventListener('click', function() {
                const card = this.closest('.contract-card');
                const company = card.querySelector('.contract-company')?.textContent || 'Company';
                const crop = card.querySelector('.crop-badge')?.textContent || 'Crop';
                const contractType = card.querySelector('.contract-type')?.textContent || 'Contract';
                openContractModal(company, crop, contractType);
            });
        }
    });
}

function openContractModal(company, crop, contractType) {
    const modal = createModal('contract-modal', `
        <div class="modal-header">
            <h3>Apply for ${contractType}</h3>
            <button class="modal-close" onclick="closeModal('contract-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <div class="contract-info-card">
                <h4>${company}</h4>
                <p><strong>Crop:</strong> ${crop} | <strong>Type:</strong> ${contractType}</p>
            </div>
            <form id="contractForm" class="marketplace-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Applicant Name *</label>
                        <input type="text" id="applicantName" required placeholder="Full name">
                    </div>
                    <div class="form-group">
                        <label>Applicant Type *</label>
                        <select id="applicantType" required>
                            <option value="">Select Type</option>
                            <option value="individual">Individual Farmer</option>
                            <option value="group">Farmer Group</option>
                            <option value="fpo">FPO/FPC</option>
                            <option value="cooperative">Cooperative</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Total Land Available (Acres) *</label>
                        <input type="number" id="landArea" required placeholder="Total cultivable area">
                    </div>
                    <div class="form-group">
                        <label>Land Ownership *</label>
                        <select id="landOwnership" required>
                            <option value="">Select</option>
                            <option value="owned">Self Owned</option>
                            <option value="leased">Leased</option>
                            <option value="mixed">Mixed (Owned + Leased)</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Farm Location (Village, Taluka, District, State) *</label>
                    <input type="text" id="farmLocation" required placeholder="Complete address">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Irrigation Facility *</label>
                        <select id="irrigation" required>
                            <option value="">Select</option>
                            <option value="canal">Canal Irrigation</option>
                            <option value="borewell">Borewell/Tubewell</option>
                            <option value="drip">Drip Irrigation</option>
                            <option value="sprinkler">Sprinkler</option>
                            <option value="rainfed">Rainfed Only</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Previous Experience with ${crop}</label>
                        <select id="experience">
                            <option value="none">No Experience</option>
                            <option value="1-2">1-2 Years</option>
                            <option value="3-5">3-5 Years</option>
                            <option value="5+">More than 5 Years</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="contractPhone" required placeholder="10-digit mobile">
                    </div>
                    <div class="form-group">
                        <label>Aadhaar Number *</label>
                        <input type="text" id="aadhaarNum" required placeholder="12-digit Aadhaar">
                    </div>
                </div>
                <div class="form-group">
                    <label>Bank Account Details (for payment)</label>
                    <input type="text" id="bankDetails" placeholder="Bank Name, Account Number, IFSC">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('contract-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Application</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('contractForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingInModal();
        
        setTimeout(() => {
            closeModal('contract-modal');
            showSuccessNotification(`Your application for ${company} contract farming has been submitted. A field officer will visit your farm within 15 days for verification.`);
        }, 1500);
    });
}

// ============================================
// FPO Registration
// ============================================

function setupFPORegistration() {
    const fpoBtn = document.querySelector('.fpo-cta-card .btn-primary, .register-fpo-btn');
    if (fpoBtn) {
        fpoBtn.addEventListener('click', openFPORegistrationModal);
    }
}

function openFPORegistrationModal() {
    const modal = createModal('fpo-modal', `
        <div class="modal-header">
            <h3>Register Your FPO/FPC</h3>
            <button class="modal-close" onclick="closeModal('fpo-modal')">&times;</button>
        </div>
        <div class="modal-body">
            <form id="fpoForm" class="marketplace-form">
                <div class="form-group">
                    <label>Organization Name *</label>
                    <input type="text" id="fpoName" required placeholder="Full registered name of FPO/FPC">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Organization Type *</label>
                        <select id="fpoType" required>
                            <option value="">Select Type</option>
                            <option value="fpo">Farmer Producer Organization</option>
                            <option value="fpc">Farmer Producer Company</option>
                            <option value="cooperative">Primary Agricultural Cooperative</option>
                            <option value="society">Registered Society</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Registration Number *</label>
                        <input type="text" id="regNumber" required placeholder="Company/Society Registration No.">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Year of Establishment *</label>
                        <input type="number" id="estYear" required placeholder="e.g., 2018" min="1990" max="2025">
                    </div>
                    <div class="form-group">
                        <label>Number of Member Farmers *</label>
                        <input type="number" id="memberCount" required placeholder="Total registered members">
                    </div>
                </div>
                <div class="form-group">
                    <label>Registered Address *</label>
                    <textarea id="fpoAddress" rows="2" required placeholder="Complete registered address with PIN"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>District *</label>
                        <input type="text" id="fpoDistrict" required placeholder="District">
                    </div>
                    <div class="form-group">
                        <label>State *</label>
                        <input type="text" id="fpoState" required placeholder="State">
                    </div>
                </div>
                <div class="form-group">
                    <label>Major Crops/Commodities Dealt *</label>
                    <input type="text" id="fpoCrops" required placeholder="e.g., Wheat, Rice, Pulses, Vegetables">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Annual Turnover (₹ Lakhs)</label>
                        <input type="number" id="fpoTurnover" placeholder="Previous year turnover">
                    </div>
                    <div class="form-group">
                        <label>Storage Capacity (MT)</label>
                        <input type="number" id="fpoStorage" placeholder="Warehouse/godown capacity">
                    </div>
                </div>
                <div class="form-group">
                    <label>CEO/Managing Director Name *</label>
                    <input type="text" id="ceoName" required placeholder="Authorized signatory name">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Contact Phone *</label>
                        <input type="tel" id="fpoPhone" required placeholder="Official phone number">
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" id="fpoEmail" required placeholder="Official email">
                    </div>
                </div>
                <div class="form-group">
                    <label>Upload Registration Certificate</label>
                    <input type="file" id="fpoCertificate" accept=".pdf,.jpg,.png">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal('fpo-modal')">Cancel</button>
                    <button type="submit" class="btn btn-primary">Register FPO</button>
                </div>
            </form>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    document.getElementById('fpoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingInModal();
        
        setTimeout(() => {
            closeModal('fpo-modal');
            showSuccessNotification('Your FPO registration has been submitted successfully! Our team will verify your documents and activate your account within 3-5 working days. You will receive login credentials via SMS and email.');
        }, 1500);
    });
}

// ============================================
// Category Filters
// ============================================

function setupCategoryFilters() {
    // Farmer section filters
    const categoryFilter = document.getElementById('cropCategoryFilter');
    const seasonFilter = document.getElementById('harvestSeasonFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProduceListings);
    }
    if (seasonFilter) {
        seasonFilter.addEventListener('change', filterProduceListings);
    }
}

function filterProduceListings() {
    const category = document.getElementById('cropCategoryFilter')?.value || '';
    const season = document.getElementById('harvestSeasonFilter')?.value || '';
    
    document.querySelectorAll('.produce-listings-grid .produce-card').forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardSeason = card.getAttribute('data-season') || '';
        
        const matchesCategory = !category || cardCategory === category;
        const matchesSeason = !season || cardSeason === season;
        
        card.style.display = (matchesCategory && matchesSeason) ? '' : 'none';
    });
}

// ============================================
// Utility Functions
// ============================================

function createModal(id, content) {
    // Remove existing modal if any
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'marketplace-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal('${id}')"></div>
        <div class="modal-content">
            ${content}
        </div>
    `;
    return modal;
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
    }
}

function showLoadingInModal() {
    const modalBody = document.querySelector('.marketplace-modal .modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="modal-loading">
                <div class="spinner"></div>
                <p>Processing your request...</p>
            </div>
        `;
    }
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'marketplace-notification success';
    notification.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function editListing(btn) {
    showSuccessNotification('Edit functionality coming soon!');
}

// Make functions globally available
window.closeModal = closeModal;
window.editListing = editListing;
