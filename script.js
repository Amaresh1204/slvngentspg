// Redirect to homepage on refresh
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
    window.location.href = 'index.html';
}

// Gallery images data
const galleryImages = [
    { id: 1, src: 'images/view 1.jpg', title: 'Premium Living Space', category: 'interior' },
    { id: 2, src: 'images/view 2.jpg', title: 'Modern Amenities', category: 'facilities' },
    { id: 3, src: 'images/view 3.jpg', title: 'Comfortable Rooms', category: 'rooms' },
    { id: 4, src: 'images/view 4.jpg', title: 'Common Areas', category: 'common' },
    { id: 5, src: 'images/view 5.jpg', title: 'Dining Space', category: 'dining' },
    { id: 6, src: 'images/view 6.jpg', title: 'Recreation Zone', category: 'recreation' },
    { id: 7, src: 'images/view 7.jpg', title: 'Study Area', category: 'study' },
    { id: 8, src: 'images/view 8.jpg', title: 'Exterior View', category: 'exterior' }
];

// Room data for Sri Lakshmi Venkata Narasimha Gents PG
const properties = [
    {
        id: 1,
        name: "Single Sharing Room",
        type: "single",
        price: "₹15,000",
        image: "images/Single Sharing.jpg",
        features: ["WiFi", "AC", "3-Time Meals", "Attached Bath"],
        description: "Private single occupancy room with all amenities and 3-time meals.",
        amenities: ["CCTV Security", "Washing Machine", "24/7 TV", "Attached Bathroom"]
    },
    {
        id: 2,
        name: "Double Sharing Room",
        type: "double",
        price: "₹12,000",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["WiFi", "AC", "3-Time Meals", "Attached Bath"],
        description: "Comfortable double sharing room with all facilities and meals included.",
        amenities: ["CCTV Security", "Washing Machine", "24/7 TV", "Attached Bathroom"]
    },
    {
        id: 3,
        name: "Triple Sharing Room",
        type: "triple",
        price: "₹10,000",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["WiFi", "AC", "3-Time Meals", "Attached Bath"],
        description: "Budget-friendly triple sharing room with all basic amenities.",
        amenities: ["CCTV Security", "Washing Machine", "24/7 TV", "Attached Bathroom"]
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const propertiesGrid = document.getElementById('properties-grid');
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchBtn = document.querySelector('.search-btn');
const modal = document.getElementById('property-modal');
const closeModal = document.querySelector('.close');


// Mobile Navigation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Gallery Display
function displayGallery() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in-up';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        galleryItem.innerHTML = `
            <div class="gallery-image" style="background-image: url('${image.src}')" onclick="openImageModal('${image.src}', '${image.title}')">
                <div class="gallery-overlay">
                    <i class="fas fa-expand-alt"></i>
                    <h4>${image.title}</h4>
                </div>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Image Modal
function openImageModal(src, title) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <img src="${src}" alt="${title}" style="max-width: 100%; max-height: 80vh; border-radius: 10px;">
            <h3 style="margin-top: 1rem; color: #333;">${title}</h3>
        </div>
    `;
    modal.style.display = 'block';
}

// Property Filtering
function displayProperties(propertiesToShow = properties) {
    if (!propertiesGrid) {
        propertiesGrid = document.getElementById('properties-grid');
    }
    if (!propertiesGrid) return;
    
    // Show skeleton placeholder cards based on number of properties
    const skeletonCard = `
        <div style="background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 25px; padding: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); animation: pulse 1.5s ease-in-out infinite;">
            <div style="height: 200px; background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%); border-radius: 15px; margin-bottom: 1rem; animation: shimmer 1.5s infinite;"></div>
            <div style="height: 20px; background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%); border-radius: 10px; margin-bottom: 0.5rem; animation: shimmer 1.5s infinite;"></div>
            <div style="height: 40px; background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%); border-radius: 20px; animation: shimmer 1.5s infinite;"></div>
        </div>
    `;
    
    propertiesGrid.innerHTML = skeletonCard.repeat(propertiesToShow.length);
    
    // Add CSS for skeleton animations if not exists
    if (!document.getElementById('skeleton-css')) {
        const style = document.createElement('style');
        style.id = 'skeleton-css';
        style.textContent = `
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
            @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
        `;
        document.head.appendChild(style);
    }
    
    // Load cards after animation
    setTimeout(() => {
        propertiesGrid.innerHTML = '';
        propertiesToShow.forEach(property => {
            const propertyCard = createPropertyCard(property);
            propertiesGrid.appendChild(propertyCard);
        });
    }, 500);
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card fade-in-up';
    card.style.cssText = `
        background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 25px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 2px solid transparent;
        background-clip: padding-box;
        position: relative;
    `;
    
    // Add shimmer effect
    card.style.setProperty('--shimmer', 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)');
    card.style.backgroundImage = 'var(--shimmer), linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)';
    card.style.backgroundSize = '200% 100%, 100% 100%';
    card.style.backgroundPosition = '-200% 0, 0 0';
    card.innerHTML = `
        <div class="property-image" style="background-image: url('${property.image}'); position: relative; overflow: hidden; height: 250px; background-size: cover; background-position: center; border-radius: 20px 20px 0 0;">
        </div>
        <div class="property-info" style="padding: 2rem 1.5rem; background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.8) 100%); backdrop-filter: blur(20px);">
            <h3 class="property-title" style="margin: 0 0 1.5rem 0; color: #2c3e50; font-weight: 700; text-align: center; font-size: 1.3rem; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${property.name}</h3>
            <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0 auto 1.5rem; border-radius: 2px;"></div>
            <div style="text-align: center;">
                <button onclick="openPropertyModal(${property.id})" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 35px rgba(102, 126, 234, 0.4)'" onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 8px 25px rgba(102, 126, 234, 0.3)'">View Details</button>
            </div>
        </div>
    `;
    
    // Add enhanced hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 30px 60px rgba(0,0,0,0.18), 0 15px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)';
        card.style.borderColor = 'rgba(102, 126, 234, 0.3)';
        // Trigger shimmer effect
        card.style.backgroundPosition = '200% 0, 0 0';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0px) scale(1)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
        card.style.borderColor = 'transparent';
        card.style.backgroundPosition = '-200% 0, 0 0';
    });
    
    // Add subtle animation on load
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    return card;
}

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        if (filter === 'all') {
            displayProperties(properties);
        } else {
            const filteredProperties = properties.filter(property => property.type === filter);
            displayProperties(filteredProperties);
        }
    });
});

// Search functionality
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-select').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    let filteredProperties = properties;
    
    if (searchTerm) {
        filteredProperties = filteredProperties.filter(property => 
            property.name.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProperties(filteredProperties);
    
        // Scroll to properties section
        const propertiesSection = document.getElementById('properties');
        if (propertiesSection) {
            propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Property Modal
function openPropertyModal(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="position: relative;">
            <button onclick="closePropertyModal()" style="position: absolute; top: 1rem; right: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; z-index: 10; font-size: 1rem; font-weight: 600; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3); transition: all 0.3s ease; backdrop-filter: blur(10px);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px rgba(102, 126, 234, 0.4)'" onmouseout="this.style.transform='translateY(0px)'; this.style.boxShadow='0 8px 20px rgba(102, 126, 234, 0.3)'">← Back</button>
            <div class="property-image" style="background-image: url('${property.image}'); height: 300px; border-radius: 15px; position: relative;"></div>
        </div>
        <div style="padding: 2rem;">
            <h2>${property.name}</h2>
            <p style="margin-bottom: 2rem; color: #666; line-height: 1.6;">${property.description}</p>
            
            <h3 style="margin-bottom: 1rem;">What Makes Us Special</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                    <i class="fas fa-map-marker-alt" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <h4>Prime Location</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Near Tech Parks</p>
                </div>
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                    <i class="fas fa-utensils" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <h4>3 Time Meals</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Healthy & Tasty Food</p>
                </div>
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                    <i class="fas fa-shield-alt" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <h4>24/7 Security</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Safe & secure living</p>
                </div>
                <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                    <i class="fas fa-wifi" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <h4>High Speed WiFi</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Work from home ready</p>
                </div>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 1rem; padding-top: 2rem; border-top: 1px solid #eee;">
                <button onclick="scheduleVisit(${property.id})" style="background: #e74c3c; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">Schedule Visit</button>
                <button onclick="enquiryNow(${property.id})" style="background: #2c3e50; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">Enquiry Now</button>
                <button onclick="bookNow(${property.id})" style="background: #28a745; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">Book Now</button>
            </div>
            <div id="visit-form-${property.id}" style="display: none; margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Schedule Your Visit</h4>
                    <button onclick="document.getElementById('visit-form-${property.id}').style.display='none'" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
                </div>
                <input type="text" id="visit-name-${property.id}" placeholder="Your Name" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="tel" id="visit-phone-${property.id}" placeholder="Phone Number" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="email" id="visit-email-${property.id}" placeholder="Email Address" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="date" id="visit-date-${property.id}" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="time" id="visit-time-${property.id}" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <button id="visit-submit-btn-${property.id}" onclick="submitVisit(${property.id})" style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-right: 0.5rem;">Submit</button>
                <button onclick="cancelVisit(${property.id})" style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Cancel</button>
            </div>
            <div id="enquiry-form-${property.id}" style="display: none; margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Send Enquiry</h4>
                    <button onclick="document.getElementById('enquiry-form-${property.id}').style.display='none'" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
                </div>
                <input type="text" id="enquiry-name-${property.id}" placeholder="Your Name" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="tel" id="enquiry-phone-${property.id}" placeholder="Phone Number" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="email" id="enquiry-email-${property.id}" placeholder="Email Address" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <button id="submit-btn-${property.id}" onclick="submitEnquiry(${property.id})" style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-right: 0.5rem;">Submit</button>
                <button onclick="cancelEnquiry(${property.id})" style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Cancel</button>
            </div>
            <div id="booking-form-${property.id}" style="display: none; margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Book Your Room</h4>
                    <button onclick="document.getElementById('booking-form-${property.id}').style.display='none'" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">←</button>
                </div>
                <input type="text" id="booking-name-${property.id}" placeholder="Full Name" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="tel" id="booking-phone-${property.id}" placeholder="Phone Number" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="email" id="booking-email-${property.id}" placeholder="Email Address" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <input type="date" id="booking-date-${property.id}" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                <select id="booking-duration-${property.id}" style="width: 100%; padding: 0.5rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="">Select Duration</option>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                </select>
                <button id="booking-submit-btn-${property.id}" onclick="submitBooking(${property.id})" style="background: #28a745; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; margin-right: 0.5rem;">Submit Booking</button>
                <button onclick="cancelBooking(${property.id})" style="background: #6c757d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Cancel</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function scheduleVisit(propertyId) {
    const visitForm = document.getElementById(`visit-form-${propertyId}`);
    const enquiryForm = document.getElementById(`enquiry-form-${propertyId}`);
    
    enquiryForm.style.display = 'none';
    visitForm.style.display = visitForm.style.display === 'none' ? 'block' : 'none';
    
    if (visitForm.style.display === 'block') {
        setTimeout(() => {
            visitForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function submitVisit(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    const name = document.getElementById(`visit-name-${propertyId}`).value;
    const phone = document.getElementById(`visit-phone-${propertyId}`).value;
    const email = document.getElementById(`visit-email-${propertyId}`).value;
    const visitDate = document.getElementById(`visit-date-${propertyId}`).value;
    const visitTime = document.getElementById(`visit-time-${propertyId}`).value;
    
    if (name && phone && email && visitDate && visitTime && /^[0-9]+$/.test(phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const submitBtn = document.getElementById(`visit-submit-btn-${propertyId}`);
        const visitForm = document.getElementById(`visit-form-${propertyId}`);
        
        submitBtn.innerHTML = '<div style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div> Scheduling...';
        submitBtn.disabled = true;
        
        const templateParams = {
            email: emailConfig.recipientEmail,
            reply_to: email,
            name: name,
            phone: phone,
            customer_email: email,
            room_type: property.name,
            visit_date: visitDate,
            visit_time: visitTime,
            message: `Visit scheduled for ${property.name}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nVisit Date: ${visitDate}\nVisit Time: ${visitTime}`
        };
        
        // Re-initialize EmailJS with the correct public key for visit forms
        emailjs.init(emailConfig.publicKey);
        
        emailjs.send(emailConfig.serviceId, emailConfig.visitTemplateId, {
            ...templateParams,
            type: 'Visit Request'
        })
            .then(() => {
                visitForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white;">
                        <i class="fas fa-calendar-check" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3 style="margin: 0 0 1rem 0;">Visit Scheduled!</h3>
                        <p style="margin: 0; font-size: 1.1rem;">Thank you ${name}! Your visit is confirmed.</p>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">${visitDate} at ${visitTime}</p>
                    </div>
                `;
                setTimeout(() => {
                    visitForm.style.display = 'none';
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                submitBtn.innerHTML = 'Submit';
                submitBtn.disabled = false;
                alert('Failed to schedule visit. Please try again.');
            });
    } else {
        // Clear existing errors
        document.querySelectorAll(`#visit-form-${propertyId} .field-error`).forEach(error => error.remove());
        
        // Validate each field
        if (!name) {
            const nameInput = document.getElementById(`visit-name-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Name is required';
            nameInput.parentNode.insertBefore(errorDiv, nameInput.nextSibling);
        }
        
        if (!phone) {
            const phoneInput = document.getElementById(`visit-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Phone number is required';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        } else if (!/^[0-9]+$/.test(phone)) {
            const phoneInput = document.getElementById(`visit-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Enter a valid number';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        }
        
        if (!email) {
            const emailInput = document.getElementById(`visit-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Email is required';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const emailInput = document.getElementById(`visit-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Please enter a valid email address';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        }
        
        if (!visitDate) {
            const dateInput = document.getElementById(`visit-date-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Visit date is required';
            dateInput.parentNode.insertBefore(errorDiv, dateInput.nextSibling);
        }
        
        if (!visitTime) {
            const timeInput = document.getElementById(`visit-time-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Visit time is required';
            timeInput.parentNode.insertBefore(errorDiv, timeInput.nextSibling);
        }
    }
}

function cancelVisit(propertyId) {
    // Clear all form fields
    document.getElementById(`visit-name-${propertyId}`).value = '';
    document.getElementById(`visit-phone-${propertyId}`).value = '';
    document.getElementById(`visit-email-${propertyId}`).value = '';
    document.getElementById(`visit-date-${propertyId}`).value = '';
    document.getElementById(`visit-time-${propertyId}`).value = '';
    
    // Clear all error messages
    document.querySelectorAll(`#visit-form-${propertyId} .field-error`).forEach(error => error.remove());
}

function enquiryNow(propertyId) {
    const visitForm = document.getElementById(`visit-form-${propertyId}`);
    const enquiryForm = document.getElementById(`enquiry-form-${propertyId}`);
    
    visitForm.style.display = 'none';
    enquiryForm.style.display = enquiryForm.style.display === 'none' ? 'block' : 'none';
    
    if (enquiryForm.style.display === 'block') {
        setTimeout(() => {
            enquiryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function submitEnquiry(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    const name = document.getElementById(`enquiry-name-${propertyId}`).value;
    const phone = document.getElementById(`enquiry-phone-${propertyId}`).value;
    const email = document.getElementById(`enquiry-email-${propertyId}`).value;
    
    if (name && phone && email && /^[0-9]+$/.test(phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Add CSS animation for spinner
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }
        const templateParams = {
            // email: 'vishnurdy@gmail.com',
            email: emailConfig.recipientEmail,
            reply_to: email || 'noreply@example.com',
            name: name,
            phone: phone,
            customer_email: email || 'Not provided',
            room_type: property.name,
            message: `New enquiry for ${property.name}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}`
        };
        
        // Show loading animation
        const submitBtn = document.getElementById(`submit-btn-${propertyId}`);
        const enquiryForm = document.getElementById(`enquiry-form-${propertyId}`);
        submitBtn.innerHTML = '<div style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div> Sending...';
        submitBtn.disabled = true;
        
        // Re-initialize EmailJS with the correct public key for enquiry forms
        emailjs.init(emailConfig.publicKey);
        
        emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
            ...templateParams,
            type: 'Enquiry'
        })
            .then((response) => {
                enquiryForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 10px; color: white;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3 style="margin: 0 0 1rem 0;">Thank you ${name}!</h3>
                        <p style="margin: 0; font-size: 1.1rem;">Your enquiry has been sent successfully.</p>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">We will contact you shortly.</p>
                    </div>
                `;
                setTimeout(() => {
                    enquiryForm.style.display = 'none';
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                submitBtn.innerHTML = 'Submit';
                submitBtn.disabled = false;
                alert(`Error: ${error.text || 'Please contact us directly at vishnurdy@gmail.com'}`);
            });
    } else {
        // Clear existing errors
        document.querySelectorAll(`#enquiry-form-${propertyId} .field-error`).forEach(error => error.remove());
        
        // Check name field
        if (!name) {
            const nameInput = document.getElementById(`enquiry-name-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Name is required';
            nameInput.parentNode.insertBefore(errorDiv, nameInput.nextSibling);
        }
        
        // Check phone field
        if (!phone) {
            const phoneInput = document.getElementById(`enquiry-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Phone number is required';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        } else if (!/^[0-9]+$/.test(phone)) {
            const phoneInput = document.getElementById(`enquiry-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Enter a valid number';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        }
        
        // Check email field
        if (!email) {
            const emailInput = document.getElementById(`enquiry-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Email is required';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const emailInput = document.getElementById(`enquiry-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Please enter a valid email address';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        }
    }
}

function cancelEnquiry(propertyId) {
    // Clear all form fields
    document.getElementById(`enquiry-name-${propertyId}`).value = '';
    document.getElementById(`enquiry-phone-${propertyId}`).value = '';
    document.getElementById(`enquiry-email-${propertyId}`).value = '';
    
    // Clear all error messages
    document.querySelectorAll(`#enquiry-form-${propertyId} .field-error`).forEach(error => error.remove());
}

function bookNow(propertyId) {
    const visitForm = document.getElementById(`visit-form-${propertyId}`);
    const enquiryForm = document.getElementById(`enquiry-form-${propertyId}`);
    const bookingForm = document.getElementById(`booking-form-${propertyId}`);
    
    visitForm.style.display = 'none';
    enquiryForm.style.display = 'none';
    bookingForm.style.display = bookingForm.style.display === 'none' ? 'block' : 'none';
    
    if (bookingForm.style.display === 'block') {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById(`booking-date-${propertyId}`).min = today;
        
        setTimeout(() => {
            bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function submitBooking(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    const name = document.getElementById(`booking-name-${propertyId}`).value;
    const phone = document.getElementById(`booking-phone-${propertyId}`).value;
    const email = document.getElementById(`booking-email-${propertyId}`).value;
    const moveInDate = document.getElementById(`booking-date-${propertyId}`).value;
    const duration = document.getElementById(`booking-duration-${propertyId}`).value;
    
    if (name && phone && email && moveInDate && duration && /^[0-9]+$/.test(phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const submitBtn = document.getElementById(`booking-submit-btn-${propertyId}`);
        const bookingForm = document.getElementById(`booking-form-${propertyId}`);
        
        submitBtn.innerHTML = '<div style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div> Processing...';
        submitBtn.disabled = true;
        
        const templateParams = {
            email: emailConfig.recipientEmail,
            reply_to: email,
            name: name,
            phone: phone,
            customer_email: email,
            room_type: property.name,
            move_in_date: moveInDate,
            duration: `${duration} Month(s)`,
            message: `New Booking Request for ${property.name}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMove-in Date: ${moveInDate}\nDuration: ${duration} Month(s)\nRoom Type: ${property.name}`
        };
        
        console.log('Attempting to send booking with:', {
            serviceId: emailConfig.generalServiceId,
            templateId: emailConfig.bookingTemplateId,
            params: templateParams
        });
        
        // Re-initialize EmailJS with the correct public key for booking forms
        emailjs.init(emailConfig.generalPublicKey);
        
        emailjs.send(emailConfig.generalServiceId, emailConfig.bookingTemplateId, {
            ...templateParams,
            type: 'Booking'
        })
            .then((response) => {
                console.log('Booking Success:', response);
                bookingForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); border-radius: 10px; color: white;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3 style="margin: 0 0 1rem 0;">Booking Submitted!</h3>
                        <p style="margin: 0; font-size: 1.1rem;">Thank you ${name}! Your booking request has been received.</p>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">We will contact you within 24 hours to confirm.</p>
                    </div>
                `;
                setTimeout(() => {
                    bookingForm.style.display = 'none';
                }, 4000);
            })
            .catch((error) => {
                console.error('Booking Error Details:', error);
                console.error('Error Status:', error.status);
                console.error('Error Text:', error.text);
                submitBtn.innerHTML = 'Submit Booking';
                submitBtn.disabled = false;
                alert(`Booking failed: ${error.text || error.message || 'Check console for details'}`);
            });
    } else {
        // Clear existing errors
        document.querySelectorAll(`#booking-form-${propertyId} .field-error`).forEach(error => error.remove());
        
        // Validate each field
        if (!name) {
            const nameInput = document.getElementById(`booking-name-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Full name is required';
            nameInput.parentNode.insertBefore(errorDiv, nameInput.nextSibling);
        }
        
        if (!phone) {
            const phoneInput = document.getElementById(`booking-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Phone number is required';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        } else if (!/^[0-9]+$/.test(phone)) {
            const phoneInput = document.getElementById(`booking-phone-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Enter a valid number';
            phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        }
        
        if (!email) {
            const emailInput = document.getElementById(`booking-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Email is required';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const emailInput = document.getElementById(`booking-email-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Please enter a valid email address';
            emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        }
        
        if (!moveInDate) {
            const dateInput = document.getElementById(`booking-date-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Move-in date is required';
            dateInput.parentNode.insertBefore(errorDiv, dateInput.nextSibling);
        }
        
        if (!duration) {
            const durationInput = document.getElementById(`booking-duration-${propertyId}`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.2rem;';
            errorDiv.textContent = 'Duration is required';
            durationInput.parentNode.insertBefore(errorDiv, durationInput.nextSibling);
        }
    }
}

function cancelBooking(propertyId) {
    // Clear all form fields
    document.getElementById(`booking-name-${propertyId}`).value = '';
    document.getElementById(`booking-phone-${propertyId}`).value = '';
    document.getElementById(`booking-email-${propertyId}`).value = '';
    document.getElementById(`booking-date-${propertyId}`).value = '';
    document.getElementById(`booking-duration-${propertyId}`).value = '';
    
    // Clear all error messages
    document.querySelectorAll(`#booking-form-${propertyId} .field-error`).forEach(error => error.remove());
}

// Close modal functionality
function closePropertyModal() {
    modal.style.display = 'none';
}

// Close modal events
if (closeModal) {
    closeModal.addEventListener('click', closePropertyModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closePropertyModal();
    }
});

// Additional close functionality for any close button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close') || e.target.innerHTML === '×') {
        closePropertyModal();
    }
});

// Contact Form - Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const contactFormEl = document.getElementById('contact-form');
    if (contactFormEl) {
        contactFormEl.onsubmit = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const name = contactFormEl.querySelector('input[name="name"]').value;
            const email = contactFormEl.querySelector('input[name="email"]').value;
            const phone = contactFormEl.querySelector('input[name="phone"]').value;
            const message = contactFormEl.querySelector('textarea[name="message"]').value;
            const submitBtn = contactFormEl.querySelector('button[type="submit"]');
            
            if (name && email && phone && message && /^[0-9]+$/.test(phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (!document.getElementById('spinner-style')) {
                    const style = document.createElement('style');
                    style.id = 'spinner-style';
                    style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
                    document.head.appendChild(style);
                }
                
                submitBtn.innerHTML = '<div style="display: inline-block; width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div> Sending...';
                submitBtn.disabled = true;
                
                const templateParams = {
                    email: emailConfig.recipientEmail,
                    reply_to: email,
                    name: name,
                    phone: phone,
                    customer_email: email,
                    type: 'Contact Message',
                    message: `${message}`
                };
                
                console.log('Sending contact with config:', {
                    serviceId: emailConfig.generalServiceId,
                    templateId: emailConfig.contactTemplateId,
                    params: templateParams
                });
                
                // Re-initialize EmailJS with the correct public key for contact forms
                emailjs.init(emailConfig.generalPublicKey);
                
                emailjs.send(emailConfig.generalServiceId, emailConfig.contactTemplateId, templateParams)
                    .then((response) => {
                        console.log('Contact Success:', response);
                        contactFormEl.innerHTML = `
                            <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); border-radius: 10px; color: white;">
                                <i class="fas fa-paper-plane" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                <h3 style="margin: 0 0 1rem 0;">Message Sent!</h3>
                                <p style="margin: 0; font-size: 1.1rem;">Thank you ${name}! We will get back to you soon.</p>
                                <p style="margin: 1rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">We will contact you within 24 hours.</p>
                            </div>
                        `;
                    })
                    .catch((error) => {
                        console.error('Contact Error Details:', error);
                        console.error('Error Status:', error.status);
                        console.error('Error Text:', error.text);
                        console.error('Error Message:', error.message);
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                        alert(`Contact failed: ${error.text || error.message || 'Check console for details'}`);
                    });
            } else {
                alert('Please fill all fields correctly');
            }
            return false;
        };
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for animations
    const sections = document.querySelectorAll('.feature-card, .property-card, .amenity-item');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// Login functionality
function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('login-modal').style.display = 'none';
}

// FAQ Toggle
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(ans => {
        if (ans !== answer) {
            ans.classList.remove('active');
            ans.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// Handle login form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would connect to backend authentication.');
            closeLogin();
        });
    }
});

// Gallery functionality
function openGallery(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    let images = [];
    
    if (propertyId === 2) { // Double sharing room
        images = [
            'images/double sharing 1.jpg',
            'images/double sharing 2.jpg'
        ];
    } else if (propertyId === 3) { // Triple sharing room
        images = [
            'images/triple sharing.jpg'
        ];
    } else {
        images = [property.image];
    }
    
    let galleryHTML = '<div class="gallery-container">';
    images.forEach((img, index) => {
        galleryHTML += `<img src="${img}" alt="Room ${index + 1}" onclick="showFullImage('${img}')">`;
    });
    galleryHTML += '</div>';
    
    document.getElementById('modal-body').innerHTML = galleryHTML;
    document.getElementById('property-modal').style.display = 'block';
}

function showFullImage(src) {
    window.open(src, '_blank');
}

// Virtual Tour
function startVirtualTour() {
    alert('Virtual tour feature coming soon! Contact us for a live video tour.');
}

// Price Calculator
function calculatePrice(roomType, duration = 1) {
    const basePrices = { single: 15000, double: 12000, triple: 10000 };
    const discounts = { 3: 0.05, 6: 0.1, 12: 0.15 };
    
    let price = basePrices[roomType] * duration;
    if (discounts[duration]) {
        price = price * (1 - discounts[duration]);
    }
    return Math.round(price);
}

// Availability Checker
function checkAvailability() {
    const available = Math.random() > 0.3; // 70% chance of availability
    const message = available ? 
        'Great! Rooms are available. Book now to secure your spot!' : 
        'Limited availability. Contact us immediately!';
    
    alert(message);
}

// Advanced slideshow
let slideshowDuration = 4000;
let slideshow = document.querySelector('.slideshow');
let currentSlideIndex = 0;

function slideshowSwitch(index) {
    const slides = slideshow.querySelectorAll('.slide');
    const pages = slideshow.querySelectorAll('.pagination .item');
    const activeSlide = slideshow.querySelector('.slide.is-active');
    const newSlide = slides[index];
    
    if (newSlide === activeSlide) return;
    
    slides.forEach(slide => slide.classList.remove('is-active'));
    pages.forEach(page => page.classList.remove('is-active'));
    
    newSlide.classList.add('is-active');
    pages[index].classList.add('is-active');
    
    currentSlideIndex = index;
}

function slideshowNext(previous = false) {
    const slides = slideshow.querySelectorAll('.slide');
    let newIndex;
    
    if (previous) {
        newIndex = currentSlideIndex - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
    } else {
        newIndex = currentSlideIndex + 1;
        if (newIndex >= slides.length) newIndex = 0;
    }
    
    slideshowSwitch(newIndex);
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with general public key for booking and contact forms
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: emailConfig.generalPublicKey
        });
        console.log('EmailJS initialized with generalPublicKey:', emailConfig.generalPublicKey);
        console.log('Available config:', emailConfig);
    } else {
        console.error('EmailJS not loaded');
    }
    
    console.log('Sri Lakshmi Venkata Narasimha Gents PG website loaded successfully!');
    
    // Ensure properties grid exists before displaying
    if (propertiesGrid) {
        displayProperties();
    } else {
        // Fallback: try again after a short delay
        setTimeout(() => {
            const grid = document.getElementById('properties-grid');
            if (grid) {
                propertiesGrid = grid;
                displayProperties();
            }
        }, 100);
    }
    
    // Display gallery
    displayGallery();
    
    // Add availability checker to all room cards
    setTimeout(() => {
        document.querySelectorAll('.property-card').forEach(card => {
            const checkBtn = document.createElement('button');
            checkBtn.textContent = 'Check Availability';
            checkBtn.className = 'availability-btn';
            checkBtn.onclick = checkAvailability;
            card.querySelector('.property-price').appendChild(checkBtn);
        });
    }, 1000);
});

// Initialize advanced slideshow
document.addEventListener('DOMContentLoaded', function() {
    if (!slideshow) return;
    
    slideshow.querySelector('.arrow.prev').addEventListener('click', () => {
        slideshowNext(true);
    });
    
    slideshow.querySelector('.arrow.next').addEventListener('click', () => {
        slideshowNext(false);
    });
    
    slideshow.querySelectorAll('.pagination .item').forEach((item, index) => {
        item.addEventListener('click', () => {
            slideshowSwitch(index);
        });
    });
    
    setInterval(() => {
        slideshowNext(false);
    }, slideshowDuration);
});

// Auto slideshow
setInterval(autoSlide, 3000);

// About section slideshow
let imgIndex = 0;
const imgList = [
    'images/View1.jpg',
    'images/View2.jpg', 
    'images/View3.jpg',
    'images/View4.jpg',
    'images/View5.jpg',
    'images/View6.jpg',
    'images/View7.jpg',
    'images/View8.jpg'
];

function nextImg() {
    const imgElement = document.getElementById('mainSlideImg');
    if (imgElement) {
        imgIndex++;
        if (imgIndex >= imgList.length) imgIndex = 0;
        imgElement.src = imgList[imgIndex];
    }
}

function prevImg() {
    const imgElement = document.getElementById('mainSlideImg');
    if (imgElement) {
        imgIndex--;
        if (imgIndex < 0) imgIndex = imgList.length - 1;
        imgElement.src = imgList[imgIndex];
    }
}

// Auto slideshow
setInterval(nextImg, 4000);

// Ensure properties are displayed immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => displayProperties());
} else {
    displayProperties();
}
