import PanWorkspaceTile from "./PanWorkspaceTile";

export default function PanWorkspaceZone({ zone, onRemoveZone}) {
  console.log("🚀 ~ PanWorkspaceZone ~ zone:", zone)
  const { id, tiles } = zone;

  return (
    <div style={{ flex: 1, border: "2px solid #666", padding: "8px" }}>
      <div style={{gap:"8px", display:"flex",margin:"8px",alignItems:"center"}}>
        Zone {id}
        <button onClick={() => onRemoveZone(id)}>✕ Zone</button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        {tiles.map((tile) => (
          <PanWorkspaceTile key={tile.id} id={tile.id} />
        ))}
      </div>
    </div>
  );
}