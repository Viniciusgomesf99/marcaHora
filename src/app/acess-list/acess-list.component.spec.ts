import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessListComponent } from './acess-list.component';

describe('AcessListComponent', () => {
  let component: AcessListComponent;
  let fixture: ComponentFixture<AcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
