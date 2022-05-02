import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Servoyworldcomponent } from './servoyworldcomponent';

describe('Servoyworldcomponent', () => {
  let component: Servoyworldcomponent;
  let fixture: ComponentFixture<Servoyworldcomponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Servoyworldcomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Servoyworldcomponent);
    component = fixture.componentInstance;
    component.servoyApi =  jasmine.createSpyObj('ServoyApi', ['getMarkupId','trustAsHtml','registerComponent','unRegisterComponent']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
