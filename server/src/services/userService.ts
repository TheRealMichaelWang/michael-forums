import { UserDao } from "../dao/user/userDao";
import { injectable, inject } from "inversify";
import { AuthorizationService } from "./authorizationService";
import { ClerkSessionClaims } from "../util/auth/authRequest";

@injectable()
export class UserService {
    constructor(@inject(UserDao) private userDao: UserDao,
                @inject(AuthorizationService) private authorizationService: AuthorizationService) { }

    public async getUserById(id: string, userId?: string) {
        if (!await this.authorizationService.canViewProfile(userId)) {
            throw new Error("User is not authorized to view other user's profile.");
        }
        var user = await this.userDao.getUserById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }

    public async getPosts(subjectId: string, currentPage: number, pageSize: number, userId?: string) {
        if (!await this.authorizationService.canViewProfile(userId)) {
            throw new Error("User is not authorized to view other user's posts.");
        }
        return await this.userDao.getUserPosts(subjectId, currentPage, pageSize);
    }

    public async ensureUserExists(sessionClaims: ClerkSessionClaims): Promise<boolean> {
        if (await this.userDao.getUserById(sessionClaims.authUserId) == null) { //user needs to be created
            await this.userDao.createUser(sessionClaims.username, sessionClaims.email, sessionClaims.authUserId);
            return true; //user was created
        }
        return false; //user already exists
    }
}