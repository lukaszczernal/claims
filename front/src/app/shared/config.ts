import { InjectionToken } from "@angular/core";

export const CONFIG = new InjectionToken<EnvConfig>('Env config');

export interface EnvConfig {
    apihost: string;
}