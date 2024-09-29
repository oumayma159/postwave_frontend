import {CanActivateFn, Router} from '@angular/router';
import {StorageService} from "../services/storage.service";
import {inject} from "@angular/core";

export const testGuard: CanActivateFn = (route, state) => {
  if (inject(StorageService).getToken()) {
    return true;
  } else {
    inject(Router).navigate(['/login']).then();
    return false;
  }
};
