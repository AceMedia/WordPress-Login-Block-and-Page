# Ace Login Block

**Contributors:** Shane Rounce of AceMedia.ninja  
**Tags:** login, block, custom login, WordPress, Gutenberg, security  
**Tested up to:** 6.6  
**Stable tag:** 1.0.0  

Customize your WordPress login page with a fully-integrated Gutenberg block, giving you complete control over the design and functionality.

## Description

Ace Login Block allows you to replace the default WordPress login page with a custom page of your choosing, all designed and managed within the block editor. This lets you create a branded login experience for your users while leveraging the flexibility and ease of Gutenberg.

### Features include:
- Replace the default WordPress login page with a custom block-based design.
- Full integration with the block editor, giving you complete control over the login page layout.
- Allow the default WordPress login functionality for POST requests to ensure smooth login submissions.
- Customize redirects and add additional fields or branding elements to the login page.
- Prevent further execution of the default `wp-login.php` after your custom login template loads.

Ace Login Block provides a seamless way to craft unique, branded login experiences while ensuring compatibility with WordPress’s login handling.

## Installation

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/ace-login-block` directory, or install the plugin through the WordPress plugin screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Navigate to the "Ace Login Block" settings and select the page to use for your custom login page.

## Frequently Asked Questions

### How do I customize my login page?

Once the plugin is activated, go to the "Ace Login Block" settings in your WordPress dashboard and select the page you want to use as your custom login page. You can then use the block editor to design the page.

### Will WordPress still handle logins?

Yes, WordPress will continue to handle all login submissions via POST requests, ensuring that authentication continues to work normally. Ace Login Block simply replaces the display of the login page with your custom page design for GET requests.

### Can I add custom fields to my login page?

Yes, you can add custom blocks, text, images, or any other elements within the block editor to fully customize the layout of your login page.

### What happens if I disable the plugin?

If you disable Ace Login Block, WordPress will revert to the default `wp-login.php` page for login access.

## Screenshots

1. **Custom login page** built using Ace Login Block in the block editor.
2. Example of branded login page after replacing the default WordPress login page.

## Changelog

### 1.0.0
- Initial release of Ace Login Block.
- Replace default WordPress login page with a custom page created in the block editor.
- Full block editor support for designing custom login pages.
- Ensure POST requests for login are still handled by WordPress.
- Support for custom login redirects.

## Advanced Use

Ace Login Block is perfect for developers and site owners looking to create unique, branded login experiences. By leveraging the block editor, you can design your login page however you see fit, from adding custom fields to embedding brand logos or messages. The plugin ensures that login functionality remains intact while offering flexibility over the appearance and content of the login page.
