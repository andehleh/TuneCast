import { useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react"
import HistoryModal from "./HistoryModal";

function HistoryList() {
  const [history, setHistory] = useState([]);
  const { token, fetchWithToken } = useToken();
  // const [search , setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  useEffect(()=> {
    async function getData() {
      if (token) {
        const resp = await fetchWithToken(`${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/`);
        if (resp) {
            const data = await resp;
            if (isMounted){
              setHistory(data.history);
              setIsMounted(false);
            }
        }
      };
    };
    getData();
  }, [token, fetchWithToken, isMounted]);

  const handleDelete = async (e) => {
    const historyId = e.target.id
    if (token) {
        const resp = await fetchWithToken(
          `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/${historyId}/`,
          "DELETE"
          );
        if (resp) {
            const data = await resp;
        }
      };
  }


  return (<>
  {history &&
    <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
              <th>Playlist</th>
            </tr>
          </thead>
          <tbody>
              {history.map(h => {
                return(
                  <tr key={h.id}>
                      <td>{h.date}</td>
                      <td>{h.weather}</td>
                      <td>{h.playlist}</td>
                      <td><button onClick={handleDelete} value={h.user_id} id={h.id} className="dropdown-item text-danger" type="button">Delete</button></td>
                  </tr>
                )
              })}
          </tbody>
      </table>
  }
  </>);
};
export default HistoryList;
