import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Component } from '@angular/core';

describe('App', () => {
   let component: App;
  let fixture: ComponentFixture<App>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
     fixture = TestBed.createComponent(App);
     component = fixture.componentInstance;
    expect(component).toBeTruthy();
  }); 

  it('should have the title', () => {
    const title = component.title();
    expect(title).toEqual('remoteApp');
  })

  it('should have router outlet', () => {
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  })
});
