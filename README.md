# &lt;ng2-markdown&gt;

A Markdown component for Angular2

This repo is intended to be loaded as a JSPM package and therefore provides the bare minimum.

To see a working example checkout the [ng2-markdown-demo][demo] project.

*Now compatible with Angular 4+*

## Usage

*To use this component:*

1. Install the component via JSPM
  ```bash
  jspm install ng2-markdown
  ```

2. Loading the ng2-markdown component

  Import as a module declaration
  
  ```javascript
  import { MarkdownComponent } from 'ng2-markdown';
  // ...
  declarations: [ MarkdownComponent ]
  ```

*Or*

  Import the MarkdownModule

  ```javascript
  import { MarkdownModule } from 'ng2-markdown';
  // ...
  imports: [ MarkdownModule ]
  ```

3. Usint the ng2-markdown component

Load Markdown content from a file

  ```javascript
  <ng2-markdown [src]='/path/to/file'></ng2-markdown>
  ```

*Or*

Load Markdown data from directly from a component

  ```javascript
  <ng2-markdown [data]='data'></ng2-markdown>
  ```
That's it... Yes, really. 

*Note: The component has only been tested using Traceur/ES6 with annotations enabled.*

## Dependencies

- [css][css] - load CSS with the `import` syntax
- [showdown][showdown] - parse Markdown to HTML
- [prism][prism] - syntax-specific highlighting

## Roadmap

- Provide ES5 production bundles for use with Typescript
- Eliminate reliance on elementRef for universal compatibility
- Remove the 'Raw' feature
- Change build process to use Webpack

[demo]: https://github.com/evanplaice/ng2-markdown-demo
[css]: https://github.com/systemjs/plugin-css
[showdown]: https://github.com/showdownjs/showdown
[prism]: https://github.com/PrismJS/prism