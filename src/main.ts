import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ngsw-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }
    ).catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
