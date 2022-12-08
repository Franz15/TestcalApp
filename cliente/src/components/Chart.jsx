import {Line, LineChart} from "recharts";

export default function RechartsExample(){
   
return (
    <LineChart width ={600} height={300} data ={records}>
      <Line type="monotone" dataKey = "records.test1Porcent" stroke ="#2196"/>
  
    </LineChart>
)
  }