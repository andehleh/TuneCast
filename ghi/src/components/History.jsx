import { useState, useEffect} from 'react'
import useToken from "@galvanize-inc/jwtdown-for-react"
import Table from 'react-bootstrap/Table'


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


  return (<>
  {history &&
    <Table className="table table-dark">
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
      </Table>
  }
  </>);
};
export default HistoryList;
