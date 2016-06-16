import 'normalize-css';
import '../../Global.scss';
import './Site.scss';

import jQuery from 'jquery';
window.jQuery = jQuery;


import { bootstrap } from 'aurelia-bootstrapper-webpack';

const bootstrapper  = function(aurelia)
{
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    aurelia.start().then(() => aurelia.setRoot('Apps/Site/Site', document.body));
};

bootstrap(bootstrapper);
