import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('blue')
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight('')
  // }
  @HostListener('focus') onFocus() {
    this.highlight('focus')
  }
  private highlight(color: string) {
    // console.log(color)
    // this.renderer.addClass(this.el.nativeElement, 'focus')
    // this.el.nativeElement.class = color
  }
}
