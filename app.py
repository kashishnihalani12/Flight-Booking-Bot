from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search_flights():
    data = request.get_json()

    destination = data.get("destination")
    date = data.get("date")
    flight_class = data.get("flight_class")

    flights = [
        {
            "airline": "SkyAir",
            "from": "Karachi",
            "to": destination,
            "date": date,
            "class": flight_class,
            "price": "$245",
            "departure": "08:30 AM",
            "arrival": "11:45 AM"
        },
        {
            "airline": "AirConnect",
            "from": "Karachi",
            "to": destination,
            "date": date,
            "class": flight_class,
            "price": "$289",
            "departure": "01:15 PM",
            "arrival": "04:30 PM"
        },
        {
            "airline": "FlyWorld",
            "from": "Karachi",
            "to": destination,
            "date": date,
            "class": flight_class,
            "price": "$315",
            "departure": "07:00 PM",
            "arrival": "10:20 PM"
        }
    ]

    return jsonify({
        "success": True,
        "flights": flights
    })


if __name__ == "__main__":
    app.run(debug=True)