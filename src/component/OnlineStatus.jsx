import React,{useState,useEffect} from 'react'
import WifiIcon from '@mui/icons-material/Wifi';

const OnlineStatus = () => {

    function useOnlineStatus() {
        const [online, setOnline] = useState(window.navigator.onLine)
        useEffect(() => {
          function handleOnline() {
            setOnline(true)
          }
          function handleOffline() {
            setOnline(false)
          }
          window.addEventListener("online", handleOnline)
          window.addEventListener("offline", handleOffline)
          return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
          }
        }, [])
        return online
      }

      const isOnline = useOnlineStatus()
      const text = isOnline ? "online" : "offline"
      const [status,setStatus]=useState(isOnline ? "online" : "offline")
    return (
        <div className="internetStatus">
           <WifiIcon/> 
           <p>{`You are ${text}`}</p>
        </div>
    )
}

export default OnlineStatus
