import { NgModule, Component, Inject, ElementRef } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { Converter } from 'showdown';
import 'prismjs';
import 'showdown-youtube';
import 'showdown';


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
    showdown.extension('targetlink', function() {
      return [{
        type: 'lang',
        regex: /\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\4[ \t]*)?\)\{\:target=(["'])(.*)\6}/g,
        replace: function(wholematch, linkText, url, a, b, title, c, target) {
    
          var result = '<a href="' + url + '"';
    
          if (typeof title != 'undefined' && title !== '' && title !== null) {
            title = title.replace(/"/g, '&quot;');
            title = showdown.helper.escapeCharacters(title, '*_', false);
            result += ' title="' + title + '"';
          }
    
          if (typeof target != 'undefined' && target !== '' && target !== null) {
            result += ' target="' + target + '"';
          }
    
          result += '>' + linkText + '</a>';
          return result;
        }
      }];
    });
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
      // ensure the lifecycle event triggering doesn't eat this call
      setTimeout(() => { Prism.highlightAll(); }, 100);

      // this lifecycle event gets triggered ridiculously often
      //   ensure highlightAll() only fires once.
      this.highlight = false;
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
    let html = this.prepare(data);
    html = this.process(html);
    this.element.innerHTML = html;
  }

  prepare(raw) {
    return raw.split('\n').map((line) => line.trim()).join('\n')
  }

  process(markdown) {
    let converter = new Converter({
      extensions: ['targetlink', 'youtube']
    });
    return converter.makeHtml(markdown)
  }
}
