import { useEffect, useState } from "react";
// import AddEntry from '../components/AddEntry'
import ListEntries from "../components/ListEntries";
import Entry from "../components/Entry";
import useVerifyUser from "../hooks/useVerifyUser";
import BracketLeftFirst from "../components/BracketLeftFirst";
import BracketLeftSecond from "../components/BracketLeftSecond";
import BracketRightFirst from "../components/BracketRightFirst";

export default function Entries(props) {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);

  const { isLoggedIn } = useVerifyUser();

  // function getGames(round, bracket) {
  //   let games = [];
  //   let data = props.roundsData;
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].roundName === round) {
  //       for (let x = 0; x < data[i].brackets.length; x++) {
  //         if (data[i].brackets[x].bracketRank === bracket) {
  //           games = data[i].brackets[x].bracketGames;
  //         }
  //       }
  //     }
  //   }

  //   games.sort((a, b) =>
  //   (a.title > b.title ? 1 : b.title > a.title ? -1 : 0)
  // );
  //   return games;
  // }

  async function getEntries() {
    try {
      const query = await fetch("/api/entry");
      const result = await query.json();
      if (result.status === "success") {
        setEntries(result.payload);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <div className="d-flex p-3 pb-2 headline">
        <h4 className="col-auto lato-regular">My entries:</h4>
        {/* <button className="col-auto btn btn-primary btn-sm mx-3">New Entry</button> */}
      </div>

      <div>
        {isLoggedIn === true ? (
          <ListEntries
            entries={entries}
            roundsData={props.roundsData}
            currentEntry={currentEntry}
            setCurrentEntry={setCurrentEntry}
          />
        ) : (
          <p>You must be logged in to view entries!</p>
        )}
      </div>
    </>
  );
}
