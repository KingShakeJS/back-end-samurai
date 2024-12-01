import {Request} from 'express'


export type ReqWithParams<T> = Request<T, {}, {}, {}>
export type ReqWithBody<T> = Request<{}, {}, T, {}>
export type ReqWithQuery<T> = Request<{}, {}, {}, T>
export type ReqWithParamsAndBody<T, B> = Request<T, {}, B, {}>

