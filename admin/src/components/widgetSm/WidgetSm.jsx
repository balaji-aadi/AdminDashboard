import { useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from "react";
import axios from 'axios'

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users?new=true', { withCredentials: true })
        setUsers(res.data);
      }
      catch (err) {
        console.log(err)
      }
    }
    getUsers();
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map(user => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src= {`../upload/${user.img}`  || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="userimg"
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username} </span>
              </div>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }

      </ul>
    </div>
  );
}
