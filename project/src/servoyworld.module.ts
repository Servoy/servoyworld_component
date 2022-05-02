import { Servoyworldcomponent } from './servoyworldcomponent/servoyworldcomponent';
import { NgModule } from '@angular/core';
import { ServoyPublicModule } from '@servoy/public';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@NgModule({
    declarations: [
		Servoyworldcomponent,
    ],
    providers: [],
    imports: [
      ServoyPublicModule,
      CommonModule,
      FormsModule
    ],
    exports: [
		Servoyworldcomponent, 
      ]
})
export class servoyworldModule {}