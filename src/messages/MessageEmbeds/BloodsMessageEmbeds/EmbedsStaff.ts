import { createEmbed } from "@magicyan/discord";
import { EmbedBuilder, userMention } from "discord.js";

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

export function embedBloodsConfig(botId: string, guildId: string, guildName: string, textChannels: string, voiceChannels: string) {
    return createEmbed({
        author: { name: "Painel de configurações", iconURL: "https://i.imgur.com/7RV9fMq.png" },
        description: `  
Bem vindo(a) ao painel de configurações do app ${userMention(botId)}

* Servidor Principal Registrado
 * Servidor: **${guildName} (${guildId})**

* Canais que não receberão Bloods
 * Canais de Texto: ${textChannels}
 * Canais de Voz: ${voiceChannels}
`,
        color: "White",
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
