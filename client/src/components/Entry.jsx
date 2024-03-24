
/*
  This component can stay as-is. Because it's on the Home page, 
  it's just easier to have the Home page give it the current note 
  via props.

  If we made this a standalone page, though, then we would look for 
  the note id in the url params, and do a database query for the 
  note data.
*/

export default function Entry(props){

  if( !props.currentEntry ) return <></>
  return (
    <>
      <h1>{ props.currentEntry.title}</h1>
      <p>{props.currentEntry.teams}</p>
      
    </>
  )
}