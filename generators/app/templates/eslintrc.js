'use strict';
// rule reference: http://eslint.org/docs/rules
// individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE

module.exports = {
    extends: "ovh/configs/es6-browser",
    globals: {
        Drupal: true,
        jQuery: true,
        _: true,
        domready: true
    }
};
