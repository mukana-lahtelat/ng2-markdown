import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    this.data = `
    # Example: Loading data

    *sample html*
    \`\`\`language-html
    <ng2-markdown [data]="data"></ng2-markdown>
    \`\`\`
    `
  }
}
