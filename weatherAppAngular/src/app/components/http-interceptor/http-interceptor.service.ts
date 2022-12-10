import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators";
import { HttpInterceptorEnum } from "./http-interceptor-message.enum";
import { DialogTypeEnum } from "../dialogs/dialog-type.enum";
import { MatDialog } from "@angular/material/dialog";
import { ContentDialogComponent } from "../dialogs/content-dialog/content-dialog.component";
import { HttpInterceptorServerError } from "./http-interceptor-server-error";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    ERROR = 'Error';

    constructor(private dialog: MatDialog, private router: Router){}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            catchError((httpError: HttpErrorResponse) => {
                const message = this.showErrorMessage(httpError.status, httpError.error);
                const error = new Error(message);
                const dialogRef = {
                    data: {
                        title: this.ERROR,
                        message: message
                    },
                };

                this.dialog.getDialogById(DialogTypeEnum.PROCESSING)?.close();
                this.dialog.open(ContentDialogComponent, dialogRef).afterClosed().subscribe(
                    value => this.router.navigateByUrl('/404')
                );

                return throwError(() => error);
            })
        );
    }

    showErrorMessage(status: number, error: HttpInterceptorServerError): string{
        let message: string;
        
        switch(status){
            case 401:
                message = this.getErrorMessage(error, HttpInterceptorEnum.UNAUTHORIZED);
            break;
            case 403:
                message = this.getErrorMessage(error, HttpInterceptorEnum.FORBIDEN);
            break;
            case 404:
                message = this.getErrorMessage(error, HttpInterceptorEnum.NOT_FOUND);
            break;
            case 422:
                message = this.getErrorMessage(error, HttpInterceptorEnum.INVALID_DATA);
            break;
            case 500:
            case 501:
            case 502:
            case 503:
                message = this.getErrorMessage(error, HttpInterceptorEnum.CONTACT_SUPPORT);
            break;
            default:
                message = this.getErrorMessage(error, HttpInterceptorEnum.CONTACT_SUPPORT);
        }

        return message;
    }

    getErrorMessage(error: HttpInterceptorServerError, httpInterceptorEnum: string): string{
        return error.message ? error.message : httpInterceptorEnum;
    }
}
