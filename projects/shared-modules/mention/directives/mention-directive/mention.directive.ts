import { Directive, ElementRef, HostListener, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SuggestionBoxComponent } from '../../components/suggestion-box/suggestion-box.component';
import { MentionService } from '../../service/mention.service';
@Directive({
  selector: '[appMention]'
})
export class MentionDirective {

  componentRef: any;
  triggerCharacter = null;
  nativeElement: HTMLTextAreaElement;
  taggableEntities: any[] = [];
  selectedEntity: any;
  private coords: {top : number, left : number} = {top : 7, left : 50};

  constructor(
    private inputElementRef: ElementRef,
    public _viewContainerRef: ViewContainerRef,
    private _componentResolver: ComponentFactoryResolver,
    private mentionService: MentionService
  ) {
    this.nativeElement = inputElementRef.nativeElement;
  }

  onItemHover(entity: any) {
    if (this.componentRef) {
      this.componentRef.instance.selectedEntity = entity;
      this.selectedEntity = entity;
    }
  }

  onItemClicked(entity: any) {
    this.autoComplete(entity); //entity.name is being used for autocompleting
    this.nativeElement.focus();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // @HostListener('blur', ['$event']) //if text area gets out of focus remove autocomplete box
  // onOutOfFocus(event : any){
  //   if(this.componentRef && !this.selectedEntity){
  //     this.componentRef.destroy();
  //   }
  // }

  @HostListener('keyup', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    
    if (event.key === "Control") {

      if (this.componentRef && this.selectedEntity) {
        this.autoComplete(this.selectedEntity);
        this.nativeElement.focus();
        this.componentRef.destroy()
        this.selectedEntity = null;// alert here
      }

    }

  }

  autoComplete(entity: any) {

    let currentWordTyped = this.getCurrentWord();

    if (entity.name.length >= currentWordTyped.value.slice(1).length) {

      let currentTextInputValue = this.nativeElement.value;
      
      let newTextInputValue = "";

      if(entity.type === "users"){
        newTextInputValue = currentTextInputValue.slice(0, currentWordTyped.startIndex)
        + this.triggerCharacter + entity.name + currentTextInputValue.slice(currentWordTyped.endIndex + 1);
      }
      else{
        switch(entity.type){
          
          case 'channels': {
            newTextInputValue = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/channels/app/${entity.id}">${entity.name}</a>`
            break;
          }

          case 'events': {
            newTextInputValue = `<a href="https://commudle.com/communities/${entity.kommunity_slug}/events/${entity.slug}">${entity.name}</a>`
            break;
          }

          default:{
            newTextInputValue = `<a href="https://commudle.com/${entity.type}/${entity.slug}">${entity.name}</a>`;
          }

        }
      }

      this.nativeElement.value = newTextInputValue;

      let newCursorPosition = currentWordTyped.startIndex + newTextInputValue.length + 2;

      this.nativeElement.selectionStart = newCursorPosition;
      this.nativeElement.selectionEnd = newCursorPosition;

    }

  }

  @HostListener('input', ['$event'])
  currentString() {

    let wordBeingTyped = this.getCurrentWord().value.toLowerCase();

    this.setTriggerCharacter(wordBeingTyped);

    if (wordBeingTyped.startsWith(this.triggerCharacter)) {

      const query = wordBeingTyped.slice(1);

      if (query.length) {
        
        switch (this.triggerCharacter) {

          case '@': {

            this.mentionService.getUsers(query).subscribe((data: any) => {

              for(const entity in data){
                for(const index in data[entity]){
                  data[entity][index]["type"] = entity;
                }
              }

              this.taggableEntities = data.users;

              if (this.taggableEntities) {
                //console.log(window.getComputedStyle(this.nativeElement))
               
                // let computed = window.getComputedStyle(this.nativeElement);

                // this.coords.top = this.nativeElement.offsetTop + parseInt(computed['borderTopWidth']);
                // this.coords.left = this.nativeElement.offsetTop + parseInt(computed['borderLeftWidth']);

                // console.log(this.coords.top)
                // console.log(this.coords.left)

                // this.coords.top = (Math.random() * 100) + 1;
                // this.coords.left = (Math.random() * 500) + 1;

                // console.log(this.nativeElement.getBoundingClientRect())

                // let viewportOffset = this.nativeElement.getBoundingClientRect();
                // // these are relative to the viewport, i.e. the window
                // this.coords.top = viewportOffset.height;
                // this.coords.left = viewportOffset.left;
              
                this.loadComponent();
                this.componentRef.instance.taggableEntities = this.taggableEntities;
              }
            })

            break;
          }

          case '!': {

            this.mentionService.getOthers(query).subscribe((data: any) => {

              console.log(data)

              const results: any[] = []

              for(const entity in data){
                for(const index in data[entity]){
                  data[entity][index]["type"] = entity;
                  results.push(data[entity][index])
                }
              }

              this.taggableEntities = results;

              if (this.taggableEntities) {
                this.loadComponent();
                this.componentRef.instance.taggableEntities = this.taggableEntities;
              }
            })

            break;
          }

          default: {
            return this.taggableEntities = []
          }

        }
      }

    }
    else {
      setTimeout(() => {
        if (this.componentRef) {
          this.componentRef.destroy()
        }
      }, 500)
    }

  }

  setTriggerCharacter(word: string) {

    switch (word.charAt(0)) {

      case '@': {
        this.triggerCharacter = '@';
        break;
      }

      case '!': {
        this.triggerCharacter = '!';
        break;
      }

      default: {
        this.triggerCharacter = null;
      }

    }

  }

  getCurrentWord(): TypedWord {

    let cursorLocation = this.nativeElement.selectionStart;
    let text = this.nativeElement.value;

    let word: string = "";

    let i: number;
    for (i = cursorLocation - 1; i >= 0 && text[i] !== ' '; i--) {
      word += text[i];
    }

    word = word.split("").reverse().join("");

    let startIndex = i + 1; //'@' position
    let endIndex = cursorLocation - 1; // last character position

    return {
      value: word,
      startIndex,
      endIndex
    }
  }

  @HostListener('keydown', ['$event'])
  currentKey(event: KeyboardEvent) {

    if (this.componentRef) {

      if (event.key === "ArrowUp") {

        let currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
        if (currentSelectedIndex === 0) {
          this.componentRef.instance.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
          this.selectedEntity = this.taggableEntities[this.taggableEntities.length - 1];
        }
        else {
          this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
          this.selectedEntity = this.taggableEntities[currentSelectedIndex - 1];
        }

        event.preventDefault();

      }
      else if (event.key === "ArrowDown") {

        let currentSelectedIndex = this.taggableEntities.indexOf(this.selectedEntity);
        if (currentSelectedIndex === this.taggableEntities.length - 1) {
          this.componentRef.instance.selectedEntity = this.taggableEntities[0];
          this.selectedEntity = this.taggableEntities[0];
        }
        else {
          this.componentRef.instance.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
          this.selectedEntity = this.taggableEntities[currentSelectedIndex + 1];
        }

        event.preventDefault();

      }

      setTimeout(() => this.scrollSelectedIntoView(), 1);

    }

  }

  scrollSelectedIntoView() {
    const listElement = this.componentRef.location.nativeElement.firstChild.firstChild.querySelector('.selected');
    if (listElement) {
      this.scrollIntoView(this.componentRef.location.nativeElement.firstChild.firstChild, listElement, 0, 0);
    }
  }

  scrollIntoView(container: HTMLUListElement, listItem: HTMLLIElement, extraBottom: number, extraTop: number) {
    let cTop = container.scrollTop;
    let cBottom = cTop + container.clientHeight;

    let eTop = listItem.offsetTop;
    let eBottom = eTop + listItem.clientHeight;

    if (eTop < cTop) {
      container.scrollTop -= (cTop - eTop) + extraBottom;
    }
    else if (eBottom > cBottom) {
      container.scrollTop += (eBottom - cBottom) + extraTop;
    }
  }

  loadComponent() {
    const componentFactory = this._componentResolver.resolveComponentFactory(SuggestionBoxComponent);
    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<SuggestionBoxComponent>(componentFactory);
    this.componentRef.location.nativeElement.style = `position:absolute; top:${this.coords.top}px; left:${this.coords.left}px`;

    this.componentRef.instance.selectedEntity = this.taggableEntities[0]; // 1st item will be automatically highlighted
    this.selectedEntity = this.taggableEntities[0];

    this.componentRef.instance.selectedItemEvent.subscribe((data: any) => {
      if (data.eventType === "click") {
        this.onItemClicked(data.entity);
      }
      else if (data.eventType === "hover") {
        this.onItemHover(data.entity);
      }
    });
  }

}

interface TypedWord {
  value: string;
  startIndex: number;
  endIndex: number;
}
