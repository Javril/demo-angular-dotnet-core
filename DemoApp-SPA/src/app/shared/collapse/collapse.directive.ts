import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {

  @HostBinding('class.menuOpen') isMenuOpen = false;

  @HostListener('click') toggleOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
