import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteReplyComponent } from './invite-reply.component';

describe('InviteReplyComponent', () => {
  let component: InviteReplyComponent;
  let fixture: ComponentFixture<InviteReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
