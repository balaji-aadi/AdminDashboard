import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import axios from 'axios'

export default function HomePage() {
  const[userStats, setUserStats] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try{
        const res = await axios.get('http://localhost:5000/api/users/stats',{withCredentials:true})
        res.data.map(item => (
          setUserStats(prev => [
            ...prev,
            {name:MONTHS[item._id-1], "Active User" : item.total}
          ])
        ))
      }
      catch(err){
        console.log(err)
      }
    }
    getStats()
  },[MONTHS])


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
