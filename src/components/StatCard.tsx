
// כרטיס נתון: כותרת + מספר (props)
export type StatCardProps={
title:string,
value:string|number
}


const StatCard=({title,value}:StatCardProps)=>{
return(<>
<div >
<h2>{title}</h2>
<p>{value}</p>

</div>
</>)
}
export default StatCard