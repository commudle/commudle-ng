import { IUserBadge } from "./user_badge.model";

export interface IUserBadges{
    user_badges: IUserBadge[],
    page: number;
    count: number;
    total: number;
}