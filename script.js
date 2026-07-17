// ========== DATABASE ==========
let db = {

    properties: [

        { 
            id: 1, 
            title: "Luxury 3BHK Apartment", 
            type: "Residential",
            price: 150000, 
            location: "Pune", 
            amenities: "3BHK, 2 Bath, Parking",
            img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400" 
        },

        { 
            id: 2, 
            title: "Office Space", 
            type: "Commercial",
            price: 500000, 
            location: "Mumbai", 
            amenities: "AC, WiFi, 1000sqft",
            img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=40https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFmkGVwxChoMZywe2Wm3LxeTtxXKtiNLc-PqJfo_0pCUVScMQQ11f7z8&s=10" 
        }

    ],

    leads: [

        { 
            id: 1, 
            name: "Amit Sharma", 
            phone: "9876543210", 
            source: "Website", 
            agent: "Priya", 
            status: "New" 
        },

        { 
            id: 2, 
            name: "Sneha Patil", 
            phone: "9123456780", 
            source: "Walk-in", 
            agent: "Amit", 
            status: "Follow-up" 
        }

    ]

};

// ========== ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {

    let page = window.location.pathname.split("/").pop();

    if(page === "properties.html") {
        loadProperties();
    }

    if(page === "leads.html") {
        loadLeads();
    }

    if(page === "dashboard.html") {
        document.getElementById("sProps").innerText = db.properties.length;
        document.getElementById("sLeads").innerText = db.leads.length;
    }

});

// ========== LOAD PROPERTIES ==========
function loadProperties() {
    
    let html = "";

    db.properties.forEach(p => {
        html += `
        
        <div class="property-card">
            
            <img src="${p.img}" alt="${p.title}">

            <h3>${p.title}</h3>

            <p>📍 ${p.location} • ${p.type}</p>

            <p style="color: var(--muted); font-size: 14px; margin: 8px 0;">
                ${p.amenities}
            </p>

            <h2 style="color: var(--primary);">
                $${p.price}
            </h2>

        </div>

        `;
    });

    document.getElementById("propertyList").innerHTML = html;

}

// ========== LOAD LEADS ==========
function loadLeads() {
    
    let html = "";

    db.leads.forEach(l => {
        html += `
        
        <tr>
            <td>${l.name}</td>
            <td>${l.phone}</td>
            <td>${l.source}</td>
            <td>${l.agent}</td>
            <td><span class="badge ${l.status.toLowerCase()}">${l.status}</span></td>
            <td><button class="btn">Follow Up</button></td>
        </tr>

        `;
    });

    document.getElementById("leadBody").innerHTML = html;

}
// LOAD PROPERTIES ON HOMEPAGE
if(document.getElementById("homePropertyList")) {
    let html = "";
    db.properties.slice(0, 3).forEach(p => {
        html += `
        <div class="property-card">
            <img src="${p.img}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>📍 ${p.location}</p>
            <h2 style="color: var(--primary);">$${p.price}</h2>
        </div>
        `;
    });
    document.getElementById("homePropertyList").innerHTML = html;
}