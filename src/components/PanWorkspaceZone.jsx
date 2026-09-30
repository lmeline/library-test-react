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
    <div style={{ height:'100%'}}>
      {/* <div
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
      </div> */}
        <Group style={{height:`100%`}}>
          {tileUi &&
            tileUi.flatMap((tile, index) => [
              index > 0 && (
                <Separator
                  key={`sep-${tile.id}`}
                  style={{ width: 4, background: "#f90404" }}
                />
              ),
              <Panel minSize={30} key={tile.id} id={tile.id}>
                <PanWorkspaceTile index={tile.id} removeTile={removeTile} />
              </Panel>,
            ])}
        </Group>
    </div>
  );
}
