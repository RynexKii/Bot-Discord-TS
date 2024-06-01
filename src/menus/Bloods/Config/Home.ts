import { database } from "#database";
import { embedBloodsConfig } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export async function bloodsHomeMenu(botId: string) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: "button/bloods/configurações/inicio",
            label: "Inicio",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
            disabled: true,
        }),

        new ButtonBuilder({
            customId: "button/bloods/configurações/adicionar/canal",
            label: "Adicionar",
            style: ButtonStyle.Success,
            emoji: "<:add:1225995605558431786>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/configurações/remover/canal",
            label: "Remover",
            style: ButtonStyle.Danger,
            emoji: "<:remove:1226004959540150372>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/configurações/set/guild",
            label: "Adicionar Servidor",
            style: ButtonStyle.Primary,
            emoji: "<:guild:1226005983541592084>",
        })
    );

    const getGuildIdDB = (await database.guild.getGuildId()) ?? "Sem ID";
    let getGuildNameDB = "Sem Servidor";
    let getTextChannelsDB = "";
    let getVoiceChannelsDB = "";

    if (getGuildIdDB) {
        getGuildNameDB = await database.guild.getGuildName(getGuildIdDB);
        getTextChannelsDB = (await database.guild.getTextChannels(getGuildIdDB)) ?? "`Sem Canal`";
        getVoiceChannelsDB = (await database.guild.getVoiceChannels(getGuildIdDB)) ?? "`Sem Canal`";
    }

    return { embeds: [embedBloodsConfig(botId, getGuildIdDB, getGuildNameDB, getTextChannelsDB, getVoiceChannelsDB)], components: [rowButton], ephemeral: true };
}
