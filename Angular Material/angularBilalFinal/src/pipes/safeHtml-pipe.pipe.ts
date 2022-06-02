import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
constructor(public sainitized: DomSanitizer){ }
transform(value: any, ...args: any[]) {
  return this.sainitized.bypassSecurityTrustHtml(value);
}
}
