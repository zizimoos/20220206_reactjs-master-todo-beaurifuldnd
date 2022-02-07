import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      cardColor: string;
      boardColor: string;
      boardsColor: string;
      textColor: string;
    };
  }
}
