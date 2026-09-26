const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async function () {

    const destination = document.getElementById("destination").value.trim();
    const date = document.getElementById("date").value;
    const flightClass = document.getElementById("flightClass").value;

    const results = document.getElementById("results");

    if (!destination || !date) {
        results.innerHTML = `
            <div class="flight-card">
                <div>
                    <strong>Please enter destination and travel date.</strong>
                </div>
            </div>
        `;
        return;
    }

    searchBtn.innerText = "Searching...";
    searchBtn.disabled = true;

    try {

        const response = await fetch("/search", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                destination: destination,
                date: date,
                flight_class: flightClass
            })
        });

        const data = await response.json();

        results.innerHTML = `
            <h2 class="result-title">
                Available Flights ✈
            </h2>
        `;

        data.flights.forEach(function (flight) {

            results.innerHTML += `
                <div class="flight-card">

                    <div>
                        <div class="airline">
                            ${flight.airline}
                        </div>

                        <div class="route">
                            ${flight.from} → ${flight.to}
                        </div>

                        <div class="time">
                            ${flight.departure} - ${flight.arrival}
                            &nbsp; | &nbsp;
                            ${flight.date}
                        </div>

                        <div class="time">
                            ${flight.class}
                        </div>
                    </div>

                    <div>
                        <div class="price">
                            ${flight.price}
                        </div>

                        <button class="book-btn"
                            onclick="bookFlight('${flight.airline}')">
                            Select Flight
                        </button>
                    </div>

                </div>
            `;
        });

    } catch (error) {

        results.innerHTML = `
            <div class="flight-card">
                <strong>
                    Something went wrong. Please try again.
                </strong>
            </div>
        `;

    } finally {

        searchBtn.innerText = "Search Flights ✈";
        searchBtn.disabled = false;
    }
});


function bookFlight(airline) {

    alert(
        "Selected " + airline +
        ". Booking confirmation will be added in the next step."
    );
}