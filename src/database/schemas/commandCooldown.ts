import { Schema } from "mongoose";

export const commandCooldownSchema = new Schema(
    {
        userId: { type: String, required: true },
        commandId: { type: String, required: true },
        commandTimestamp: { type: Number },
    },
    {
        versionKey: false,
        statics: {
            // Obtêm o timestamp do usuário conforme o commandId passado
            async getTimestamp(userId: string, commandId: string) {
                const query = { userId: userId, commandId: commandId };
                const cooldown = await this.findOne(query);

                if (!cooldown) return;

                return cooldown.commandTimestamp;
            },
            // Seta um novo timestamp a um usuário conforme o commandId passado
            async setTimestamp(userId: string, commandId: string, timestamp: number) {
                const query = { userId: userId, commandId: commandId };
                const cooldown = await this.findOne(query);

                if (!cooldown) {
                    this.create({ userId: userId, commandId: commandId, commandTimestamp: timestamp });
                    return timestamp;
                }

                await cooldown.updateOne({ commandTimestamp: timestamp });

                return timestamp;
            },
        },
    }
);
