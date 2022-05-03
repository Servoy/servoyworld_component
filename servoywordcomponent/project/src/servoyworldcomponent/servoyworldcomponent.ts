import { Component, Input, SimpleChanges, Renderer2, ChangeDetectorRef, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
// servoy public is the interface between the component and the Titanium NGClient runtime.
import { ServoyBaseComponent, IValuelist } from '@servoy/public';

@Component({
    selector: 'servoyworld-servoyworldcomponent',
    templateUrl: './servoyworldcomponent.html'
})
export class Servoyworldcomponent extends ServoyBaseComponent<HTMLDivElement>{
// ServoyBaseComponent is extended from the public api to inherit basic Servoy behavior 
// this needs that a #element is set on the first main tag. that element can then be get through this.getNativeElement()

 
// all model properties are @Input properties for this component  (server -> client data pushes)
    @Input()  value: any;
    @Input()  text: string;
    @Input()  values: IValuelist;
    @Input()  fieldstyleclass: string;
    @Input()  buttonstyleclass: string;
    @Input()  hidevalues: boolean;
    
// also the handler is a @Input property which is then directly a function that can be called    
    @Input() click: (e: Event, data?: any) => void;
    
// for model properties like a dataprovider property that wants to send data back to the server (client -> server data pushes) 
// an @Output emitter needs to be created based on naming convention
   @Output() valueChange = new EventEmitter();
   
// this is a field that is a View element pointing to the '#button' dom element, so you have direct access to this in code   
   @ViewChild('button') button: ElementRef<HTMLButtonElement>;
   
    constructor(protected readonly renderer: Renderer2, protected cdRef: ChangeDetectorRef) {
         super(renderer, cdRef);
    }
    
    svyOnInit() {
        // this method is called once when a component is first initialized and the primary DOM element is created.
        // will not be called if there is no #element on a (main) tag, because it will not be able to full initialize then.
        super.svyOnInit();
        
        // now look if an click event handler is set (this is a design time property, can only be set once at init so no watch is needed)
        if (this.click) {
            // use the base components renderer to register for the 'click' event our click handler 
            this.getRenderer().listen(this.button.nativeElement, 'click', this.click);
        }
        
     }
    
    svyOnChanges( changes: SimpleChanges ) {
        // This method is called when an input property above gets a change
        super.svyOnChanges(changes);
        
        // if this is an incoming server side change for the button styleclass, 
        // use the renderer (provided by ServoyBaseComponent) to add this class to the native dom element through the button element ref
        // this buttonstyleclass is a runtime property so can change at anytime in servoy code (elements.servoyworldcomponent.buttonstyleclass = 'something')
        // so we need  to watch it through svyOnChanges which is always called if an input changes
        if (changes['buttonstyleclass']) {
            this.getRenderer().addClass(this.button.nativeElement, this.buttonstyleclass);
        }
    }
    
    valueChanged(data: any) { 
        this.value = data;
        this.valueChange.emit(this.value);
    }
}