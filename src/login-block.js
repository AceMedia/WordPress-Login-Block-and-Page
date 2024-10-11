/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, PanelBody, ToggleControl } from '@wordpress/components';
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
        showPassword: {
            type: 'boolean',
            default: false, // Default is off
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const { redirectUrl, labelUsername, labelPassword, labelRemember, labelLogIn, showPassword } = attributes;

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
                        <ToggleControl
                            label={__('Allow users to show password', 'login-block')}
                            checked={showPassword}
                            onChange={(value) => setAttributes({ showPassword: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="wp-block-login-form-editor">
                    <form className="wp-block-login-form" action={redirectUrl || 'wp-login.php'} method="post">
                        <p>
                            <label>{labelUsername}</label>
                            <input type="text" name="log" placeholder={__('Username', 'login-block')} required />
                        </p>
                        <p>
                            <label>{labelPassword}</label>
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                name="pwd"
                                placeholder={__('Password', 'login-block')}
                                required
                            />
                            {showPassword && (
                                <span
                                    id="togglePassword"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        const passwordField = document.querySelector('input[name="pwd"]');
                                        passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                                    }}
                                >
                                    Show Password
                                </span>
                            )}
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" name="rememberme" /> {labelRemember}
                            </label>
                        </p>
                        <p>
                            <button type="submit" className="button button-primary">
                                {labelLogIn}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { redirectUrl, labelUsername, labelPassword, labelRemember, labelLogIn, showPassword } = attributes;

        // Function to get query string parameters
        const getQueryParameter = (name) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        };

        // Try to grab the 'redirect_to' param from the URL
        const redirectTo = getQueryParameter('redirect_to') || redirectUrl || '/wp-admin';

        return (
            <div className="wp-block-login-form">
                <form action={redirectTo} method="post">
                    <p>
                        <label>{labelUsername}</label>
                        <input type="text" name="log" id="user_login" placeholder={labelUsername} required />
                    </p>
                    <p>
                        <label>{labelPassword}</label>
                        <input
                            type={showPassword ? 'password' : 'text'}
                            name="pwd"
                            id="login-password"
                            placeholder={labelPassword}
                            required
                        />
                        {showPassword && (
                            <span
                                id="togglePassword"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    const passwordInput = document.getElementById('login-password');
                                    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                                }}
                            >
                                Show Password
                            </span>
                        )}
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="rememberme" /> {labelRemember}
                        </label>
                    </p>
                    <p>
                        <button type="submit" className="button button-primary">
                            {labelLogIn}
                        </button>
                    </p>
                    <input type="hidden" name="redirect_to" value={redirectTo} />
                    <input type="hidden" name="testcookie" value="1" /> {/* This is to set the test cookie */}
                </form>
            </div>
        );
    },
});
