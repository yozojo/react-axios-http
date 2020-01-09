import { combineApi } from "react-axios-http";

import statistic from "./statistic";
import query from "./query";

const apis = combineApi({ statistic, query }, false);
// 如果此处是false，那么在项目中使用的connectApi，则会将全部接口注入props，
// 不会做类似props.query.get的限制，会直接props.get

export default apis;
