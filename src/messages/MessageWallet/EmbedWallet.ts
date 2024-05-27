import { EmbedBuilder, inlineCode } from "discord.js";
import { wrapText } from "#functions";

//* ---------- Variáveis Mensagens Embed ----------

export const embedWalletShop = new EmbedBuilder()
    .setAuthor({ name: "Loja do Servidor", iconURL: "https://i.imgur.com/0xGj9i0.png" })
    .setDescription(
        `Troque seus Bloods por itens exclusivos em nossa loja e destaque-se ainda mais em nossa comunidade!

* Membro Ativo: Compre um cargo exclusivo do servidor
* Canal Personalizado: Em breve!
    `
    )
    .setColor("Random");

//* ---------- Funções Mensagens Embed ----------

export function embedWallet(
    userName: string,
    userIcon: string,
    userBloods: number,
    aboutMe: string,
    fame: number,
    userRank: number | null,
    allUsersRank: number | undefined
) {
    let rank: string = "Sem Rank";
    if (userRank) rank = `${userRank}/${allUsersRank}`;

    let iconsTop: string | null = null;

    switch (userRank) {
        case 1:
            iconsTop = "https://i.imgur.com/YQJMEyy.png";
            break;
        case 2:
            iconsTop = "https://i.imgur.com/oDOsiYg.png";
            break;
        case 3:
            iconsTop = "https://i.imgur.com/kvvaqsb.png";
            break;
    }

    return new EmbedBuilder()
        .setAuthor({ name: userName, iconURL: userIcon ?? undefined })
        .setDescription(`>>> **Sobre Mim**\n${wrapText(aboutMe, 45)}`)
        .setThumbnail(iconsTop)
        .addFields(
            { name: "\n", value: "\n" },
            { name: "Carteira", value: `${userBloods} Bloods 🩸`, inline: true },
            { name: "Fama", value: `${fame} ⭐️`, inline: true },
            { name: "Rank", value: `${rank} <:rank:1242560092281245746>`, inline: true },
            { name: "\n", value: "\n" }
        )
        .setColor("Random");
}

export function embedWalletUsers(
    userName: string,
    userIcon: string,
    userBloods: number,
    aboutMe: string,
    fame: number,
    userRank: number | null,
    allUsersRank: number | undefined
) {
    let rank: string = "Sem Rank";
    if (userRank) rank = `${userRank}/${allUsersRank}`;

    let iconsTop: string | null = null;

    switch (userRank) {
        case 1:
            iconsTop = "https://i.imgur.com/YQJMEyy.png";
            break;
        case 2:
            iconsTop = "https://i.imgur.com/oDOsiYg.png";
            break;
        case 3:
            iconsTop = "https://i.imgur.com/kvvaqsb.png";
            break;
    }

    return new EmbedBuilder()
        .setAuthor({ name: userName, iconURL: userIcon ?? undefined })
        .setDescription(`>>> **Sobre Mim**\n${wrapText(aboutMe, 45)}`)
        .setThumbnail(iconsTop)
        .addFields(
            { name: "\n", value: "\n" },
            { name: "Carteira", value: `${userBloods} Bloods 🩸`, inline: true },
            { name: "Fama", value: `${fame} ⭐️`, inline: true },
            { name: "Rank", value: `${rank} <:rank:1242560092281245746>`, inline: true },
            { name: "\n", value: "\n" }
        )
        .setFooter({ text: `Você está vendo o perfil de ${userName}`, iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f440.png" })
        .setColor("Random");
}

export function embedWalletRank(userId: string, membersRank: any[] | undefined, rowButton: any) {
    let textRank = "";

    if (membersRank && membersRank?.length > 0) {
        membersRank.forEach((element) => {
            textRank += `${element.userRank}º <@${element.userId}> ` + inlineCode(`ﾠ${element.userBloods} Bloods 🩸\n`);
        });
    } else {
        textRank = "* [ERRO] Não foi possível encontrar nenhum usuário no banco de dados.";
    }

    const embedWalletRank = new EmbedBuilder()
        .setAuthor({ name: "Top 10 Bloods", iconURL: "https://i.imgur.com/h0S883Y.png" })
        .setDescription(`${textRank} \nO Rank é atualizado a cada intervalo de 1 minuto.`)
        .setColor("DarkGold");

    return { content: `<@${userId}>`, embeds: [embedWalletRank], components: [rowButton] };
}
