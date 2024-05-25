import { EmbedBuilder, time } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function embedBoostActivated(userName: string, userAvatarURL: string, boostMultiplicationDB: string, boostDuration: number) {
    let boostMultiplication: string = "1.5x";
    if (boostMultiplicationDB == "boost2x") boostMultiplication = "2x";

    return new EmbedBuilder()
        .setAuthor({ name: "Boost de Bloods Ativado", iconURL: "https://i.imgur.com/sL5Afmt.png" })
        .setDescription(
            `>>> **Multiplicador:** ${boostMultiplication}\n**Duração:** ${time(Math.floor(boostDuration / 1000), "F")}\n**Local:** Em todos os Canais de Voz`
        )
        .setFields({ name: "\n", value: "\n" })
        .setFooter({ text: userName, iconURL: userAvatarURL })
        .setColor("#ff0000");
}
