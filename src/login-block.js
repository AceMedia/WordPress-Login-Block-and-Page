/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Block metadata
 */
registerBlockType('ace/login-block', {
    title: __('Login Block', 'login-block'),
    icon: 'lock',
    category: 'common',
    attributes: {
        redirectUrl: {
            type: 'string',
            default: '', // Optional override for redirect URL
        },
        labelRemember: {
            type: 'string',
            default: __('Remember Me', 'login-block'),
        },
        labelLogIn: {
            type: 'string',
            default: __('Log In', 'login-block'),
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const { redirectUrl, labelRemember, labelLogIn } = attributes;

        // Template for inner blocks
        const TEMPLATE = [
            ['core/columns', { style: { spacing: { margin: '0px' } } }, [
                ['core/column', {}, [
                    ['core/paragraph', { content: __('<label for="log"><strong>Username:</strong></label>', 'login-block'), align: 'right' }],
                ]],
                ['core/column', {}, [
                    ['ace/username-block'],
                ]],
            ]],
            ['core/columns', { style: { spacing: { margin: '0px' } } }, [
                ['core/column', {}, [
                    ['core/paragraph', { content: __('<label for="pwd"><strong>Password:</strong></label>', 'login-block'), align: 'right' }],
                ]],
                ['core/column', {}, [
                    ['ace/password-block'],
                ]],
            ]],
            ['core/columns', { style: { spacing: { margin: '0px' } } }, [
                ['core/column', {}, [
                ]],
                ['core/column', {}, [
                    ['ace/remember-me-block', { label: labelRemember }],
                    ['core/buttons', {}, [
                        ['core/button', {
                            text: labelLogIn,
                            className: 'button',
                            ...attributes
                        }]
                    ]]
                ]],
            ]],
        ];

        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <PanelBody title={__('Login Form Settings', 'login-block')}>
                        <TextControl
                            label={__('Redirect URL', 'login-block')}
                            value={redirectUrl}
                            onChange={(value) => setAttributes({ redirectUrl: value })}
                            help={__('Leave blank to use WordPress default behavior or provide a custom URL to override.', 'login-block')}
                        />
                    </PanelBody>
                </InspectorControls>

                <form className="wp-block-login-form" method="post">
                    <InnerBlocks template={TEMPLATE} templateLock="all" />
                </form>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { redirectUrl } = attributes;
        const defaultRedirectUrl = redirectUrl || '/wp-admin';

        return (
            <div className="wp-block-login-form">
                <form action={aceLoginBlock.loginUrl} method="post">
                    <InnerBlocks.Content />
                    <input type="hidden" name="redirect_to" value={defaultRedirectUrl} />
                </form>
            </div>
        );
    },
});