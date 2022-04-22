import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ positions }) => {
  console.log(positions);
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(positions.startPosition[1], positions.startPosition[2]),
      L.latLng(positions.endPosition[1], positions.endPosition[2]),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
