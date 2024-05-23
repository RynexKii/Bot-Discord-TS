import { QuickDB } from "quick.db";
import { MemberBloods } from "./interfaces/MemberBloods.js";
import { ChannelBloodsIgnored } from "./interfaces/ChannelBloodsIgnored.js";
import { MemberBloodsRank } from "./interfaces/MemberBloodsRank.js";
import { ActiveMemberDuration } from "./interfaces/ActiveMemberDuration.js";
import { MemberBloodsLost } from "./interfaces/MemberBloodsLost.js";
import { CommandTimer } from "#classes";
import { MemberProfile } from "./interfaces/MemberProfile.js";
import { Coinflip } from "./interfaces/Coinflip.js";
const filePath = rootTo("localdatabase.sqlite");

const database = {
    memberBloods: new QuickDB<MemberBloods>({ filePath, table: "MemberBloods" }),
    memberProfile: new QuickDB<MemberProfile>({ filePath, table: "MemberProfile" }),
    memberBloodsLost: new QuickDB<MemberBloodsLost>({ filePath, table: "MemberBloodsLost" }),
    channelBloodsIgnored: new QuickDB<ChannelBloodsIgnored>({ filePath, table: "ChannelBloodsIgnored" }),
    memberBloodsRank: new QuickDB<MemberBloodsRank>({ filePath, table: "MemberBloodsRank" }),
    activeMemberDuration: new QuickDB<ActiveMemberDuration>({ filePath, table: "ActiveMemberDuration" }),
    commandTimer: new QuickDB<CommandTimer>({ filePath, table: "CommandTimer" }),
    coinflip: new QuickDB<Coinflip>({ filePath, table: "Coinflip" }),
};

export { database };
