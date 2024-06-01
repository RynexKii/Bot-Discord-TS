// ---------- Variáveis Mensagens Content ----------

export const contentAddMainGuild = "⚠️ Você precisa adicionar um servidor principal do sistema, por favor, acesse `Adicionar Servidor` > `Adicionar`";

export const contentAlreadyMainGuild = "❌ Você não pode adicionar um novo servidor ao sistema, remova o servidor atual para poder adicionar outro servidor.";

export const contentNotMainGuildRegistered = "❌ Não existe nenhum servidor registrado no sistema para ser removido!";

export const contentNotMainGuild = "❌ Você só pode adicionar ou remover canais no `Servidor Principal`";

// ---------- Funções Mensagens Content ----------

export function contentIncorrectMainGuild(guildName: string, guildId: string) {
    return `Essa opção deve ser utilizada no servidor principal que o sistema foi registrado.

* Servidor Principal: **${guildName} (${guildId})**`;
}
