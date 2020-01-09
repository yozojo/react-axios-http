import { combineApi } from "react-axios-http";

import statistic from "./statistic";
import query from "./query";

const apis = combineApi({ statistic, query });

export default apis;
