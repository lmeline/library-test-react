export default function PanWorkspaceTile({ index, removeTile }) {
  console.log(index)
  return (
    <div style={{ height:'100%', background:`rgb(${Math.log((index*15))*(index+1)*40},${Math.log((index*15))*(index+1)*10},${(index*15)+(index+1)*25})`}}>
    <button onClick={() => {console.log(index)
      removeTile(index)}}>Remove</button>
      Tile {index}
    </div>
  );
}