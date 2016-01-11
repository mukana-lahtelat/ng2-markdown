import {
  Directive,
  Inject,
  ElementRef
} from 'angular2/core';
import {
  HTTP_PROVIDERS,
  Http
} from 'angular2/http';

// external
import showdown from 'showdown';
import prism from 'prism';
import 'prism/themes/prism-okaidia.css!';

@Directive({
  selector: 'ng2-markdown',
  inputs: [ 'src' ],
  providers: [ HTTP_PROVIDERS ]
})
export class MarkdownComponent {
  constructor (@Inject(ElementRef) elementRef, @Inject(Http) http) {
    // used for http requests
    this.http = http;
    // used for markdown->html conversion
    this.converter = new showdown.converter();
    // reference to the HTML element
    this.element = elementRef.nativeElement;
  }

  ngOnInit () {
    // element with 'src' attribute set
    if (this.src) {
      this.convertFile();
      this.style();
    }

    // element containing markdown
    if(!this.src) {
      this.convertRAW();
    }
  }

  convertFile() {
    this.http.get(this.src).toPromise()
    .then((res) => {
      this.element.innerHTML = res._body;
    })
    .then(() => {
      this.convertRAW();
    })
  }

  // converts markdown->HTML and saves
  //  saves the result in element.innerHTML
  convertRAW () {
    this.element.innerHTML = this.converter.makeHtml(
      this.element.innerHTML.split('\n').map((line) => line.trim()).join('\n')
    );
    this.style();
  }

  // styles markdown source code
  style () {
    prism.highlightAll(this.element.querySelectorAll('code'));
  }
}
