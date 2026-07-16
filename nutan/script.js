// DATABASE
let db = JSON.parse(localStorage.getItem("estateCRM")) || {

    properties: [
        { 
            id: 1, 
            title: "Luxury 3BHK Apartment", 
            type: "Residential", 
            price: 150000, 
            location: "Math, Maharashtra", 
            status: "Available", 
            img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400" 
        },

        { 
            id: 2, 
            title: "Office Space", 
            type: "Commercial", 
            price: 500000, 
            location: "Pune", 
            status: "Available", 
            img: "https://images.unsplash.com/photo-1497366811353-6870744d04a2?w=400" 
        }
    ],

    leads: [
        { 
            id: 1, 
            name: "Amit Sharma", 
            phone: "9876543210", 
            source: "Website", 
            status: "New" 
        }
    ],

    visits: [],

    deals: []
};

// SAVE DATA
const save = () => {
    localStorage.setItem("estateCRM", JSON.stringify(db));
};

// PAGE SWITCHING
function showAdmin() {
    document.getElementById("publicPages").classList.add("hidden");
    document.getElementById("publicNav").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderAdmin();
}

function showPublic() {
    document.getElementById("publicPages").classList.remove("hidden");
    document.getElementById("publicNav").classList.remove("hidden");
    document.getElementById("adminPanel").classList.add("hidden");
    renderPublic();
}

function showPublicPage(id) {
    document.querySelectorAll(".public-page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ADMIN NAVIGATION
document.querySelectorAll(".nav-link").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".nav-link").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".admin-page").forEach(p => p.classList.remove("active"));
        document.getElementById(btn.dataset.target).classList.add("active");

        document.getElementById("adminTitle").innerText = btn.innerText.replace(/[^a-zA-Z ]/g, "");
    };
});

// RENDER ADMIN DATA
function renderAdmin() {
    document.getElementById("sLeads").innerText = db.leads.length;
    document.getElementById("sVisits").innerText = db.visits.length;
    document.getElementById("sDeals").innerText = db.deals.length;
    document.getElementById("sRevenue").innerText = "$" + db.deals.reduce((a, b) => a + b.amount, 0);

    // Properties
    let propHTML = "";
    db.properties.forEach(p => {
        propHTML += `
            <div class="property-card">
                <img src="${p.img}" alt="">

                <div class="property-body">
                    <h4>${p.title}</h4>
                    <p>📍 ${p.location} • ${p.type}</p>
                    <div class="property-price">$${p.price}</div>
                </div>
            </div>
        `;
    });
    document.getElementById("propertyList").innerHTML = propHTML;

    // Leads
    let leadHTML = "";
    db.leads.forEach(l => {
        leadHTML += `
            <tr>
                <td>${l.name}</td>
                <td>${l.phone}</td>
                <td>${l.source}</td>
                <td>${l.status}</td>
                <td><button class="btn">Follow Up</button></td>
            </tr>
        `;
    });
    document.getElementById("leadBody").innerHTML = leadHTML;

    // Charts
    new Chart(document.getElementById("pipelineChart"), {
        type: "doughnut",
        data: { 
            labels: ["New", "Follow-up", "Interested", "Closed"], 
            datasets: [{ 
                data: [4, 2, 3, 1], 
                backgroundColor: ["#3b82f6", "#f97316", "#8b5cf6", "#10b981"] 
            }] 
        }
    });
}

// RENDER PUBLIC SITE
function renderPublic() {
    let propHTML = "";
    db.properties.forEach(p => {
        propHTML += `
            <div class="property-card">
                <img src="${p.img}" alt="">

                <div class="property-body">
                    <h4>${p.title}</h4>
                    <p>📍 ${p.location}</p>
                    <div class="property-price">$${p.price}</div>
                    <button class="btn btn-primary" style="margin-top:10px;width:100%">
                        Request Site Visit
                    </button>
                </div>
            </div>
        `;
    });
    document.getElementById("publicPropertyList").innerHTML = propHTML;
}

function searchProperties() {
    showPublicPage('listings');
    renderPublic();
}

// MODAL
document.getElementById("addBtn").onclick = () => {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modalContent").innerHTML = `
        <h3>Add New Property</h3>
        <br>
        <input id="t" placeholder="Title" style="width:100%;padding:12px;margin-bottom:12px;border:1px solid var(--border);border-radius:8px">
        <input id="p" placeholder="Price" style="width:100%;padding:12px;margin-bottom:12px;border:1px solid var(--border);border-radius:8px">
        <button class="btn btn-primary" onclick="addProp()">Save</button>
    `;
};

document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").classList.add("hidden");
};

function addProp() {
    db.properties.push({
        id: Date.now(),
        title: document.getElementById("t").value,
        price: document.getElementById("p").value,
        type: "Residential",
        location: "Math, Maharashtra",
        status: "Available",
        img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"
    });

    save();
    renderAdmin();
    renderPublic();
    document.getElementById("modal").classList.add("hidden");
}

// INITIAL LOAD
renderPublic();