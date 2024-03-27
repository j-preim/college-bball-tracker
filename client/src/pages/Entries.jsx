import { useEffect, useState } from "react";
// import AddEntry from '../components/AddEntry'
import ListEntries from '../components/ListEntries'
import Entry from "../components/Entry";
import useVerifyUser from '../hooks/useVerifyUser'

export default function Entries(props) {

  const [ entries, setEntries ] = useState([])
  const [ currentEntry, setCurrentEntry ] = useState(null)

  const { isLoggedIn } = useVerifyUser()

  async function getEntries(){
    try {
      const query = await fetch("/api/entry")
      const result = await query.json()
      if( result.status === "success" ){
        setEntries(result.payload)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getEntries()
  },[])

  
  return (
    <>
      <div className="d-flex p-3 pb-2 headline">
        <h4 className="col-auto lato-regular">My entries:</h4>
        {/* <button className="col-auto btn btn-primary btn-sm mx-3">New Entry</button> */}
      </div>

      <div> 
      { isLoggedIn === true ? (
              <ListEntries entries={entries} setCurrentEntry={setCurrentEntry} />
            ) : (
              <p>You must be logged in to view entries!</p>
            )}
      </div>

      <Entry gamesData={props.gamesData} currentEntry={currentEntry}/>
      {/* <Bracket /> */}
    </>
  );
}
