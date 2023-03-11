import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPeopleComponent } from './register-people.component';

describe('SignPeopleComponent', () => {
  let component: SignPeopleComponent;
  let fixture: ComponentFixture<SignPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
