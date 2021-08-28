import { Directive, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SuggestionBoxComponent } from '../../components/suggestion-box/suggestion-box.component';

@Directive({
  selector: '[appMention]'
})
export class MyMentionDirective {

  componentRef : any;
  triggerCharacter = '#'
  nativeElement : HTMLTextAreaElement;
  taggableUsers : string[];

  usernames: string[] = [ //this will be recieved from backend
    'Ajay',
    'Anurag',
    'Abhinav',
    'Vijay',
    'Virat',
    'Sanjay',
    'Sunil',
    'Mrithunjay',
    'Mandeok',
    'Sam',
    'Sass',
    'Scss',
    'Jack',
    'Jquery',
    'Lucifer',
    'Luck'
  ];

  constructor(
    private inputElementRef : ElementRef, 
    public _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver
  ) {
    this.nativeElement = inputElementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  currentString(event: any){
    
    let wordBeingTyped = this.getCurrentWord().value.toLowerCase();

    console.log(wordBeingTyped)

    if( wordBeingTyped.startsWith(this.triggerCharacter) ){

      this.getTaggableUsers(wordBeingTyped);

      if( this.taggableUsers.length ){
        console.log(this.taggableUsers)
        this.loadComponent();
        this.componentRef.instance.taggableUsers = this.taggableUsers;
      }
    }
    else{
      if(this.componentRef){
        this.componentRef.destroy()
      }
    }
  }

  getCurrentWord(): TypedWord{

    let cursorLocation = this.nativeElement.selectionStart;
    let text = this.nativeElement.value;

    let word: string = "";

    let i: number;
    for (i = cursorLocation - 1; i >= 0 && text[i] !== ' '; i--) {
      word += text[i];
    }

    word = word.split("").reverse().join("");

    let startIndex = i + 1;
    let endIndex = cursorLocation - 1;

    return{
      value : word,
      startIndex,
      endIndex
    }
  }

  getTaggableUsers(query : string){
    this.taggableUsers = this.usernames.filter(username => {
      return(this.triggerCharacter + username.toLowerCase()).startsWith(query)
    })
  }

  @HostListener('keydown', ['$event'])
  currentKey(event: any){
  }

  loadComponent(){
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);
  }

}

interface TypedWord{
  value: string;
  startIndex: number;
  endIndex: number;
}
