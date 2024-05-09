import { EmbedBuilder, inlineCode } from "discord.js";

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

export function embedWallet(userName: string, userIcon: any, userBloods: any, userRank: any, allUsersRank: any) {
    let rank;
    if (userRank) {
        rank = userRank + "/" + allUsersRank;
    } else {
        rank = "Sem Rank";
    }

    return new EmbedBuilder()
        .setAuthor({ name: userName, iconURL: userIcon ?? undefined })
        .setDescription("Seu saldo de Bloods e seu Rank atual\n\u200B")
        .addFields(
            { name: "Carteira", value: `${userBloods ?? 0} Bloods 🩸`, inline: true },
            { name: "Banco", value: "0 Bloods 🩸", inline: true },
            { name: "Rank", value: `${rank}ﾠ<:ranking:1226234468587540500>`, inline: true },
            { name: "\u200B", value: "O Rank é atualizado a cada intervalo de 5 minutos." }
        )
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
        .setAuthor({ name: "Top 5 Bloods", iconURL: "https://i.imgur.com/h0S883Y.png" })
        .setDescription(textRank)
        .setColor("DarkGold");

    return { content: `<@${userId}>`, embeds: [embedWalletRank], components: [rowButton] };
}
