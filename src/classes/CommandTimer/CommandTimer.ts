import { database } from "#database";

export class CommandTimer {
    userId: string;
    commandId: string;

    constructor(userId: string, commandId: string) {
        this.userId = userId;
        this.commandId = commandId;
    }

    async setTimer(seconds: number) {
        const timestamp = +new Date();
        const userTimestampDB = await database.commandTimer.get<number>(`${this.userId}.${this.commandId}`);

        if (!userTimestampDB) return await database.commandTimer.set(`${this.userId}.${this.commandId}`, seconds * 1000 + timestamp);

        if (timestamp > userTimestampDB) return await database.commandTimer.set(`${this.userId}.${this.commandId}`, seconds * 1000 + timestamp);

        return;
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

        if (!userTimestampDB) return false;

        if (timestamp < userTimestampDB) return true;

        return false;
    }
}
