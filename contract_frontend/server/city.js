class City {
    constructor(cityName, lat, lon) {
        this.name = cityName;
        this.lat = lat;
        this.lon = lon;
    }

    getUrlEncodedCoordinates() {
        return "lat=" + this.lat + "&lon=" + this.lon;
    }
}

export default City;