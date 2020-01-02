
import * as React from 'react';

export function combineApi(apis: object, isScope?: boolean): any;

export function connectApi (WrapperComponent: React.Component, scope?: string| string[]): React.Component;

interface ProviderProps {
  apis: string[],
  context?: any,
  children?: React.ReactNode
}

export function ProviderApi (obj: ProviderProps ): React.Component;

interface OptProps {
  resultMode?: string,
  host?: string,
  prefix?: string,
}

declare function http(apis: object, opt?: OptProps): any;

export default http;