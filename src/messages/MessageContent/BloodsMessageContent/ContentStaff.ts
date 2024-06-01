//* ---------- Variáveis Mensagens Content ----------

// Mensagem de quando não existe nenhum canal registrado no Banco de Dados
export const contentNotAllChannels = "Ops... Não existe nenhum canal registrado no Banco de Dados para ser removido!";

//* ---------- Funções Mensagens Embed ----------

export function contentAlreadyRegistered(channelId: string) {
    return `Ops... O canal <#${channelId}> já foi registrado no banco de dados!`;
}

export function contentNotChannel(channelId: string) {
    return `Ops... O canal <#${channelId}> não está registrado no Banco de Dados!`;
}
