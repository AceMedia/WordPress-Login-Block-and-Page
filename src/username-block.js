import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, ToggleControl, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';


registerBlockType("ace/username-block", {
    title: __("Username Block", "login-block"),
    category: "common",
    attributes: {
        label: {
            type: "string",
            default: __("Username", "login-block")
        }
    },
    edit: function (props) {
        var label = props.attributes.label;
        return (
            <div {...useBlockProps()}>
                <TextControl
                    type="text"
                    name="log"
                    placeholder={__("Username", "login-block")}
                    required={true}
                />
            </div>
        );
    },
    save: () => {
        // No save function needed for server-side rendering
        return null;
    },
});