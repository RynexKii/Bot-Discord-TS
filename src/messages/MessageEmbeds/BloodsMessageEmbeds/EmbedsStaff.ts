import { createEmbed } from "@magicyan/discord";
import { EmbedBuilder } from "discord.js";

//* ---------- Variáveis Mensagens Embed ----------

export const embedAddButton = createEmbed({
    description: "<:config:1225996077434404907> Por favor, escolha o canal que você gostaria de adicionar ao Banco de Dados.",
    color: "#15ff00",
});

export const embedRemoveButton = createEmbed({
    description: "<:config:1225996077434404907> Por favor, escolha o canal que você gostaria de remover do Banco de Dados.",
    color: "#ff0000",
});

//* ---------- Funções Mensagens Embed ----------

export function embedBloodsConfig(guildId: string, guildName: string, textChannels: string[] | string, voiceChannels: string[] | string) {
    let textChannel: string = "";
    let voiceChannel: string = "";

    if (Array.isArray(textChannels)) {
        if (textChannels.length == 0) textChannel = "**Sem canal**";
        textChannels.forEach((element) => {
            return (textChannel += `<#${element}> `);
        });
    }

    if (Array.isArray(voiceChannels)) {
        if (voiceChannels.length == 0) voiceChannel = "**Sem canal**";
        voiceChannels.forEach((element) => {
            return (voiceChannel += `<#${element}> `);
        });
    }

    if (textChannels == "Sem Canal" && voiceChannels == "Sem Canal") {
        textChannel = "**Sem canal**";
        voiceChannel = "**Sem canal**";
    }

    return createEmbed({
        author: { name: "Configurações de Canais", iconURL: "https://i.imgur.com/bb3OIny.png" },
        description: `  
Configure os canais onde as atividades dos Bloods não serão consideradas para acumulação de pontos.
        
* Servidor registrado no Banco de Dados
 * Servidor: **${guildName} (${guildId})**

* Canais registrado no Banco de Dados
 * Canais de Texto: ${textChannel}
 - Canais de Voz: ${voiceChannel}
`,
        color: "Yellow",
    });
}

export function embedAddSuccessText(channelId: string) {
    return createEmbed({
        description: `<:add:1225995605558431786>ﾠO canal de texto <#${channelId}> foi adicionado com sucesso no Banco de Dados!`,
        color: "#15ff00",
    });
}

export function embedAddSuccessVoice(channelId: string) {
    return createEmbed({
        description: `<:add:1225995605558431786>ﾠO canal de voz <#${channelId}> foi adicionado com sucesso no Banco de Dados!`,
        color: "#15ff00",
    });
}

export function embedRemoveSuccessText(channelId: string) {
    return createEmbed({
        description: `<:remove:1226004959540150372>ﾠO canal de texto <#${channelId}> foi removido com sucesso no Banco de Dados!`,
        color: "#ff0000",
    });
}

export function embedRemoveSuccessVoice(channelId: string) {
    return createEmbed({
        description: `<:remove:1226004959540150372>ﾠO canal de voz <#${channelId}> foi removido com sucesso no Banco de Dados!`,
        color: "#ff0000",
    });
}

export function embedGuildConfig(guildName: string, guildId: string) {
    return new EmbedBuilder()
        .setDescription(
            `
    Você está prestes a selecionar se deseja adicionar ou remover este servidor como principal. Por favor, escolha uma das opções abaixo.

    * Servidor: **${guildName} (${guildId})**

    **Observação: Ao remover este servidor, todos os canais registrados também serão excluídos.**`
        )
        .setColor("White");
}

export function embedGuildAdd(guildName: string) {
    return new EmbedBuilder()
        .setDescription(`<:add:1225995605558431786>ﾠO servidor **(${guildName})** foi adicionado como o Servidor Principal do sistema Bloods.`)
        .setColor("#15ff00");
}

export function embedGuildRemove(guildName: string) {
    return new EmbedBuilder()
        .setDescription(`<:remove:1226004959540150372>ﾠO servidor **(${guildName})** foi removido como o Servidor Principal do sistema Bloods.`)
        .setColor("#ff0000");
}
