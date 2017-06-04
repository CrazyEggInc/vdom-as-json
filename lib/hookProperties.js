'use strict';

var svgAttributeNamespace = require(
    'virtual-dom/virtual-hyperscript/svg-attribute-namespace'
);
var attributeHook = require(
    'virtual-dom/virtual-hyperscript/hooks/attribute-hook'
);
var isHook = require("virtual-dom/vnode/is-vhook");

function hookProperties(nodeNamespace, props) {
    for (var key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }

        if (props[key].namespace) { //namespaced attribute
            props[key] = attributeHook(props[key].namespace, props[key].value);
        } else if (!isHook(props[key]) && nodeNamespace !== null) {
            var propertyNamespace = svgAttributeNamespace(key);

            if (propertyNamespace !== undefined) { // svg attributes
                var value = props[key];
                props[key] = attributeHook(propertyNamespace, value);
            }
        }
    }
}

module.exports = hookProperties;
