/**
 * Created by Ron on 25/12/2015.
 */
import { CustomConfig, ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { JwtHttp } from './jwt-http.service';
import { OauthService } from './oauth.service';
import { PopupService } from './popup.service';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { StorageService, BrowserStorageService } from './storage.service';
import { ModuleWithProviders, NgModule, Injector, Type } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

@NgModule({
    imports: [HttpModule],
})
export class Ng2UiAuthModule {
    static forRootWithCustomHttp(config: Type<CustomConfig>, httpProvider: any): ModuleWithProviders {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                {provide: CustomConfig, useClass: config },
                {provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                {provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService]},
                {provide: SharedService,  useClass: SharedService, deps: [StorageService, ConfigService]},
                httpProvider,
                {provide: OauthService,  useClass: OauthService, deps: [JwtHttp, Injector, SharedService, ConfigService]},
                {provide: PopupService,  useClass: PopupService, deps: [ConfigService]},
                {provide: Oauth1Service,  useClass: Oauth1Service, deps: [JwtHttp, PopupService, ConfigService]},
                {provide: Oauth2Service,  useClass: Oauth2Service, deps: [JwtHttp, PopupService, StorageService, ConfigService]},
                {provide: LocalService,  useClass: LocalService, deps: [JwtHttp, SharedService, ConfigService]},
                {provide: AuthService,  useClass: AuthService, deps: [SharedService, LocalService, OauthService]},
            ],
        };
    }

    static forRoot(config: Type<CustomConfig>): ModuleWithProviders {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                {provide: CustomConfig, useClass: config },
                {provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                {provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService]},
                {provide: SharedService,  useClass: SharedService, deps: [StorageService, ConfigService]},
                {provide: JwtHttp, useClass: JwtHttp, deps: [Http, SharedService, ConfigService]},
                {provide: OauthService,  useClass: OauthService, deps: [JwtHttp, Injector, SharedService, ConfigService]} ,
                {provide: PopupService,  useClass: PopupService, deps: [ConfigService]},
                {provide: Oauth1Service,  useClass: Oauth1Service, deps: [JwtHttp, PopupService, ConfigService]} ,
                {provide: Oauth2Service,  useClass: Oauth2Service, deps: [JwtHttp, PopupService, StorageService, ConfigService]} ,
                {provide: LocalService,  useClass: LocalService, deps: [JwtHttp, SharedService, ConfigService]} ,
                {provide: AuthService,  useClass: AuthService, deps: [SharedService, LocalService, OauthService]},
            ],
        };
    }
}

export {
    LocalService,
    Oauth2Service,
    Oauth1Service,
    PopupService,
    OauthService,
    JwtHttp,
    SharedService,
    StorageService, BrowserStorageService,
    AuthService,
    ConfigService, CustomConfig,
};