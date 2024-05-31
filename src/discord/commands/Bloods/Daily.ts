import { Command } from "#base";
import { database } from "#database";
import { contentChannelSendCommand, contentDailyCooldown, embedDailySend } from "#messages";
import { channelSendCommandsId } from "#tools";
import { randomNumber } from "@magicyan/discord";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "daily",
    description: "❰ Economia ❱ Pegue sua recompensa diária de Bloods",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const userId = interaction.user.id;
        const getDateUserDB = await database.profile.getDailyTimestamp(userId);

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Pega a data atual
        const dateNow = new Date();

        // Criar um novo objeto Date com a data atual
        const nextDayDate = new Date(dateNow);

        // Adicionar um dia
        nextDayDate.setDate(nextDayDate.getDate() + 1);


        // Definir as horas, minutos, segundos e milissegundos para 00:00
        nextDayDate.setHours(0, 0, 0, 0);

        async function collectDaily() {
            const randomBloods = randomNumber(50, 200);

            await database.profile.setDailyTimestamp(userId, nextDayDate.getTime());

            await database.profile.addBloods(userId, randomBloods);

            return await interaction.reply({ embeds: [embedDailySend(userId, randomBloods)] });
        }

        // Caso for a primeira vez que o usuário de o comando ele chama a função para receber a recompensa
        if (!getDateUserDB) return collectDaily();

        if (dateNow.getTime() < getDateUserDB) return await interaction.reply({ content: contentDailyCooldown(getDateUserDB), ephemeral: true });

        return collectDaily();
    },
});
