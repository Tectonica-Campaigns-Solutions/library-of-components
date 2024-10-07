import { initConfig } from './src/config';
require('./src/styles/global.scss');
require('./node_modules/bootstrap/dist/css/bootstrap.min.css');


export const onClientEntry = () => {
  initConfig();
}