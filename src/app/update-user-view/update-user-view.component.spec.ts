import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserViewComponent } from './update-user-view.component';

describe('UpdateUserViewComponent', () => {
  let component: UpdateUserViewComponent;
  let fixture: ComponentFixture<UpdateUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
