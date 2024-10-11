<?php
/**
 * Plugin Name:       Ace Login Block
 * Description:       A block to replace the WordPress login page using a custom page and its template from the site editor.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.421.0
 * Author:            Shane Rounce
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ace-login-block
 *
 * @package AceLoginBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block and its settings.
 */
function create_block_ace_login_block_init() {
    register_block_type( __DIR__ . '/build/login-block' );
    register_block_type( __DIR__ . '/build/username-block' );
    register_block_type( __DIR__ . '/build/password-block' );
}
add_action( 'init', 'create_block_ace_login_block_init' );

/**
 * Register the custom login page setting in the General Settings section.
 */
function ace_login_block_register_settings() {
    register_setting( 'general', 'ace_login_block_custom_page', [
        'type' => 'integer',
        'description' => __( 'Custom page for login', 'ace-login-block' ),
        'sanitize_callback' => 'absint',
        'default' => 0,
    ] );

    // Add the setting field to the General Settings page
    add_settings_field(
        'ace_login_block_custom_page',
        __( 'Custom Login Page', 'ace-login-block' ),
        'ace_login_block_custom_page_field_html',
        'general'
    );
}
add_action( 'admin_init', 'ace_login_block_register_settings' );

/**
 * Display the dropdown to select the login page in the General Settings.
 */
function ace_login_block_custom_page_field_html() {
    $custom_page_id = get_option( 'ace_login_block_custom_page', 0 );
    $pages = get_pages();

    echo '<select name="ace_login_block_custom_page">';
    echo '<option value="">' . esc_html__( 'Select a page', 'ace-login-block' ) . '</option>';

    foreach ( $pages as $page ) {
        $selected = selected( $custom_page_id, $page->ID, false );
        echo '<option value="' . esc_attr( $page->ID ) . '" ' . $selected . '>' . esc_html( $page->post_title ) . '</option>';
    }

    echo '</select>';
}

/**
 * Replace wp-login.php with the selected custom page content and template.
 */
function ace_login_block_load_custom_page_template() {
    $custom_page_id = get_option( 'ace_login_block_custom_page' );

    // Check if we're on wp-login.php and a custom page is set
    if ( strpos( $_SERVER['REQUEST_URI'], 'wp-login.php' ) !== false && $custom_page_id ) {
        
        // If the request method is POST, let WordPress handle the login process
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            return; // Let WordPress handle the login submission
        }

        // Fetch the template for the chosen page
        $page_template = get_page_template_slug( $custom_page_id );

        // If no custom template is found, use the default page template
        if ( ! empty( $page_template ) && locate_template( $page_template ) ) {
            $template_path = locate_template( $page_template );
        } else {
            $template_path = get_page_template();
        }

        if ( ! empty( $template_path ) ) {
            // Set up the global post data for the custom page
            global $wp_query, $post;
            $post = get_post( $custom_page_id );
            setup_postdata( $post );

            // Load the custom page template
            include $template_path;

            // Prevent further execution after the template is loaded
            exit;
        } else {
            wp_die( __( 'Template not found for the login page.', 'ace-login-block' ) );
        }
    }
}
add_action( 'login_init', 'ace_login_block_load_custom_page_template' );

/**
 * Enqueue styles and scripts for the custom login page.
 */
function ace_login_block_login_enqueue_assets() {
    // Ensure scripts are using the WordPress Address (URL)
    $wp_address = get_bloginfo('wpurl');
    /*
        wp_enqueue_style(
            'ace-login-block-style',
            $wp_address . '/wp-content/plugins/ace-login-block/build/login-block.css',
            array(),
            filemtime( plugin_dir_path( __FILE__ ) . 'build/login-block.css' )
        );
    */

    wp_enqueue_script(
        'ace-login-block-js',
        $wp_address . '/wp-content/plugins/ace-login-block/build/login-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/login-block.js' ),
        true
    );

    // Localize script to pass the site URL to JavaScript
    wp_localize_script( 'ace-login-block-js', 'aceLoginBlock', array(
        'loginUrl' => site_url('wp-login.php'),
    ));
}
add_action( 'login_enqueue_scripts', 'ace_login_block_login_enqueue_assets' );

/**
 * Customize the login page title.
 */
