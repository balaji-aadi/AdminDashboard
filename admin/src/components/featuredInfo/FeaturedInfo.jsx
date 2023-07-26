import "./featuredinfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)
  const [salesRev, setSalesRev] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/income', { withCredentials: true })
        setIncome(res.data)
        setPerc((res.data[1].total * 100) / res.data[0].total - 100)
        setSalesRev(((res.data[1].total - res.data[0].total) / res.data[0].total)*100)
        
      }
      catch (err) {
        console.log(err)
      }
    }
    getIncome();
  }, [])
  console.log(salesRev)

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹ {income[1]?.total} </span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)} {perc < 0 ? (

              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : <ArrowUpwardIcon className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
