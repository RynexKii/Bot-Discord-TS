import { userMention } from "discord.js";

// ---------- Variáveis Mensagens Content ----------

export const coinflipNotUserBet = "<:Cheryl:1241523161795661854> Você não pode interagir com uma aposta da qual não faz parte.";

export const coinflipUserLowBloods = "<:Cheryl:1241523161795661854> Parece que você não possui bloods o suficientes para fazer essa aposta.";

export const coinflipSameUser = "<:Cheryl:1241523161795661854> Você não pode apostar contra você mesmo!";

export const coinflipUserBot = "<:Cheryl:1241523161795661854> Você não pode apostar contra um bot!";

export const coinflipLowBloods = "<:Susie:1241523174206603384> Parece que um dos dois usuários ficou sem bloods, por isso estamos cancelando a aposta...";

// ---------- Funções Mensagens Content ----------

export function coinflipMessage(userId: string, userReceivedId: string, sideBetId: string, valueBet: number, valueRate: number): string {
    let side: string = "Cara";
    if (sideBetId == "coinflipCoroa") side = "Coroa";

    return `${userMention(userId)} está desafiando ${userMention(
        userReceivedId
    )} para uma aposta, o lado de escolha é **${side}**.\nCada usuário irá apostar \` ${valueBet} Bloods \` e quem vencer vai levar tudo (Taxa de ${valueRate} Bloods)\nPara continuar, ${userMention(
        userReceivedId
    )} aceitar a aposta abaixo!`;
}

export function coinflipUserReceivedLowBloods(userReceivedId: string) {
    return `<:Cheryl:1241523161795661854> Parece que ${userMention(userReceivedId)} não possui bloods o suficientes para fazer essa aposta.`;
}

export function coinflipWinMessage(userWinnerId: string, userLostId: string, emoji: string, sideWinner: string, valueBet: number, valueRate: number): string {
    return `${emoji} ${sideWinner}! ${userMention(userWinnerId)} parabéns você ganhou a aposta conta ${userMention(userLostId)} e levou \` ${
        valueBet - valueRate
    } Bloods 🩸\` (Taxa de ${valueRate} Bloods)`;
}
