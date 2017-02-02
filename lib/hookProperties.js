'use strict';

var SVGAttributeNamespace = require('virtual-dom/virtual-hyperscript/svg-attribute-namespace');
var attributeHook = require('virtual-dom/virtual-hyperscript/hooks/attribute-hook');
var isHook = require("virtual-dom/vnode/is-vhook");

function hookProperties(props) {
    for (var key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }

        if (props[key].namespace) { //namespaced attribute
            props[key] = attributeHook(props[key].namespace, value);
        } else if (!isHook(props[key])) {
            var propertyNamespace = SVGAttributeNamespace(key);

            if (propertyNamespace !== undefined) { // svg attributes
                var value = props[key];
                props[key] = attributeHook(propertyNamespace, value);
            }
        }
    }
}

module.exports = hookProperties
