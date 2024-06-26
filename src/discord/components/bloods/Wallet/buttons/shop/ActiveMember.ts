import { Component } from "#base";
import { database } from "#database";
import { contentAlreadyRole, contentInsufficientBloods, contentLogPublic, contentNotInteractCommand, embedLogBuyActiveMember } from "#messages";
import { walletShopActiveMember, walletShopActiveMemberBuy } from "#menus";
import { channelCongratulationsPublic, channelLogStaff, roleActiveMember } from "#tools";
import { ComponentType } from "discord.js";

//* Menu Principal Membro Ativo
new Component({
    customId: "button/bloods/wallet/shop/activemember",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        return await interaction.update(walletShopActiveMember(userId));
    },
});

//* Botão Membro Ativo 3 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/3day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const getBloodsUserDB = await database.profile.getBloods(userId);
        const getTimestampUserDB = await database.profile.getActiveMemberTimestamp(userId);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp3Day = +new Date() + 3 * 24 * 60 * 60 * 1000;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = roleActiveMember;

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get(channelLogStaff);

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get(channelCongratulationsPublic);

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB) return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB === undefined || (getBloodsUserDB && getBloodsUserDB < 600) || getBloodsUserDB === 0)
            return await interaction.reply({ content: contentInsufficientBloods(3, 600, getBloodsUserDB ?? 0), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send({ embeds: [embedLogBuyActiveMember(userId, roleActiveMember, 3, getTimestamp3Day)] });
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 3));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.profile.subBloods(userId, 600);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.profile.setActiveMemberTimestamp(userId, getTimestamp3Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 3, getRoleActiveMember));
    },
});

//* Botão Membro Ativo 7 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/7day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const getBloodsUserDB = await database.profile.getBloods(userId);
        const getTimestampUserDB = await database.profile.getActiveMemberTimestamp(userId);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp7Day = +new Date() + 7 * 24 * 60 * 60 * 1000;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = roleActiveMember;

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get(channelLogStaff);

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get(channelCongratulationsPublic);

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB) return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB === undefined || (getBloodsUserDB && getBloodsUserDB < 1330) || getBloodsUserDB === 0)
            return await interaction.reply({ content: contentInsufficientBloods(7, 1330, getBloodsUserDB ?? 0), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send({ embeds: [embedLogBuyActiveMember(userId, roleActiveMember, 7, getTimestamp7Day)] });
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 7));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.profile.subBloods(userId, 1330);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.profile.setActiveMemberTimestamp(userId, getTimestamp7Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 7, getRoleActiveMember));
    },
});

//* Botão Membro Ativo 30 Dias
new Component({
    customId: "button/bloods/wallet/shop/activemember/30day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const getBloodsUserDB = await database.profile.getBloods(userId);
        const getTimestampUserDB = await database.profile.getActiveMemberTimestamp(userId);

        // Pega o timestamp de agora e adiciona mais 3 dias
        const getTimestamp30Day = +new Date() + 30 * 24 * 60 * 60 * 1000;

        //! Integrar mais pra frente com o Banco de Dados
        const getRoleActiveMember = roleActiveMember;

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelLogStaff = interaction.guild.channels.cache.get(channelLogStaff);

        //! Integrar mais pra frente com o Banco de Dados
        const getChannelCongratulationsPublic = interaction.guild.channels.cache.get(channelCongratulationsPublic);

        // Verifica se o usuário já possui o cargo de Membro Ativo pelo Banco de Dados
        if (getTimestampUserDB) return await interaction.reply({ content: contentAlreadyRole(getRoleActiveMember, getTimestampUserDB), ephemeral: true });

        // Verifica se o usuário não possiu o valor necessário para comprar o cargo
        if (getBloodsUserDB === undefined || (getBloodsUserDB && getBloodsUserDB < 5100) || getBloodsUserDB === 0)
            return await interaction.reply({ content: contentInsufficientBloods(30, 5100, getBloodsUserDB ?? 0), ephemeral: true });

        //* Logs da Staff e Public

        // Logs da Staff
        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
            getChannelLogStaff.send({ embeds: [embedLogBuyActiveMember(userId, roleActiveMember, 30, getTimestamp30Day)] });
        }

        // Logs Public
        if (getChannelCongratulationsPublic && getChannelCongratulationsPublic.isTextBased()) {
            getChannelCongratulationsPublic.send(contentLogPublic(userId, 30));
        }

        //* Fim Logs da Staff e Public

        // Remove o valor do usuário do Banco de Dados
        await database.profile.subBloods(userId, 5100);

        // Adiciona o timestamp de 3 dias no Banco de Dados
        await database.profile.setActiveMemberTimestamp(userId, getTimestamp30Day);

        // Adiciona o cargo ao usuário
        interaction.member.roles.add(getRoleActiveMember);

        return await interaction.update(walletShopActiveMemberBuy(userId, 30, getRoleActiveMember));
    },
});
