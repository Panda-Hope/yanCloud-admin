/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Result<T = any> {
  success: boolean;
  errCode?: number;
  errMessage?: string;
  data?: T;

  // 0: 无、1: toast、2: alert
  errorShowType?: number;
  toast?: string;
  alertInfo?: {
    title?: string;
    subTitle?: string;
    actions?: Array<{
      title?: string;
      url?: string;
    }>;
  };
}

declare namespace wx {
  miniProgram: any
}