import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      textColor: string;
    };
  }
}