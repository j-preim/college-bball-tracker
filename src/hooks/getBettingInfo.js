import { useEffect, useState } from "react";

export const getBettingInfo = (gameId, bettingData) => {
  let bettingInfo = "TBD";
  let finalBettingInfo;
  // console.log(bettingData);

  for (let i = 0; i < bettingData.length; i++) {
    if (bettingData[i].uuids === gameId) {
      if (bettingData[i].status === "closed") {
        bettingInfo = "";
      }
      else if (bettingData[i].status === "not_started") {
        bettingInfo = bettingData[i].consensus.lines[2].spread
      }
      else if (bettingData[i].status === "live") {
        bettingInfo = bettingData[i].consensus.lines[3].spread
      }
      else bettingInfo = "TBD"
    }
  }


  finalBettingInfo = (bettingInfo?.includes("-") || bettingInfo === "TBD" || bettingInfo === "") ? bettingInfo : "+" + bettingInfo
  
  return finalBettingInfo;
};

