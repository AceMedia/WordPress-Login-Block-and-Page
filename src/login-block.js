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
registerBlockType( 'ace/login-block', {
    title: __( 'Login Block', 'login-block' ),
    icon: 'lock',
    category: 'common',
    attributes: {
        redirectUrl: {
            type: 'string',
            default: '', // Optional override for redirect URL
        },
        labelUsername: {
            type: 'string',
            default: __( 'Username', 'login-block' ),
        },
        labelPassword: {
            type: 'string',
            default: __( 'Password', 'login-block' ),
        },
        labelRemember: {
            type: 'string',
            default: __( 'Remember Me', 'login-block' ),
        },
        labelLogIn: {
            type: 'string',
            default: __( 'Log In', 'login-block' ),
        },
    },

    edit: ( { attributes, setAttributes } ) => {
        const { redirectUrl, labelUsername, labelPassword, labelRemember, labelLogIn } = attributes;

        return (
            <div { ...useBlockProps() }>
                <InspectorControls>
                    <PanelBody title={ __( 'Login Form Settings', 'login-block' ) }>
                        <TextControl
                            label={ __( 'Redirect URL', 'login-block' ) }
                            value={ redirectUrl }
                            onChange={ ( value ) => setAttributes( { redirectUrl: value } ) }
                            help={ __( 'Leave blank to use WordPress default behavior or provide a custom URL to override.', 'login-block' ) }
                        />
                        <TextControl
                            label={ __( 'Username Label', 'login-block' ) }
                            value={ labelUsername }
                            onChange={ ( value ) => setAttributes( { labelUsername: value } ) }
                        />
                        <TextControl
                            label={ __( 'Password Label', 'login-block' ) }
                            value={ labelPassword }
                            onChange={ ( value ) => setAttributes( { labelPassword: value } ) }
                        />
                        <TextControl
                            label={ __( 'Remember Me Label', 'login-block' ) }
                            value={ labelRemember }
                            onChange={ ( value ) => setAttributes( { labelRemember: value } ) }
                        />
                        <TextControl
                            label={ __( 'Log In Button Text', 'login-block' ) }
                            value={ labelLogIn }
                            onChange={ ( value ) => setAttributes( { labelLogIn: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div className="wp-block-ace-login-form-editor">
                    <form className="wp-block-ace-login-form">
                        <p>
                            <label>{ labelUsername }</label>
                            <input type="text" placeholder={ __( 'Username', 'login-block' ) } disabled />
                        </p>
                        <p>
                            <label>{ labelPassword }</label>
                            <input type="password" placeholder={ __( 'Password', 'login-block' ) } disabled />
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" disabled /> { labelRemember }
                            </label>
                        </p>
                        <p>
                            <button type="button" className="button button-primary" disabled>
                                { labelLogIn }
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    },

    save: ( { attributes } ) => {
        const { redirectUrl, labelUsername, labelPassword, labelRemember, labelLogIn } = attributes;
    
        // Function to get query string parameters
        const getQueryParameter = (name) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        };
    
        // Try to grab the 'redirect_to' param from the URL
        const redirectTo = redirectUrl || getQueryParameter('redirect_to') || '/wp-admin'; // Default to wp-admin if no redirect URL is set
    
        return (
            <div { ...useBlockProps.save() }>
                <form name="loginform" id="loginform" className="wp-block-ace-login-form" action="/core/wp-login.php" method="post">
                    <p>
                        <label htmlFor="user_login">{ labelUsername }</label>
                        <input type="text" name="log" id="user_login" className="input" autocapitalize="none" autocomplete="username" required />
                    </p>
                    <div className="user-pass-wrap">
                        <label htmlFor="user_pass">{ labelPassword }</label>
                        <div className="wp-pwd">
                            <input type="password" name="pwd" id="user_pass" className="input password-input" autocomplete="current-password" spellCheck="false" required />
                            <button type="button" className="button button-secondary wp-hide-pw hide-if-no-js" data-toggle="0" aria-label="Show password">
                                <span className="dashicons dashicons-visibility" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <p className="forgetmenot">
                        <input name="rememberme" type="checkbox" id="rememberme" value="forever" /> <label htmlFor="rememberme">{ labelRemember }</label>
                    </p>
                    <p className="submit">
                        <button type="submit" name="wp-submit" id="wp-submit" className="button button-primary button-large">
                            { labelLogIn }
                        </button>
                        <input type="hidden" name="redirect_to" value={ redirectTo } />
                        <input type="hidden" name="testcookie" value="1" />
                    </p>
                </form>
            </div>
        );
    },    
} );