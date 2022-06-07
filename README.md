# servoyworld sample component

This is a sample component how to convert/upgrade a NG1 AngularJS commponent to a Titanium NG Angular component.

The master branch is the pure NG1 component and the TiNG branch is the fully converted one.

It shows the various template conversions (ng-if -> *ngIf and ng-repeat to *ngFor), remove of the "model." everywhere because model spec properties are now just fields on a component directly.

It explains the usage of ServoyBaseComponent and also the ServoyApi object and how that is used. These objects/api are provided by the @servoy/public npm package where the documentation can be found here: https://developer.servoy.com/ngclient_api/index.html <br />
for example the ServoyBaseComponent: https://developer.servoy.com/ngclient_api/directives/ServoyBaseComponent.html <br />
or ServoyApi: https://developer.servoy.com/ngclient_api/classes/ServoyApi.html<br />

see for more info the readme of that TiNG branch: https://github.com/Servoy/servoyworld_component/blob/ting/README.md
