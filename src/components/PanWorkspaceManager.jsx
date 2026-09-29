import { useState } from "react";
import PanWorkspaceZone from "./PanWorkspaceZone";
import config from "../layout/jsonV1.json"
import {Group,Panel} from "react-resizable-panels"
export default function PanWorkspaceManager() {
 const [zones, setZones] = useState(config.zones);
 console.log("🚀 ~ PanWorkspaceManager ~ zones:", zones)

const addZone = () => {
  if (zones.length >= 4) return;
  const usedIds = zones.map(zone => zone.id);
  let nextId = 1;
  while (usedIds.includes(nextId)) {
    nextId++;
  }
  setZones([
    ...zones,
    {
      id: nextId,
      displayMode: "",
      tiles: [],
    },
  ]);
};

const removeZone = (id) => {
  const newZones = zones.filter((zone) => {
    if (zone.id === id) {
      return false;
    }
    return true;
  });

  setZones(newZones);
};

  const updateZone = (id, newZoneData) => {
  const newZones = zones.map((zone) => {
    if (zone.id === id) {
      return {
        ...zone,
        ...newZoneData,
      };
    }
    return zone;
  });
  setZones(newZones);
};

  return (
    <Group orientation="horizontal">
      <button style={{margin:"8px"}} onClick={addZone}>+ Zone</button>
      <Panel style={{ display: "flex", gap: "8px" }}>
        {zones.map((zone) => (
          <PanWorkspaceZone
            key={zone.id}
            zone={zone}
            onRemoveZone={removeZone}
            onUpdateZone={updateZone}
          />
        ))}
      </Panel>
    </Group>
  );
}