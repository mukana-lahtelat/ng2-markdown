import { NgModule, Component, Inject, ElementRef } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Converter } from 'showdown';
import 'prismjs';

@Component({
  selector: 'ng2-markdown',
  inputs: [ 'src', 'data', 'highlight' ],
  template: ''
})
export class MarkdownComponent {
  constructor (@Inject(ElementRef) elementRef, @Inject(Http) http) {
    // used for http requests
    this.http = http;
    // reference to the DOM element
    this.element = elementRef.nativeElement;
  }

  ngOnInit () {
    // element with 'src' attribute set
    if (this.src) {
      this.fromFile(this.src);
    }
    // element with 'data' attribute set
    if (this.data) {
      this.fromData(this.data);
    }
  }

  ngAfterViewChecked() {
    if (this.highlight) {
      Prism.highlightAll();
    }
  }

  fromFile(src) {
    this.http.get(src).toPromise()
    .then((res) => {
       return this.prepare(res._body);
    })
    .then((markdown) => {
      return this.process(markdown);
    })
    .then((html) => {
      this.element.innerHTML = html;
    })
  }

  fromData(data) {
    this.prepare(data).toPromise()
      .then((markdown) => {
        return this.process(markdown)
      })
      .then((html) => {
        this.element.innerHTML = html;
      });
  }

  prepare(raw) {
    return raw.split('\n').map((line) => line.trim()).join('\n')
  }

  process(markdown) {
    let converter = new Converter();
    return converter.makeHtml(markdown)
  }
}
