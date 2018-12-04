import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementListComponent } from './mouvement-list.component';

describe('MouvementListComponent', () => {
  let component: MouvementListComponent;
  let fixture: ComponentFixture<MouvementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
