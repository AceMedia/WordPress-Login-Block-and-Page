/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
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
        labelUsername: {
            type: 'string',
            default: __('Username', 'login-block'),
        },
        labelPassword: {
            type: 'string',
            default: __('Password', 'login-block'),
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
        const { redirectUrl, labelUsername, labelPassword, labelRemember, labelLogIn } = attributes;

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
                        <TextControl
                            label={__('Username Label', 'login-block')}
                            value={labelUsername}
                            onChange={(value) => setAttributes({ labelUsername: value })}
                        />
                        <TextControl
                            label={__('Password Label', 'login-block')}
                            value={labelPassword}
                            onChange={(value) => setAttributes({ labelPassword: value })}
                        />
                        <TextControl
                            label={__('Remember Me Label', 'login-block')}
                            value={labelRemember}
                            onChange={(value) => setAttributes({ labelRemember: value })}
                        />
                        <TextControl
                            label={__('Log In Button Text', 'login-block')}
                            value={labelLogIn}
                            onChange={(value) => setAttributes({ labelLogIn: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="wp-block-login-form-editor">
                    <form className="wp-block-login-form">
                        <p>
                            <label>{labelUsername}</label>
                            <input type="text" placeholder={__('Username', 'login-block')} disabled />
                        </p>
                        <p>
                            <label>{labelPassword}</label>
                            <input type="password" id="login-password" placeholder={__('Password', 'login-block')} disabled />
                            <i className="fa fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" disabled /> {labelRemember}
                            </label>
                        </p>
                        <p>
                            <button type="button" className="button button-primary" disabled>
                                {labelLogIn}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { labelUsername, labelPassword, labelRemember, labelLogIn } = attributes;

        return (
            <div className="wp-block-login-form">
                <form action="/wp-login.php" method="post">
                    <p>
                        <label>{labelUsername}</label>
                        <input type="text" name="log" placeholder={labelUsername} required />
                    </p>
                    <p>
                        <label>{labelPassword}</label>
                        <input type="password" id="login-password" name="pwd" placeholder={labelPassword} required />
                        <span id="togglePassword" style={{ cursor: 'pointer' }}>Show Password</span>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" id="show-password" />
                            {labelRemember}
                        </label>
                    </p>
                    <p>
                        <button type="submit" className="button button-primary">
                            {labelLogIn}
                        </button>
                    </p>
                </form>
            </div>
        );
    },
});