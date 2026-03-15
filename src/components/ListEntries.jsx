import Entry from "./Entry"

export default function ListEntries(props){

  function handleOnClick(e){
    for (let i = 0; i < props.entries.length; i++) {
      if (props.entries[i]._id === e.target.parentElement.id) {
        props.setCurrentEntry( props.entries[i] )
      }
    }
  }


  if( !props.entries.length ) return ( <p>No entries have been added yet!</p>)
  return (
    <>
      <table className="table table-striped table-sm table-hover">
        <thead className="table-head">
          <tr>
            <th>Entry</th>
            <th>Choices</th>
            <th>Champ</th>
            <th>Total Points</th>
          </tr>
        </thead>

        <tbody className="table-light">
          { props.entries.map( (entry) => (
            <tr key={entry.title} id={entry._id}>
              <td className="entryName" onClick={handleOnClick}>{ entry.title } </td>
              <td>
              {entry.teams.map( (team) => (
                <span key={team.id}>{team.market}, </span>
              ))}
              </td>
              <td>{ entry.champ }</td>
              <td>{ entry.points }</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Entry gamesData={props.gamesData} roundsData={props.roundsData} currentEntry={props.currentEntry}/>
    </>
  )
}