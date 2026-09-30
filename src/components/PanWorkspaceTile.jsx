export default function PanWorkspaceTile({ index, removeTile }) {
  
  return (
    <div style={{ height:'100%'}}>
    <button onClick={() => {console.log(index)
      removeTile(index)}}>Remove</button>
      Tile {index}
    </div>
  );
}