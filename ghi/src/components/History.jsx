import { useState, useEffect} from 'react'
import useToken from "@galvanize-inc/jwtdown-for-react"

function HistoryList() {
  const [history, setHistory] = useState([]);
  const { token, fetchWithToken } = useToken();
  const [search , setSearch] = useState("");

  useEffect(()=> {
    async function getData() {
      if (token) {
        const resp = await fetchWithToken("http://localhost:8000/api/history/");
        if (resp) {
            const data = await resp;
            setHistory(data.history);
        }
      };
    };
    getData();
  }, [token, fetchWithToken]);


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
                  </tr>
                )
              })}
          </tbody>
      </table>
  }
  </>);
};
export default HistoryList;