function ace_login_block_login_title( $title ) {
    return __( 'Login', 'ace-login-block' );
}
add_filter( 'login_title', 'ace_login_block_login_title' );

/**
 * Enqueue assets for the blocks.
 */
function ace_login_block_enqueue_assets() {
    wp_enqueue_script(
        'ace-login-toggle',
        plugin_dir_url( __FILE__ ) . 'build/login-toggle.js',
        array(),
        '1.0.0',
        true
    );

    wp_enqueue_script(
        'ace-login-block-editor',
        plugin_dir_url( __FILE__ ) . 'build/login-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/login-block.js' ),
        true
    );

    wp_enqueue_script(
        'ace-username-block-editor',
        plugin_dir_url( __FILE__ ) . 'build/username-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/username-block.js' ),
        true
    );

    wp_enqueue_script(
        'ace-password-block-editor',
        plugin_dir_url( __FILE__ ) . 'build/password-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/password-block.js' ),
        true
    );

    wp_enqueue_script(
        'ace-remember-me-block-editor',
        plugin_dir_url( __FILE__ ) . 'build/remember-me-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/remember-me-block.js' ),
        true
    );
/*
    wp_enqueue_style(
        'ace-login-block-editor-style',
        plugin_dir_url( __FILE__ ) . 'build/login-block.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/login-block.css' )
    );
    */
}
add_action( 'enqueue_block_editor_assets', 'ace_login_block_enqueue_assets' );

function register_username_block() {
    register_block_type('ace/username-block', array(
        'render_callback' => 'render_username_block',
        'attributes' => array(
            'label' => array(
                'type' => 'string',
                'default' => __('Username', 'login-block'),
            ),
            'placeholder' => array(
                'type' => 'string',
                'default' => __('Username', 'login-block'),
            ),
        ),
    ));
}
add_action('init', 'register_username_block');

/**
 * Renders the Ace Username Block.
 */
function render_username_block($attributes) {
    $placeholder = isset($attributes['placeholder']) ? esc_html($attributes['placeholder']) : __('Username', 'login-block');
    
    return '<input type="text" id="log" name="log" placeholder="' . $placeholder . '" required />';
}

/**
 * Registers the Ace Password Block.
 */
function register_password_block() {
    register_block_type('ace/password-block', array(
        'render_callback' => 'render_password_block',
        'attributes' => array(
            'label' => array(
                'type' => 'string',
                'default' => __('Password', 'login-block'),
            ),
            'showPassword' => array(
                'type' => 'boolean',
                'default' => false,
            ),
        ),
    ));
}
add_action('init', 'register_password_block');

/**
 * Renders the Ace Password Block.
 */
function render_password_block($attributes) {
    $show_password = $attributes['showPassword'] ? 'true' : 'false';
    $placeholder = isset($attributes['placeholder']) ? esc_html($attributes['placeholder']) : __('Password', 'login-block');
    
    
    $html = '<input type="password" id="pwd" name="pwd" placeholder="' . $placeholder . '" required />';
    
    if ($attributes['showPassword']) {
        $html .= '<span style="cursor:pointer" data-show-password="' . $show_password . '">' . __('Show Password', 'login-block') . '</span>';
    }
        
    return $html;
}



/**
 * Registers the Ace Remember Me Block.
 */
function register_remember_me_block() {
    register_block_type('ace/remember-me-block', array(
        'render_callback' => 'render_remember_me_block',
        'attributes' => array(
            'label' => array(
                'type' => 'string',
                'default' => __('Remember Me', 'login-block'),
            ),
            'checked' => array(
                'type' => 'boolean',
                'default' => false,
            ),
        ),
    ));
}
add_action('init', 'register_remember_me_block');

/**
 * Renders the Ace Remember Me Block.
 */
function render_remember_me_block($attributes) {
    $label = esc_html($attributes['label']);
    $checked = $attributes['checked'] ? 'checked' : '';
    return '<p><label><input type="checkbox" name="rememberme" ' . $checked . ' /> ' . $label . '</label></p>';
}


function ace_login_block_enqueue_scripts() {
    wp_enqueue_script(
        'toggle-password',
        plugins_url('build/login-toggle.js', __FILE__),
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'ace_login_block_enqueue_scripts');