import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReceitaComponent } from './card-receita.component';

describe('CardReceitaComponent', () => {
  let component: CardReceitaComponent;
  let fixture: ComponentFixture<CardReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
