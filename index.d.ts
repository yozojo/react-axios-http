
import * as React from 'react';

interface Apis {
  [key: string]: any
}

interface ConnectApiOpt {
  scope: string | string[],
  isScope?: boolean,
  resultMode?: string
}

interface ProviderProps {
  apis: string[],
  context?: any,
  children?: React.ReactNode
}

interface OptProps {
  resultMode?: string,
  prefix?: string,
}

export function combineApi(apis: Apis, isScope?: boolean): any;

export function connectApi(WrapperComponent: React.Component | string | string[], scope?: string | string[] | ConnectApiOpt): React.Component;

export function ProviderApi(obj: ProviderProps): React.Component;

declare function http(apis: Apis, opt?: OptProps): any;

export default http;