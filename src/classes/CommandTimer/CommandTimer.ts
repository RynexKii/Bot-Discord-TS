import { database } from "#database";

export class CommandTimer {
    userId: string;
    commandId: string;

    constructor(userId: string, commandId: string) {
        this.userId = userId;
        this.commandId = commandId;
    }

    async setTimer(seconds: number): Promise<void> {
        const timestamp = +new Date();
        const userTimestampDB = await database.commandTimer.get<number>(`${this.userId}.${this.commandId}`);

        if (userTimestampDB && timestamp > userTimestampDB) {
            await database.commandTimer.delete(this.userId);

            await database.commandTimer.set(`${this.userId}.${this.commandId}`, seconds * 1000 + timestamp);
        } else if (!userTimestampDB) {
            await database.commandTimer.set(`${this.userId}.${this.commandId}`, seconds * 1000 + timestamp);
        }
    }

    async getTimer(): Promise<Date> {
        const userTimestampDB = await database.commandTimer.get<number>(`${this.userId}.${this.commandId}`);
        const dateNow = new Date();

        if (userTimestampDB) return new Date(userTimestampDB);

        return dateNow;
    }

    async verifyTimer(): Promise<boolean> {
        const timestamp = +new Date();
        const userTimestampDB = await database.commandTimer.get<number>(`${this.userId}.${this.commandId}`);

        if (userTimestampDB && timestamp < userTimestampDB) return true;
        else return false;
    }
}
