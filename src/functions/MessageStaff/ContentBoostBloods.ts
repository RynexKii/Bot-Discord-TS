import { time } from "discord.js";

//* ---------- Funções Mensagens Content ----------

export function contentBoostAlready(boostMultiplicationDB: string, boostDuration: number) {
    let boostMultiplication: string = "1.5x";
    if (boostMultiplicationDB == "boost2x") boostMultiplication = "2x";

    return `<:bloodsboost:1243726604048531506> Já existe um boost ativo de ${boostMultiplication} que vai acabar ${time(Math.floor(boostDuration / 1000), "R")}`;
}

export function contentBoostActivated(boostMultiplicationDB: string, boostDuration: number) {
    let boostMultiplication: string = "1.5x";
    if (boostMultiplicationDB == "boost2x") boostMultiplication = "2x";

    return `<:bloodsboost:1243726604048531506> Você ativou o boost de ${boostMultiplication} que irá durar até ${time(Math.floor(boostDuration / 1000), "R")}`;
}
