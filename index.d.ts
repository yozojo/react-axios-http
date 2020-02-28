
import * as React from 'react';

interface ApisProps {
  [key: string]: any
}

interface ConnectApiProps {
  scope: string | string[],
  isScope?: boolean,
  resultMode?: string
}

interface ProviderProps {
  apis: string[],
  context?: any,
  children?: React.ReactNode
}

interface ConfigProps {
  resultMode?: string,
  prefix?: string,
}

export declare function combineApi(apis: ApisProps, isScope?: boolean): any;

export declare function connectApi(WrapperComponent: React.Component | string | string[], scope?: string | string[] | ConnectApiProps): React.Component;

export declare function ProviderApi(obj: ProviderProps): React.Component;

declare function http(apis: ApisProps, config?: ConfigProps): any;

export default http;