import { useState } from "react";
import PanWorkspaceZone from "./PanWorkspaceZone";
import config from "../layout/jsonV1.json";
import { Group, Panel } from "react-resizable-panels";
import { Separator } from "react-resizable-panels";

const ZoneWithSeparator = (zone, zoneID, removeZone, updateZone) => {
  return [
    <Separator
      key={`sep-${zoneID}`}
      style={{ height: 4, background: "green" }}
    />,
    <Panel key={zoneID} id={String(zoneID)} minSize={10}>
      <PanWorkspaceZone
        zone={zone}
        onRemoveZone={removeZone}
        onUpdateZone={updateZone}
      />
    </Panel>,
  ];
};

const ZonePan = (zone, zoneID, removeZone, updateZone) => {
  return (
    <Panel key={zoneID} id={String(zoneID)} minSize={10}>
      <PanWorkspaceZone
        zone={zone}
        onRemoveZone={removeZone}
        onUpdateZone={updateZone}
      />
    </Panel>
  );
};

export default function PanWorkspaceManager() {
  const [zones, setZones] = useState(config.zones);
  const [rotation, setRotation] = useState(false);

  const [modulo, setModulo] = useState(0);

  const addZone = () => {
    if (zones.length >= 4) return;
    const usedIds = zones.map((zone) => zone.id);
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
        <button>{`<-- rotation`}</button>
        <button
          onClick={() => {
            setRotation((prev) => !prev);
            if (!modulo % 2 === 0) {
              setZones((prev) => {
                let prev2 = [...prev];
                prev2 = prev2.reverse();
                return prev2;
              });
            }
            setModulo((prev) => (prev + 1) % 2);
          }}
        >{`rotation -->`}</button>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Group
          style={{ minHeight: "40vh"}}
          orientation={config.init}
        >
          {config.layout.zoneId.map((arrayIds, idArr) => {
            if (arrayIds.length > 1) {
              return (
                <Group
                  style={{ minHeight: "10vh" }}
                  orientation={config.layout.order[idArr]}
                >
                  {arrayIds.map((idZ, id2) => {
                    if (!id2 > 0) {
                      return ZoneWithSeparator(
                        config.zones[idZ],
                        config.zones[idZ].id,
                        removeZone,
                        updateZone,
                      );
                    } else {
                      return ZonePan(
                        config.zones[idZ],
                        config.zones[idZ].id,
                        removeZone,
                        updateZone,
                      );
                    }
                  })}
                </Group>
              );
            } else {
              console.log("ZONE",config.zones[arrayIds[0]].id, config.zones[arrayIds[0]])
              if (!idArr > 0) {
                return ZoneWithSeparator(
                  config.zones[arrayIds[0]],
                  config.zones[arrayIds[0]].id,
                  removeZone,
                  updateZone,
                );
              } else {
                return ZonePan(
                  config.zones[arrayIds[0]],
                  config.zones[arrayIds[0]].id,
                  removeZone,
                  updateZone,
                );
              }
            }
          })}
        </Group>
      </div>
    </div>
  );
}
