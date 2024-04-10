import { EmbedBuilder, inlineCode } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

// Embed Principal da loja de Membro Ativo
export function embedWalletShopActiveMember() {
    return new EmbedBuilder()
        .setAuthor({ name: "Loja do Servidor", iconURL: "https://i.imgur.com/0xGj9i0.png" })
        .setDescription(
            `O Cargo de Membro Ativo é uma assinatura especial que oferece uma série de vantagens exclusivas para os membros dedicados de nossa comunidade no Discord. Ao adquirir este cargo, você se torna parte de um grupo seleto de membros que desfrutam de privilégios especiais e uma atmosfera ainda mais envolvente.`
        )
        .addFields(
            {
                name: "\u200B",
                value: `
            **Valor: ${inlineCode("ﾠ600ﾠ Bloods 🩸")}
            Duração: ${inlineCode("ﾠ3 Diasﾠ")}
            Estoque: ${inlineCode("♾️")}**
        `,
                inline: true,
            },
            {
                name: "\u200B",
                value: `
            **Valor: ${inlineCode("ﾠ1400ﾠBloods 🩸")}
            Duração: ${inlineCode("ﾠ7 Diasﾠ")}
            Estoque: ${inlineCode("♾️")}**
        `,
                inline: true,
            },
            {
                name: "\u200B",
                value: `
            **Valor: ${inlineCode("ﾠ6000ﾠBloods 🩸")}
            Duração: ${inlineCode("ﾠ30 Diasﾠ")}
            Estoque: ${inlineCode("♾️")}**
        `,
                inline: true,
            },
            {
                name: "\u200B",
                value: `Ao clicar no botão abaixo, sua compra será efetuada instantaneamente.`,
            }
        )
        .setColor("DarkGold");
}

// Embed quando é efetuada uma compra na loja de Membro Ativo
export function embedWalletShopAtiveMemberBuy(day: number, roleActiveMember: string) {
    return new EmbedBuilder()
        .setDescription(
            `Fico feliz em informar que a transação para adquirir ${day} dias de <@&${roleActiveMember}> foi realizada com sucesso! Muito obrigado pelo suporte!`
        )
        .setColor("Random");
}
