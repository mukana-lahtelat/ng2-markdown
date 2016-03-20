# &lt;ng2-markdown&gt;

A Markdown component for Angular2.

This repo is intended to be loaded as a JSPM package and therefore provides the bare minimum.

To see a working example checkout the [ng2-markdown-demo][demo] project.

## Usage

*To use this component:*

1. Install the component via JSPM
  ```bash
  jspm install ng2-markdown
  ```

2. Import into your Angular2 component
  ```javascript
  import { MarkdownComponent } from ng2-markdown;
  ```

3. Add the component to your `@View.directives`
  ```javascript
  ...
  @View({
    templateURL: 'template.html',
    directives: [ MarkdownComponent ]
  })
  ...
  ```

4. Use the component in your templateURL
  ```javascript
  <ng2-markdown>
  ### MARKDOWN
  this really [works](google.com)
  ``language-javascript
  System.import('stuff').then(function(m) {
    // modules yay
  });
  ``
  </ng2-markdown>
  ```

*Note: The component has only been tested using Traceur/ES6 with annotations enabled.*

## Dependencies

- [css][css] - load CSS with the `import` syntax
- [showdown][showdown] - parse Markdown to HTML
- [prism][prism] - syntax-specific highlighting

[demo]: https://github.com/evanplaice/ng2-markdown-demo
[css]: https://github.com/systemjs/plugin-css
[showdown]: https://github.com/showdownjs/showdown
[prism]: https://github.com/PrismJS/prism