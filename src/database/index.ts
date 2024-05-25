import { QuickDB } from "quick.db";
import { MemberBloods } from "./interfaces/MemberBloods.js";
import { ChannelBloodsIgnored } from "./interfaces/ChannelBloodsIgnored.js";
import { MemberBloodsRank } from "./interfaces/MemberBloodsRank.js";
import { ActiveMemberDuration } from "./interfaces/ActiveMemberDuration.js";
import { MemberBloodsLost } from "./interfaces/MemberBloodsLost.js";
import { CommandTimer } from "#classes";
import { MemberProfile } from "./interfaces/MemberProfile.js";
import { Coinflip } from "./interfaces/Coinflip.js";
import { ModerationBloods } from "./interfaces/ModerationBloods.js";

const filePath = rootTo("localdatabase.sqlite");

const database = {
    activeMemberDuration: new QuickDB<ActiveMemberDuration>({ filePath, table: "ActiveMemberDuration" }),
    channelBloodsIgnored: new QuickDB<ChannelBloodsIgnored>({ filePath, table: "ChannelBloodsIgnored" }),
    coinflip: new QuickDB<Coinflip>({ filePath, table: "Coinflip" }),
    commandTimer: new QuickDB<CommandTimer>({ filePath, table: "CommandTimer" }),
    memberBloods: new QuickDB<MemberBloods>({ filePath, table: "MemberBloods" }),
    memberBloodsLost: new QuickDB<MemberBloodsLost>({ filePath, table: "MemberBloodsLost" }),
    memberBloodsRank: new QuickDB<MemberBloodsRank>({ filePath, table: "MemberBloodsRank" }),
    memberProfile: new QuickDB<MemberProfile>({ filePath, table: "MemberProfile" }),
    moderationBloods: new QuickDB<ModerationBloods>({ filePath, table: "ModerationBloods" }),
};

export { database };
