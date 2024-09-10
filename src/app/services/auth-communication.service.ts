import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCommunicationService {
  public logOutEvent = new EventEmitter<void>();

  emitLogout() {
    this.logOutEvent.emit();
  }}
