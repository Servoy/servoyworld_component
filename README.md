# generic information about component migration/development

This is purely a sample component how to convert from an NGClient1 (AngularJS) component to an Titanium NGClient (Angular)

With Servoy 2022.3.1 there is an option to migrate such a component package in the context menu

This migration adds the needed angular files an npm package.json file and adjusts the meta-inf/manifest.mf file so that it becomes a TiNG Web Package.

After the conversion you should first do

"npm install" 


in the root of the component package (which holds the package.json file), don't do "npm install" in the project dir, only in the root. The project dir is for packaging the component, it should never had a node_modules inside it because that can screw up the installation when you are developing the component.

this will install the needed depedencies including developer depedencies for validation,codecompletion and eslinting

Running 

"npm run make_release"

will build the package as a zip file that can be shipped and installed in the a Servoy Solution. ([workspace]\[solution]\ng_web_packages dir)


After npm install you can open this project or the generated component.ts file (in project/src) in a editor that understand language services like Visual Studio Code
Then you will have code completion and validation.

To develop a component and see the result directly in Servoy you need to have this imported like a Servoy WebPackage project
and that project is referenced by the solution that wants to use this component (through the context menu of the Web Packages node in the Solution Explorer)


No need to build the actual component (like doing npm run build in the component dir, only when making a version you need to run "npm run make_release")
But you need to go to the Servoy workspace build directory, which directory this is can be seen in the Titanium NG Build console (ConsoleView in developer)
there it ends with a line:

"Total time to check/install Titanium NG target folder: yourworkspacefolder\.metadata\.plugins\com.servoy.eclipse.ngclient.ui\target\the_solution_name"

in that folder you need to run:

npm run build_debug

When the developer is started and ready.

This will run the angular/typescript compiler in watch mode and will constantly generate the correct runtime code that the browser will use when changing the component.


# Steps for the servoywold_component


Start with the NG1 html template (project/src/api/servoyworldcomponent/servwordcomponent.html is first a plain copy)
The project/src/api/servoyworldcomponent/servwordcomponent.ts file is the angular component/class file that points to that above template file

Convert properties like "id={{model.svyMarkupId}}" to angular properties: [id]="servoyApi.getMarkupId()"
convert handlers like svy-onclick="click"  to angular event bindings (click)="click"  
conver structure directives (ng-if, ng-repeat) to angular structure directive *ngIf and *ngFor

the expressions with "model.xxx" or "handlers.xxx" are mostly the same except that the "model." or "handler." is removed, see below the ts file where they then map on.

Do include a on the main tag the "#element" which is used by our ServoyBaseComponent

The ts file has a class which extends our ServoyBaseComponent

ServoyBaseComponent understand servoy and provides the basic functionality like "this.servoyApi", all servoy components should extend this one as the base.
This component has a specifc constructor that needs the 2 angular injectable objects (Renderer2, ChangeDetectorRef), thats why components extending this must at last have those and call super with them.

It has a default annotation of changeDetection: ChangeDetectionStrategy.OnPush, this means the component only checks its template for changes when one of its inputs properties is changed
Not for example on every keystroke a user does, or every mouse move. This is a big performance enhancement but has a small drawback (in some scenario's you need to tell anguler do now check it)

@Input properties are the model properties (buttonstyleclass) or the handlers (click), these are public properties of the component and are set by angular when the server side changes.
So they have the values that come from the server (server->client)

@Output properties are the other way around those are Emitters (they emit a changed client value to let the server know the value is changed, so client -> server)
These have a naming convention. They always map on an @Input property (that is mentioned in the servoy spec file) and they have then "propertyname" + "Change" and they need to be an new EventEmitter();
Like this component has a "value" property (dataprovider property) which can also be pushed to the server, so we have a @Input value property and a @Output valueChange = new EventEmitter() property.

In order to actually emit the change we need to do something like below once the this.value changes.
valueChange().emit(this.value)

@ViewChilds are fields that reference directly the dom elements that has the field value (#element, #button, #input), this way you can access any kind of ui element through code.

ServoyBaseComponent also provides 2 lifecycle hooks:

svyOnInit and svyOnChanges

svyOnInit is called once when constructed and the #element is resolved by the ServoyBaseComponent
svyOnChanges is called everytime a property is changed by also after the #element is resolved.

svyOnInit is used to check if the "click" handler is set and attaches a handler through the Renderer and the ViewChild of the button to the "click" event.

svyOnChanges is used to set the a property that can change at runtime like the buttonstyleclass and it also adds that through the render on the ViewChild
This is different then using [ngClass] in the template where angular does watch it for us. In a template it is faster/shorter to write down but introduces an extra directive instance and you have less control in what you want or can do


The spec api are in TiNG components just public functions on the class, requestFocus is an implementation of a the spec api it is using a a ViewChild to get the dom element where it can then call directly focus() on
Compared to NG1 there is no JQuery involved here, pure angular and DOM api.




