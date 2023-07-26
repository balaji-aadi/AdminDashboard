import React from 'react'
import './topbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from 'react-router-dom'

const Topbar = () => {
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topleft">
                    <Link to={'/'}><img src="/logo2.png" alt="" className='logo' /></Link>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <NotificationsNoneIcon />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <LanguageIcon />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <SettingsIcon />
                    </div>
                    <img src="/my_image.jpg" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar
