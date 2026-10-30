import { useState } from "react";
import ResultContext from "./ResultContext.js";
import axios from "axios";

export default function ResultContextProvider({ children }) {
  return <ResultContext.Provider>{children}</ResultContext.Provider>;
}
