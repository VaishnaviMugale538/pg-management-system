import React from "react";

function StatCard({title,value,color}){

return(

<div
className="statCard"
style={{background:color}}
>

<h4>{title}</h4>

<h2>{value}</h2>

</div>

);

}

export default StatCard;