import { reactotron } from 'src/devtools/ReactotronConfig';

declare global {
  interface Console {
    tron: typeof reactotron;
  }
}
