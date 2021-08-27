import { Directive, ElementRef, HostListener,ViewContainerRef, ComponentFactoryResolver, TemplateRef } from '@angular/core';
import { SuggestionBoxComponent } from '../../components/suggestion-box/suggestion-box.component';

@Directive({
  selector: '[appMention]'
})
export class MyMentionDirective {

  inputElement : HTMLTextAreaElement;
  showSuggestionBox : boolean = false;
  componentRef : any;

  constructor(
    private inputElementRef : ElementRef, 
    public _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver
  ) { 
    this.inputElement = inputElementRef.nativeElement;
  }

  @HostListener('input', ['$event.target.value'])
  currentString(value:string){
    if( value.indexOf('#') !== -1 ){
      this.showSuggestionBox = true;
      this.loadComponent();
    }
    else{
      this.showSuggestionBox = false;
      if(this.componentRef){
        this.componentRef.destroy();
      }
    }
    console.log(this.showSuggestionBox)
  }

  loadComponent(){
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);
  }

}
