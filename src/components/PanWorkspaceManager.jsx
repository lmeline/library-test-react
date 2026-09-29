import { useState } from "react";
import PanWorkspaceZone from "./PanWorkspaceZone";
import config from "../layout/jsonV1.json";
import { Group, Panel } from "react-resizable-panels";
import { Separator } from "react-resizable-panels";
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

      <div style={{ flex: 1, minHeight: 0, height: "100vh" }}>
        {/* <Group orientation="horizontal">
            {zones.flatMap((zone, index) => [
              index > 0 && (
                <Separator
                  key={`sep-${zone.id}`}
                  style={{ width: 4, background: "red" }}
                />
              ),
              <Panel key={zone.id} id={String(zone.id)} minSize={10}>
                <PanWorkspaceZone
                  zone={zone}
                  onRemoveZone={removeZone}
                  onUpdateZone={updateZone}
                />
              </Panel>,
            ])}
          </Group> */}
        <Group style={{ minHeight: "100vh",minWidth:'400px' }} orientation={config.init}>
          {config.layout.zoneId.map((arrayIds, idArr) => {
            if (idArr > 0) {
              if (arrayIds.length > 1) {
                return (
                  <Group
                    style={{ minHeight: "100vh" }}
                    orientation={config.layout.order[idArr]}
                  >
                    {arrayIds.map((idZ, id2) => {
                      if (!id2 > 0) {
                        
                        return [
                          <Separator
                            key={`sep-${config.zones[idZ].id}`}
                            style={{ height: 4, background: "blue" }}
                          />,
                          <Panel
                            key={config.zones[idZ].id}
                            id={String(config.zones[idZ].id)}
                            minSize={10}
                          >
                            <PanWorkspaceZone
                              zone={config.zones[idZ]}
                              onRemoveZone={removeZone}
                              onUpdateZone={updateZone}
                            />
                          </Panel>,
                        ];
                      } else {
                        return (
                          <Panel
                            key={config.zones[idZ].id}
                            id={String(config.zones[idZ].id)}
                            minSize={10}
                          >
                            <PanWorkspaceZone
                              zone={config.zones[idZ]}
                              onRemoveZone={removeZone}
                              onUpdateZone={updateZone}
                            />
                          </Panel>
                        );
                      }
                    })}
                  </Group>
                );
              } else {
                return [
                  <Separator
                    key={`sep-${config.zones[arrayIds[0]].id}`}
                    style={{ height: 4, background: "green" }}
                  />,
                  <Panel
                    key={config.zones[arrayIds[0]].id}
                    id={String(config.zones[arrayIds[0]].id)}
                    minSize={10}
                  >
                    <PanWorkspaceZone
                      zone={config.zones[arrayIds[0]]}
                      onRemoveZone={removeZone}
                      onUpdateZone={updateZone}
                    />
                  </Panel>,
                ];
              }
            } else {
              return (
                <Panel
                  key={config.zones[arrayIds[0]].id}
                  id={String(config.zones[arrayIds[0]].id)}
                  minSize={10}
                >
                  <PanWorkspaceZone
                    zone={config.zones[arrayIds[0]]}
                    onRemoveZone={removeZone}
                    onUpdateZone={updateZone}
                  />
                </Panel>
              );
            }
          })}
          {/* {config.order.map((orientation) => {
            <Group style={{ minHeight: "40vh" }} orientation={orientation}>
              
            </Group>;
          })}
          {zones.flatMap((zone, index) => [
            index > 0 && (
              <Separator
                key={`sep-${zone.id}`}
                style={{ height: 4, background: "red" }}
              />
            ),
            <Panel key={zone.id} id={String(zone.id)} minSize={10}>
              <PanWorkspaceZone
                zone={zone}
                onRemoveZone={removeZone}
                onUpdateZone={updateZone}
              />
            </Panel>,
          ])} */}
        </Group>
      </div>
    </div>
  );
}
