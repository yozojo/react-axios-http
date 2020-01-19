import { combineApi } from "react-axios-http";

import statistic from "./statistic";
import query from "./query";

const apis = combineApi({ statistic, query });
/* combineApi合并apis，作用域。
const IO = http(combineApi({
  apis_1: apis,
  apis_2: apis,
  apis_3: apis,
},
true/false 默认true，作用域开启
)); */

export default apis;
