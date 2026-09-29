export default function PanWorkspaceTile({ index, removeTile }) {
  
  return (
    <div style={{ flex: 1, border: "1px solid #ccc",minHeight: "80px", }}>
    <button onClick={() => {console.log(index)
      removeTile(index)}}>Remove</button>
      Tile {index}
    </div>
  );
}