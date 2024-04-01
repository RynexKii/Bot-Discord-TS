import { Component } from "#base";
import { database } from "#database";
import { bloodsHomeMenu } from "#menus";
import { ComponentType } from "discord.js";

new Component({
    customId: "button/bloods/configurações/inicio",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const getChannelDB = await database.channelBloodsIgnored.get(interaction.guildId);

        await interaction.update(bloodsHomeMenu(getChannelDB));
    },
});
