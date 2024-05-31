import { database } from "#database";
import { contentDefaultAboutMe } from "#messages";
import { Schema } from "mongoose";

export const profileSchema = new Schema(
    {
        userId: { type: String, required: true },
        bloods: { type: Number, default: 0 },
        bloodsRank: { type: Schema.Types.Mixed, default: "Sem Rank" },
        aboutMe: {
            type: String,
            default: function ({ userId }: { userId: string }) {
                return contentDefaultAboutMe(userId);
            },
        },
        fame: { type: Number, default: 0 },
        fameTimestamp: { type: Number },
        dailyTimestamp: { type: Number },
        activeMemberTimestamp: { type: Number },
        coinflip: [
            {
                messageId: { type: String, required: true },
                userSendId: { type: String, required: true },
                userReceivedId: { type: String, required: true },
                side: { type: String, required: true },
                value: { type: Number, required: true },
            },
        ],
    },
    {
        versionKey: false,
        statics: {
            // Obtêm o perfil do usuário
            async getProfile(userId: string) {
                const query = { userId: userId };
                return (await this.findOne(query)) ?? this.create(query);
            },
            // Deleta o perfil do usuário e cria um backup do último perfil salvado na coleção(Collection) profileDeleted
            async deleteProfile(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                if (await database.profileDeleted.findOne(query)) {
                    await database.profileDeleted.deleteOne(query);
                }

                await database.profileDeleted.insertMany(profile);
                await profile.deleteOne(query);
            },
            // Obtêm os Bloods do usuário
            async getBloods(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) {
                    await this.create(query);
                    return 0;
                }

                return profile.bloods;
            },
            // Adiciona Bloods a um usuário
            async addBloods(userId: string, bloods: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) {
                    this.create({ userId: userId, bloods: bloods });
                    return bloods;
                }

                await profile.updateOne({ bloods: profile.bloods + bloods });

                return profile.bloods + bloods;
            },
            // Subtrai Bloods a um usuário (Podendo ficar negativo)
            async subBloods(userId: string, bloods: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) return;

                await profile.updateOne({ bloods: profile.bloods - bloods });

                return profile.bloods - bloods;
            },
            // Obtêm o Rank do usuário
            async getRank(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) {
                    this.create(query);
                    return "Sem Rank";
                }

                return profile.bloodsRank;
            },
            // Seta o Rank do usuário
            async setRank(userId: string, userRank: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) return;

                await profile.updateOne({ bloodsRank: userRank });

                return;
            },
            // Obtêm o aboutMe do usuário
            async getAbout(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) {
                    await this.create(query);
                    return contentDefaultAboutMe(userId);
                }

                return profile.aboutMe;
            },
            // Seta um novo About a um usuário (Cria um novo perfil)
            async setAbout(userId: string, aboutMe: string) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) {
                    this.create({ userId: userId, aboutMe: aboutMe });
                    return aboutMe;
                }

                await profile.updateOne({ aboutMe: aboutMe });

                return aboutMe;
            },
            // Obtêm a Fama do usuário
            async getFame(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) {
                    await this.create(query);
                    return 0;
                }

                return profile.fame;
            },
            // Adiciona Fama a um usuário
            async addFame(userId: string, fame: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) {
                    this.create({ userId: userId, fame: fame });
                    return fame;
                }

                await profile.updateOne({ fame: profile.fame + fame });

                return profile.fame + fame;
            },
            // Obtêm o fameTimestamp do usuário
            async getFameTimestamp(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                return profile.fameTimestamp;
            },
            // Seta uma nova Fama a um usuário (Cria um novo perfil)
            async setFameTimestamp(userId: string, timestamp: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) {
                    this.create({ userId: userId, fameTimestamp: timestamp });
                    return timestamp;
                }

                await profile.updateOne({ fameTimestamp: timestamp });

                return timestamp;
            },
            // Obtêm o dailyTimestamp do usuário
            async getDailyTimestamp(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                return profile.dailyTimestamp;
            },
            // Seta o dailyTimestamp do usuário
            async setDailyTimestamp(userId: string, timestamp: number) {
                const profile = await this.findOne({ userId: userId });

                if (!profile) {
                    this.create({ userId: userId, dailyTimestamp: timestamp });
                    return timestamp;
                }

                await profile.updateOne({ dailyTimestamp: timestamp });

                return timestamp;
            },
            // Obtêm o activeMemberTimestamp do usuário
            async getActiveMemberTimestamp(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                return profile.activeMemberTimestamp;
            },
            // Seta o activeMemberTimestamp do usuário
            async setActiveMemberTimestamp(userId: string, timestamp: number) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                await profile.updateOne({ activeMemberTimestamp: timestamp });

                return timestamp;
            },
            // Deleta o activeMemberTimestamp do usuário
            async deleteActiveMemberTimestamp(userId: string) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                await profile.updateOne({ $unset: { activeMemberTimestamp: profile.activeMemberTimestamp } });

                return;
            },
            // Obtêm o coinflip do id da mensagem passado
            async getCoinflip(messageId: string) {
                const query = { "coinflip.messageId": messageId };
                const profile: any = await this.findOne(query);

                if (!profile) return;

                return profile.coinflip.find((element: any) => element.messageId == messageId);
            },
            // Adiciona no Array(coinflip) um novo objeto contendo oque precisa
            async pushCoinflip(userId: string, messageId: string, userSendId: string, userReceivedId: string, side: string, value: number) {
                const query = { userId: userId };
                const profile = await this.findOne(query);

                if (!profile) return;

                profile.coinflip?.push({ messageId: messageId, userSendId: userSendId, userReceivedId: userReceivedId, side: side, value: value });
                profile.save();
            },
            // Remove do Array(coinflip) o objeto especifico do messageId
            async pullCoinflip(messageId: string) {
                const query = { "coinflip.messageId": messageId };
                const profile = await this.findOne(query);

                if (!profile) return;

                await profile.updateOne({ $pull: { coinflip: { messageId: messageId } } });
                profile.save();
            },
        },
    }
);
