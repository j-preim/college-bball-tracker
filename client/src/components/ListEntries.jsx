

export default function ListEntries(props){


  if( !props.entries.length ) return ( <p>No entries have been added yet!</p>)
  return (
    <>
      <table className="table table-striped table-sm">
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
            <tr key={entry.title}>
              <td>
                <span>
                  {/* <a href={`/entry/${entry?._id}`}> */}
                    { entry.title }
                  {/* </a> */}
                </span>
              </td>
              <td>
              {entry.teams.map( (team) => (
                <span key={team}>{ team }, </span>
              ))}
              </td>
              <td>{ entry.champ }</td>
              <td>{ entry.points }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}