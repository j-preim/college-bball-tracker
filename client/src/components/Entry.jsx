import BracketManual from "../components/BracketManual";
/*
  This component can stay as-is. Because it's on the Home page, 
  it's just easier to have the Home page give it the current note 
  via props.

  If we made this a standalone page, though, then we would look for 
  the note id in the url params, and do a database query for the 
  note data.
*/

export default function Entry(props) {
  

  if (!props.currentEntry) return <></>;
  return (
    <>
      <div className="mt-2 headline text-center">
        <h3>{props.currentEntry.title}</h3>
        {/* <p>{props.currentEntry.teams}</p> */}
      </div>
      <BracketManual gamesData={props.gamesData} roundsData={props.roundsData} currentEntry={props.currentEntry}/>
    </>
  );
}
