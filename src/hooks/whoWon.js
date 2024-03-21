export default function whoWon(homePoints, awayPoints) {
  let spread = (homePoints - awayPoints);
  console.log(spread)
  if (spread > 0) {
    return "homeWon";
  } else if (spread < 0) {
    return "awayWon";
  }
}