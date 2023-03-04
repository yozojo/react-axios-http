import * as React from "react";
import { AxiosResponse } from "axios";

interface ApisProps {
  [key: string]: any;
}

interface ConnectApiProps {
  scope: string | string[];
  isScope?: boolean;
  resultMode?: string;
}

interface ProviderProps {
  apis: Record<string, unknown>;
  context?: any;
  children?: React.ReactNode;
}

export interface ConfigProps {
  resultMode?: string;
  prefix?: string;
  adapter?: (config: any) => Promise<void | AxiosResponse<any, any>>;
}

export declare function combineApi(apis: ApisProps, isScope?: boolean): any;

export declare function connectApi(
  WrapperComponent: React.Component | string | string[],
  scope?: string | string[] | ConnectApiProps
): any;

export declare function ProviderApi(obj: ProviderProps): any;

declare function http(apis: ApisProps, config?: ConfigProps): any;

export default http;
