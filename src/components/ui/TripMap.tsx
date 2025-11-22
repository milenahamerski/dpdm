import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface TripMapProps {
  lat: number;
  lon: number;
}

export default function TripMap({ lat, lon }: TripMapProps) {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
        #map {
          height: 100%;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script>
        var map = L.map('map').setView([${lat}, ${lon}], 15); // ZOOM 15

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        L.marker([${lat}, ${lon}]).addTo(map);
      </script>
    </body>
  </html>
`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore the Spot</Text>

      <View style={styles.wrapper}>
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
  },
  wrapper: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
});
