import { Component } from "#base";
import { database } from "#database";
import { contentAlreadyRole, contentInsufficientBloods, contentLogPublic, contentLogStaff, contentNotInteractCommand } from "#functions";
import { walletShopActiveMemberBuy } from "#menus";
import { ComponentType } from "discord.js";

// Botão Membro Ativo 3 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/3day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        const getBloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        const getTimestampUserDB = await database.activeMemberDuration.get<number>(`${userId}.timestamp`);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp3Day = Math.round(+new Date() / 1000) + 3 * 24 * 60 * 60;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = "ROLEID";

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get("CHANNELID");

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get("CHANNELID");

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB)
            return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB && getBloodsUserDB < 600)
            return await interaction.reply({ content: contentInsufficientBloods(3, 600, getBloodsUserDB), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send(contentLogStaff(userId, getTimestamp3Day));
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 3));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.memberBloods.sub(`${userId}.bloods`, 600);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.activeMemberDuration.set(`${userId}.timestamp`, getTimestamp3Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 3, getRoleActiveMember));
    },
});

// Botão Membro Ativo 7 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/7day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        const getBloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        const getTimestampUserDB = await database.activeMemberDuration.get<number>(`${userId}.timestamp`);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp7Day = Math.round(+new Date() / 1000) + 7 * 24 * 60 * 60;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = "ROLEID";

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get("CHANNELID");

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get("CHANNELID");

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB)
            return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB && getBloodsUserDB < 1330)
            return await interaction.reply({ content: contentInsufficientBloods(7, 1330, getBloodsUserDB), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send(contentLogStaff(userId, getTimestamp7Day));
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 7));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.memberBloods.sub(`${userId}.bloods`, 1330);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.activeMemberDuration.set(`${userId}.timestamp`, getTimestamp7Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 7, getRoleActiveMember));
    },
});

// Botão Membro Ativo 30 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/30day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        const getBloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        const getTimestampUserDB = await database.activeMemberDuration.get<number>(`${userId}.timestamp`);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp30Day = Math.round(+new Date() / 1000) + 30 * 24 * 60 * 60;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = "ROLEID";

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get("CHANNELID");

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get("CHANNELID");

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB)
            return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB && getBloodsUserDB < 5100)
            return await interaction.reply({ content: contentInsufficientBloods(30, 5100, getBloodsUserDB), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send(contentLogStaff(userId, getTimestamp30Day));
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 30));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.memberBloods.sub(`${userId}.bloods`, 5100);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.activeMemberDuration.set(`${userId}.timestamp`, getTimestamp30Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 30, getRoleActiveMember));
    },
});
