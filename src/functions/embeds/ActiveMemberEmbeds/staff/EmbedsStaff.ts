import { createEmbed } from "@magicyan/discord";

// Variáveis Embed

export const embedAddButton = createEmbed({
    description: `<:Atendimento:1137020447922335755> Por favor, escolha o canal que você gostaria de adicionar ao banco de dados.`,
    color: "#15ff00",
});

export const embedRemoveButton = createEmbed({
    description: `<:Atendimento:1137020447922335755> Por favor, escolha o canal que você gostaria de remover do banco de dados.`,
    color: "#ff0000",
});

export const embednotAllChannels = createEmbed({
    description: `### <:error:1212567041094058057> Não existe nenhum canal registrado no Banco de Dados para ser removido!`,
    color: "#ff0000",
});
// Funções Embed

export function embedBloodsConfig(ChannelsIdDB: any) {
    let textChannel = "";
    let voiceChannel = "";

    if (ChannelsIdDB) {
        if (ChannelsIdDB.textChannels && ChannelsIdDB.textChannels.length > 0) {
            ChannelsIdDB.textChannels.forEach((element: any) => {
                return (textChannel += `<#${element}> `);
            });
        } else {
            textChannel = "`Sem canal`";
        }

        if (ChannelsIdDB.voiceChannels && ChannelsIdDB.voiceChannels.length > 0) {
            ChannelsIdDB.voiceChannels.forEach((element: any) => {
                return (voiceChannel += `<#${element}> `);
            });
        } else {
            voiceChannel = "`Sem canal`";
        }
    } else {
        textChannel = "`Sem canal`";
        voiceChannel = "`Sem canal`";
    }

    return createEmbed({
        author: { name: "Configurações de Canais", iconURL: "https://i.imgur.com/bb3OIny.png" },
        description: `  
        Configure os canais onde as atividades dos Bloods não serão consideradas para acumulação de pontos.
        
        * Canais registrado no Banco de Dados
         * Canais de Texto: ${textChannel}
         * Canais de Voz: ${voiceChannel}`,
        color: "White",
    });
}

export function embedAlreadyRegistered(ChannelId: string) {
    return createEmbed({
        description: `### <:error:1212567041094058057> O canal <#${ChannelId}> já foi registrado no banco de dados!`,
        color: "#ff0000",
    });
}

export function embedAddSuccessText(ChannelId: string) {
    return createEmbed({
        description: `### <:add:1212567044428533760> O canal de texto <#${ChannelId}> foi adicionado com sucesso no Banco de Dados!`,
        color: "#15ff00",
    });
}

export function embedAddSuccessVoice(ChannelId: string) {
    return createEmbed({
        description: `### <:add:1212567044428533760> O canal de voz <#${ChannelId}> foi adicionado com sucesso no Banco de Dados!`,
        color: "#15ff00",
    });
}

export function embedNotChannel(ChannelId: string) {
    return createEmbed({
        description: `### <:error:1212567041094058057> O canal <#${ChannelId}> não está registrado no Banco de Dados!`,
        color: "#ff0000",
    });
}

export function embedRemoveSuccessText(ChannelId: string) {
    return createEmbed({
        description: `### <:remove:1212567045695213629> O canal de texto <#${ChannelId}> foi removido com sucesso no Banco de Dados!`,
        color: "#ff0000",
    });
}

export function embedRemoveSuccessVoice(ChannelId: string) {
    return createEmbed({
        description: `### <:remove:1212567045695213629> O canal de voz <#${ChannelId}> foi removido com sucesso no Banco de Dados!`,
        color: "#ff0000",
    });
}
