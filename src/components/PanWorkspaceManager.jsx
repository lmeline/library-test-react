import { useState } from "react";
import PanWorkspaceZone from "./PanWorkspaceZone";
import config from "../layout/jsonV1.json"
import { Group, Panel } from "react-resizable-panels"
import { Separator } from "react-resizable-panels";
export default function PanWorkspaceManager() {
  const [zones, setZones] = useState(config.zones);

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button style={{ margin: "8px" }} onClick={addZone}>
          + Zone
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Group orientation="horizontal">
          {zones.flatMap((zone, index) => [
            index > 0 && (
              <Separator key={`sep-${zone.id}`} style={{ width: 4, background: "#ccc" }} />
            ),
            <Panel key={zone.id} id={String(zone.id)} minSize={10}>
              <PanWorkspaceZone
                zone={zone}
                onRemoveZone={removeZone}
                onUpdateZone={updateZone}
              />
            </Panel>,
          ])}
        </Group>
      </div>
    </div>
  );
}