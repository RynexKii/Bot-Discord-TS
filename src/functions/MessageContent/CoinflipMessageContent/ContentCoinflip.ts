import { inlineCode, userMention } from "discord.js";

//* ---------- Variáveis Mensagens Content ----------

export function coinflipMessage(userId: string, side: string, valueBet: number): string {
    return `**${userMention(userId)} Você escolheu o lado ${inlineCode(
        side
    )} da moeda, sua aposta é de \`${valueBet} Bloods\` jogue a moeda para ver se você vai ganhar, boa sorte 🤞**`;
}

export function coinflipLowBloods(userId: string): string {
    return `**${userMention(userId)} Você não possui Bloods o suficientes para jogar a moeda.**`;
}

export function coinflipWinMessage(userId: string, randomSide: string, valueBet: number): string {
    return `**${userMention(userId)} Você jogou a moeda e ela parou no lado da ${inlineCode(
        randomSide
    )}, parabens você ganhou \`${valueBet} Bloods\`  🎉**`;
}

export function coinflipLossMessage(userId: string, randomSide: string, userSide: string): string {
    if (userSide === "coinflipCara") {
        userSide = "Cara";
    } else {
        userSide = "Coroa";
    }

    return `**${userMention(userId)} Você jogou a moeda e ela parou no lado da ${inlineCode(
        randomSide
    )}, sua escolha foi \`${userSide}\` e você perdeu 😭**`;
}

export function coinflipPlayingMessage(userId: string): string {
    return `**${userMention(userId)} <a:coinflip:1239719312806379550> Jogando a moeda para o alto...**`;
}

export function coinflipCancel(userId: string): string {
    return `**${userMention(userId)} A aposta que você fez foi cancelada com sucesso 🥺**`;
}

export function coinflipCancelError(userId: string): string {
    return `**${userMention(userId)} A sua aposta foi cancelada pois você já tem uma mais recente aberta**`;
}
