/// <reference types="aws-sdk" />

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import * as AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserAuthState } from './user-auth-state.enum';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private userPool: CognitoUserPool;
  private userAuthState: number;
  private cognitoUser: CognitoUser;

  constructor(private localStorage: LocalStorageService, private router: Router) {
    this.userAuthState = 0;
    const userPoolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoClientId
    };

    this.userPool = new CognitoUserPool(userPoolData);
    const user = this.userPool.getCurrentUser();
    if (user != null) {
      this.cognitoUser = user;
      user.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
        const loginsKey = 'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.cognitoUserPoolId;
        const credentials = {
          IdentityPoolId : environment.cognitoIdentityPoolId,
          Logins : {}
        };
        credentials.Logins[loginsKey] = localStorage.get(environment.jwtPrefix + '.' + user.getUsername() + '.accessId');
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);
        this.userAuthState = this.userAuthState | UserAuthState.authenticated.valueOf();
      });
    }
  }

  isUnauthenticated() {
    return this.userAuthState === 0;
  }

  hasAuthState(authState: string) {
    return (this.userAuthState & UserAuthState[authState].valueOf()) !== 0;
  }

  signup(name: string, email: string, username: string, password: string) {
    const attributeList = [];

    const dataName = {
      Name: 'name',
      Value: name
    };

    const dataEmail = {
      Name: 'email',
      Value: email
    };

    const nameAttribute = new CognitoUserAttribute(dataName);
    const emailAttribute = new CognitoUserAttribute(dataEmail);
    attributeList.push(nameAttribute);
    attributeList.push(emailAttribute);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const userData = {
            Username: username,
            Pool: this.userPool
          };
          this.cognitoUser = new CognitoUser(userData);
          this.userAuthState = this.userAuthState | UserAuthState.registered.valueOf();
        }
      });
    });
  }

  confirmSignup(confCode: string) {
    console.log('Confirming signup');
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmRegistration(confCode, true, function(err, result) {
        if (err) {
          reject(err);
        } else {
          this.userAuthState = this.userAuthState | UserAuthState.confirmed.valueOf();
          this.router.navigate(['dashboard']);
          resolve(result);
        }
      });
    });
  }

  login(username: string, password: string) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: this.userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const loginsKey = 'cognito-idp.' + environment.region + '.amazonaws.com/' + environment.cognitoUserPoolId;
          const credentials = {
            IdentityPoolId: environment.cognitoIdentityPoolId,
            Logins: {}
          };
          credentials.Logins[loginsKey] = result.getAccessToken().getJwtToken();
          AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);
          this.userAuthState = this.userAuthState | UserAuthState.authenticated;
          this.router.navigate(['dashboard']);
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  logout() {
    console.log('Logging out');
    this.cognitoUser.globalSignOut({
      onSuccess: (success) => {
        console.log('Logged out successfully');
        this.localStorage.clear();
        this.userAuthState = 0;
        this.router.navigate(['home']);
      },
      onFailure: (failure) => {
        console.error(failure);
      }
    });
  }
}
