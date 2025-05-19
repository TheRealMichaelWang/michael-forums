import { UserDao } from "../dao/user/userDao";
import { injectable, inject } from "inversify";
import { AuthorizationService } from "./authorizationService";
import { ClerkSessionClaims } from "../util/auth/authRequest";
import { logger } from "../util/logger";

@injectable()
export class UserService {
    constructor(@inject(UserDao) private userDao: UserDao,
                @inject(AuthorizationService) private authorizationService: AuthorizationService) { }

    public async getUserById(id: string, userId?: string) {
        if (!await this.authorizationService.canViewProfile(userId)) {
            throw new Error("User is not authorized to view other user's profile.");
        }
        let user = await this.userDao.getUserById(id);
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
        let result = await this.userDao.ensureUserExists(sessionClaims);
        if (result) {
            logger.info(`User ${sessionClaims.username} (${sessionClaims.authUserId}) created.`);
        }
        return result;
    }
}