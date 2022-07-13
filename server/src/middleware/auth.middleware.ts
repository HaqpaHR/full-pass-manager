import jwt, {Jwt, JwtPayload} from 'jsonwebtoken';
import config from 'config';
import express, {Request, Response, NextFunction} from "express";

export interface IRequestWithAuth extends Request {
    user?: any
}

export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS') {
        return next()
    }
    
    try {
        if(!req.headers.authorization){return console.log("Is no header")}
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Auth error"})
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded
        next()
    }catch (e) {
        return res.status(401).json({message: "Auth error"})
    }
}