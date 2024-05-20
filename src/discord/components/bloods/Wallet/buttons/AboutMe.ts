import { Component } from "#base";
import { database } from "#database";
import { contentNotInteractCommand, defaultContentAboutMe } from "#functions";
import { createModalInput } from "@magicyan/discord";
import { ComponentType, ModalBuilder, TextInputStyle } from "discord.js";

new Component({
    customId: "button/bloods/wallet/aboutme",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const userName = interaction.user.displayName;
        let userAboutMeDB = await database.memberProfile.get<string>(`${userId}.aboutMe`);

        if (!userAboutMeDB) userAboutMeDB = defaultContentAboutMe(userId);

        const modal = new ModalBuilder({
            customId: "modal/bloods/wallet/aboutme",
            title: userName,
            components: [
                createModalInput({
                    customId: "aboutMe",
                    label: "Sobre mim",
                    placeholder: "Digite algo sobre você...",
                    style: TextInputStyle.Paragraph,
                    minLength: 5,
                    maxLength: 210,
                    value: userAboutMeDB,
                }),
            ],
        });

        return await interaction.showModal(modal);
    },
});
