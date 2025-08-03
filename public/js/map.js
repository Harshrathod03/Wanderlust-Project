mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // should be [lng, lat]
  zoom: 9
});

const popup = new mapboxgl.Popup({ offset: 35 })
  .setHTML(`<h3>${listing.title}</h3><p>Exact location provided after booking</p>`);

const marker = new mapboxgl.Marker({ color: "black" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);
