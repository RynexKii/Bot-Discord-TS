// ---------- Variáveis Mensagens Content ----------

// Mensagem de quando não existe nenhum canal registrado no Banco de Dados
export const contentNotAllChannels = "Ops... Não existe nenhum canal registrado no Banco de Dados para ser removido!";

// Mensagem no Botão de adicionar quando existe um servidor já registrado no Banco de Dados
export const contentAlreadyGuild = "Hey, antes de você tentar adicionar um novo servidor, por favor remova o servidor atual registrado.";

// Mensagem do Botão de remover quando não existe um servidor configurado como Principal no Banco de Dados
export const contentNotGuildRegistered = "Antes de utilizar a opção de remover, é necessário configurar um servidor no Banco de Dados.";

// ---------- Funções Mensagens Embed ----------

// Mensagem do botão principal de Adicionar quando o canal já está registrado no Banco de Dados
export function contentAlreadyRegistered(channelId: string) {
    return `Ops... O canal <#${channelId}> já foi registrado no banco de dados!`;
}

// Mensagem do botão principal de Remover quando o canal não está registrado no Banco de Dados
export function contentNotChannel(channelId: string) {
    return `Ops... O canal <#${channelId}> não está registrado no Banco de Dados!`;
}

// Mensagem caso o botão de remover for usado em outro servidor do principal
export function contentIncorrectGuild(guildName: string, guildId: string) {
    return `Essa opção deve ser utilizada no servidor principal que o sistema foi registrado.

* Servidor Principal: **${guildName} (${guildId})**`;
}
