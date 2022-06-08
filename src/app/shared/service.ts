import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthChangeEvent, createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';
// import { retry } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  static _user: IUser | null = null;
  private supabaseClient: SupabaseClient;

//   get loggedIn(): boolean {
//     return !!AuthService._user;
//   }

//   private _lastAuthenticatedPath: string = defaultPath;
//   set lastAuthenticatedPath(value: string) {
//     this._lastAuthenticatedPath = value;
//   }

  constructor(private router: Router) {
    this.supabaseClient = createClient(environment.supabase_url, environment.supabase_key);

   }
  
   async addEtudiant(nom:string,prenom:string){
    const { data, error } = await this.supabaseClient
    .from('etudiant')
    .insert([
      { nom: nom,
        prenom:prenom },
    ])
   }

  async logIn(email: string, password: string) {

    try {
      // Send request
      console.log(email, password);
      // this._user = { ...defaultUser, email };
      
      var result = this.supabaseClient.auth.signIn({
        email,
        password
      });

      if ((await result).error != null) {
        return{
          isOk:false,
          message: (await result).error?.message,
        };
      }
      else {
        AuthService._user = {
          email:(await result).user?.email!,
          avatarUrl:"",
        }
        
        return {
          isOk:true,
          message:"Logged in successfully"
        };
      }

    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request
      const user =await this.supabaseClient.auth.user();
      console.log(user);
      var _iuser:IUser = {
        email:user?.email!,
        avatarUrl:'',
      };
      AuthService._user = _iuser;
      return {
        isOk: true,
        data: AuthService._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);
      var result = this.supabaseClient.auth.signUp({
        email: email,
        password: password
      })
      console.log( await result);

      if ((await result).error != null) {
        return {
          isOk:false,
          message: (await result).error?.message,
        }
      }else{
        return{
          isOk:true,
          message:"Account created successfully"
        }
      }
      
      // this.supabaseClient.
      // this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      var result = this.supabaseClient.auth.api.resetPasswordForEmail(email);

      var _r = await result;
      
      if (_r.error != null) {
        return{
          isOk:false,
          message:_r.error.message,
        }
        
      } else {
        return {
          isOk: true
        };
      }

      
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    AuthService._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    // if (isLoggedIn && isAuthForm) {
    //   this.authService.lastAuthenticatedPath = defaultPath;
    //   this.router.navigate([defaultPath]);
    //   return false;
    // }

    // if (!isLoggedIn && !isAuthForm) {
    //   this.router.navigate(['/login-form']);
    // }

    // if (isLoggedIn) {
    //   this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    // }

    return  isAuthForm;
  }
}