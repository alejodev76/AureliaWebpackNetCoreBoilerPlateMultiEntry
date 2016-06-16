import 'normalize-css';
import '../../Global.scss';
import './SignIn.scss';

import jQuery from 'jquery';
window.jQuery = jQuery;

import { bootstrap } from 'aurelia-bootstrapper-webpack';

const bootstrapper  = function(aurelia)
{
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    aurelia.start().then(() => aurelia.setRoot('Apps/SignIn/SignIn', document.body));
};

bootstrap(bootstrapper);