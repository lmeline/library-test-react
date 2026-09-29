import { Group } from "react-resizable-panels";
import PanWorkspaceTile from "./PanWorkspaceTile";
import { Separator } from "react-resizable-panels";
import { Panel } from "react-resizable-panels";

export default function PanWorkspaceZone({ zone, onRemoveZone }) {
  const { id, tiles } = zone;

  return (
    <div style={{ flex: 1, border: "2px solid #666", padding: "8px" }}>
      <div style={{ gap: "8px", display: "flex", margin: "8px", alignItems: "center" }}>
        Zone {id}
        <button onClick={() => onRemoveZone(id)}>✕ Zone</button>
      </div>
      <div>
        <Group>
          {tiles.flatMap((title, index) => [
            index > 0 && (
              <Separator key={`sep-${title.id}`} style={{ width: 4, background: "#ccc" }} />
            ),
            <Panel key={title.id} id={title.id}>
              <PanWorkspaceTile />
            </Panel>
          ])}
        </Group>
      </div>
    </div>
  );
}