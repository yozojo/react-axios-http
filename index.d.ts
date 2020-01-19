
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

export function combineApi(apis: ApisProps, isScope?: boolean): any;

export function connectApi(WrapperComponent: React.Component | string | string[], scope?: string | string[] | ConnectApiProps): React.Component;

export function ProviderApi(obj: ProviderProps): React.Component;

declare function http(apis: ApisProps, config?: ConfigProps): any;

export default http;