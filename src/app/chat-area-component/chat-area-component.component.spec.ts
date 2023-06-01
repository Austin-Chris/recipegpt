import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAreaComponentComponent } from './chat-area-component.component';

describe('ChatAreaComponentComponent', () => {
  let component: ChatAreaComponentComponent;
  let fixture: ComponentFixture<ChatAreaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAreaComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAreaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
