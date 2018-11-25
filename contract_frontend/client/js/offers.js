window.onload = () => {
    getTopOffers();
}

let getTopOffers = () => {
    fetch("http://localhost:8080/getOffers", 
    {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        let holder = document.getElementById("offer-holder");
        res.offers.map(offer => {
            holder.appendChild(buildOfferBlock(offer));
        });
    });
}

let buildOfferBlock = (offer) => {
    let div = document.createElement("div");
    div.className = "offer";
    let name = document.createElement("p");
    name.innerHTML = "Offer recipient: " + offer.recipient;
    let location = document.createElement("p");
    location.innerHTML = "Offer location: " + offer.coordinates;
    let costPerUnit = document.createElement("p");
    costPerUnit.innerHTML = "Offer cost per unit: " + offer.offerPerUnit;
    let measurement = document.createElement("p");
    measurement.innerHTML = "Current measurement: " + offer.measurement;
    div.appendChild(name);
    div.appendChild(location);
    div.appendChild(costPerUnit);
    div.appendChild(measurement);
    
    return div;
}