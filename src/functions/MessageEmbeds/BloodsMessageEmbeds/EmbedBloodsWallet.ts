import { EmbedBuilder, inlineCode } from "discord.js";

//* ---------- Variáveis Mensagens Embed ----------

//* ---------- Funções Mensagens Embed ----------

// Embed principal da Wallet
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

    const embedWalletRank = new EmbedBuilder().setDescription(textRank).setColor("DarkGold");

    return { content: `<@${userId}>`, embeds: [embedWalletRank], components: [rowButton] };
}
