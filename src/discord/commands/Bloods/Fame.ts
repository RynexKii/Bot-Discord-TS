import { Command } from "#base";
import { database } from "#database";
import { contentChannelSendCommand, contentFameBot, contentFameCooldown, contentFameYourself, embedFameSend } from "#functions";
import { channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "fama",
    description: "❰ Diversão ❱ De um ponto de fama para o seu ídolo",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Menção ou ID do usuário",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;
        const userReceiverFameId = interaction.options.getUser("usuário", true).id;
        const getDateUserDB = await database.memberProfile.get<number>(`${userId}.famaDate`);

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Verifica se o usuário que enviou não está enviando para um bot
        if (interaction.options.getUser("usuário", true).bot) return await interaction.reply({ content: contentFameBot(userReceiverFameId), ephemeral: true });

        // Verifica se o usuário que enviou não está enviando para ele mesmo
        if (userId == userReceiverFameId) return await interaction.reply({ content: contentFameYourself, ephemeral: true });

        // Pega a data atual
        const dateNow = new Date();

        // Criar um novo objeto Date com a data atual
        const nextDayDate = new Date(dateNow);

        // Adicionar um dia
        nextDayDate.setDate(nextDayDate.getDate() + 1);

        // Definir as horas, minutos, segundos e milissegundos para 00:00
        nextDayDate.setHours(0, 0, 0, 0);

        async function collectFama() {
            await database.memberProfile.add(`${userReceiverFameId}.fame`, 1);

            await database.memberProfile.set(`${userId}.famaDate`, nextDayDate.getTime());

            return await interaction.reply({ embeds: [embedFameSend(userId, userReceiverFameId)] });
        }

        // Caso for a primeira vez que o usuário de o comando ele chama a função para receber a recompensa
        if (!getDateUserDB) return collectFama();

        if (dateNow.getTime() < getDateUserDB) return await interaction.reply({ content: contentFameCooldown(getDateUserDB), ephemeral: true });

        return collectFama();
    },
});
