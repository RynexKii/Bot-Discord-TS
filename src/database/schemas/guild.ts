import { Schema } from "mongoose";

export const guildSchema = new Schema(
    {
        guildId: { type: String, required: true },
        guildName: { type: String, required: true },
        channelsIgnored: {
            allChannels: { type: [String] },
            textChannels: { type: [String] },
            voiceChannels: { type: [String] },
        },
        ModerationBloodsBoost: {
            boostMultiplication: { type: String },
            boostDuration: { type: Number },
        },
    },
    {
        versionKey: false,
        statics: {
            // Seta uma guild
            async setGuild(guildId: string, guildName: string) {
                const query = { guildId: guildId, guildName: guildName };

                return (await this.findOne(query)) ?? this.create(query);
            },
            // Obtêm o guildId registrado conforme o guildName passado
            async getGuildId() {
                const guild = await this.findOne();

                if (!guild) return;

                return guild.guildId;
            },
            // Obtêm o guildName registrado conforme o guildId passado
            async getGuildName(guildId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return "Sem Servidor";

                return guild.guildName;
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
            // Obtêm todos os canais registrado
            async getAllChannels(guildId: string) {
                const guild = await this.findOne({ guildId: guildId });

                if (!guild || !guild.channelsIgnored || !guild.channelsIgnored.allChannels.length) return;

                return guild.channelsIgnored.allChannels;
            },
            // Adiciona no Array(allChannels) um novo canal
            async pushAllChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                guild.channelsIgnored?.allChannels.push(channelId);
                guild.save();
                return;
            },
            // Remove do Array(allChannels) um canal
            async pullAllChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                await guild.updateOne({ $pull: { "channelsIgnored.allChannels": channelId } });
                return;
            },
            // Obtêm todos os canais de texto registrado e devolve no formato de menção do Discord
            async getTextChannels(guildId: string): Promise<string | undefined> {
                const guild = await this.findOne({ guildId: guildId });

                if (!guild || !guild.channelsIgnored || !guild.channelsIgnored.textChannels.length) return;

                let textChannels = "";

                guild.channelsIgnored.textChannels.forEach((channels) => {
                    textChannels += `<#${channels}> `;
                });

                return textChannels;
            },
            // Adiciona no Array(textChannels) um novo canal
            async pushTextChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                guild.channelsIgnored?.textChannels.push(channelId);
                guild.save();
                return;
            },
            // Remove do Array(textChannels) um canal
            async pullTextChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                await guild.updateOne({ $pull: { "channelsIgnored.textChannels": channelId } });
                return;
            },
            // Obtêm todos os canais de voice registrado e devolve no formato de menção do Discord
            async getVoiceChannels(guildId: string) {
                const guild = await this.findOne({ guildId: guildId });

                if (!guild || !guild.channelsIgnored || !guild.channelsIgnored.voiceChannels.length) return;

                let voiceChannels = "";

                guild.channelsIgnored.voiceChannels.forEach((channels) => {
                    voiceChannels += `<#${channels}> `;
                });

                return voiceChannels;
            },
            // Adiciona no Array(voiceChannels) um novo canal
            async pushVoiceChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                guild.channelsIgnored?.voiceChannels.push(channelId);
                guild.save();
                return;
            },
            // Remove do Array(voiceChannels) um canal
            async pullVoiceChannels(guildId: string, channelId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                await guild.updateOne({ $pull: { "channelsIgnored.voiceChannels": channelId } });
                return;
            },
            // Obtêm o ModerationBloodsBoost
            async getBloodsBoost(guildId: string) {
                const query = { guildId: guildId };
                const guild: any = await this.findOne(query);

                if (!guild) return;

                return guild.ModerationBloodsBoost;
            },
            // Seta um novo ModerationBloodsBoost
            async setBloodsBoost(guildId: string, boostMultiplication: string, boostDuration: number) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                await guild.updateOne({ ModerationBloodsBoost: { boostMultiplication: boostMultiplication, boostDuration: boostDuration } });
                return;
            },
            // Deleta o ModerationBloodsBoost
            async deleteBloodsBoost(guildId: string) {
                const query = { guildId: guildId };
                const guild = await this.findOne(query);

                if (!guild) return;

                await guild.updateOne({ $unset: { ModerationBloodsBoost: "" } });
            },
        },
    }
);
