import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, ToggleControl, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

registerBlockType('ace/password-block', {
    title: __('Password Block', 'login-block'),
    category: 'common',
    attributes: {
        label: {
            type: 'string',
            default: __('Password', 'login-block'),
        },
        showPassword: {
            type: 'boolean',
            default: false,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { label, showPassword } = attributes;

        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <PanelBody title={__('Password Block Settings', 'login-block')}>
                        <ToggleControl
                            label={__('Allow users to show password', 'login-block')}
                            checked={showPassword}
                            onChange={(value) => setAttributes({ showPassword: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <TextControl
                    type="password" // Always show as password in the editor
                    name="pwd"
                    placeholder={__('Password', 'login-block')}
                    required
                />
                {showPassword && (
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => setAttributes({ showPassword: !showPassword })}
                    >
                        {showPassword ? __('Hide Password', 'login-block') : __('Show Password', 'login-block')}
                    </span>
                )}
            </div>
        );
    },
    save: () => {
        // No save function needed for server-side rendering
        return null;
    },
});