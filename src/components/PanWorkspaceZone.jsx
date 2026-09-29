import { Group } from "react-resizable-panels";
import PanWorkspaceTile from "./PanWorkspaceTile";
import { Separator } from "react-resizable-panels";
import { Panel } from "react-resizable-panels";
import { useEffect, useState } from "react";
export default function PanWorkspaceZone({ zone, onRemoveZone }) {
  const [tileUi, setTileUi] = useState(null);
  console.log(tileUi);
  const { id } = zone;

  useEffect(() => {
    async function test() {
      let { tiles } = zone;
      setTileUi([...tiles]);
    }
    test();
  }, [zone]);

  function addTile() {
    setTileUi((prev) => [
      ...prev,
      { name: "bla", id: prev.length + 1, src: "local" },
    ]);
  }
  function removeTile(id) {
    console.log("indice de la tile", id);
    let removeIndexTile = tileUi.findIndex((e) => e.id === id);
    console.log("INDICE DANS LE Tableau", removeIndexTile);
    setTileUi((prev) => {
      let prev2 = [...prev]
      prev2.splice(removeIndexTile, 1);
      return prev2;
    });
  }
  return (
    <div style={{ flex: 1, border: "2px solid #000000", padding: "8px" }}>
      <div
        style={{
          gap: "8px",
          display: "flex",
          margin: "8px",
          alignItems: "center",
        }}
      >
        Zone {id}
        <button onClick={() => onRemoveZone(id)}>✕ Zone</button>
        <button onClick={() => addTile()}>+ Tile</button>
      </div>
      <div>
        <Group>
          {tileUi &&
            tileUi.flatMap((tile, index) => [
              index > 0 && (
                <Separator
                  key={`sep-${tile.id}`}
                  style={{ width: 4, background: "#000000" }}
                />
              ),
              <Panel minSize={30} key={tile.id} id={tile.id}>
                <PanWorkspaceTile index={tile.id} removeTile={removeTile} />
              </Panel>,
            ])}
        </Group>
      </div>
    </div>
  );
}
