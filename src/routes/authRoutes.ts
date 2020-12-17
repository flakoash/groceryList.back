import { Request, Response, NextFunction, Router} from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const router = Router();

class User {
    constructor(private _username: string){
    }
    get username(){
        return this._username;
    }
    set username(value){
        this._username = value;
    }
    toPlainObj() {
        let jsonObj = {
            username: this._username
        }
        return jsonObj;
    }
}

declare global {
    namespace Express {
      interface Request {
        user: object
      }
    }
  }

router.post('/login', async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    // validate and get user object
    const user:User = new User(username)

    const token = jwt.sign(user.toPlainObj(), 'SECRET_KEY_FROM_ENV', {expiresIn: '5m'})

    const refreshToken = jwt.sign(user.toPlainObj(), 'REFRESH_SECRET_KEY_FROM_ENV', {expiresIn: '8h'})

    res.json({accessToken: token, refreshToken})

})

router.post('/refresh', (req: Request, res: Response) => {
    const refreshToken = req.body.token
    // validate that token is still valid
    jwt.verify(refreshToken, 'REFRESH_SECRET_KEY_FROM_ENV', undefined, (error:JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError | null, user)  =>{
        if(error) return res.status(403).json({message: error});
        // generate new token
        const userObj =  {username: (<User>user).username}
        const token = jwt.sign(userObj, 'SECRET_KEY_FROM_ENV', {expiresIn: '5m'})
        res.json({accessToken: token})
    })

})

export function validateToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    token = token && token.split(' ')[1];
    if(!token) return res.status(401).json({message: 'need access token'});
    jwt.verify(token, 'SECRET_KEY_FROM_ENV', (error, user) =>{
        if(error) return res.status(403).json({message: error});
        req.body.user = user;
        next();
    })

}

export { router as authRoutes };