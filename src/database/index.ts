import { QuickDB } from "quick.db";
import { MemberBloods } from "./interfaces/MemberBloods.js";
import { ChannelBloodsIgnored } from "./interfaces/ChannelBloodsIgnored.js";
import { MemberBloodsRank } from "./interfaces/MemberBloodsRank.js";
import { ActiveMemberDuration } from "./interfaces/ActiveMemberDuration.js";
import { MemberBloodsLost } from "./interfaces/MemberBloodsLost.js";
import { CommandTimer } from "#classes";

const filePath = rootTo("localdatabase.sqlite");

const database = {
    memberBloods: new QuickDB<MemberBloods>({ filePath, table: "MemberBloods" }),
    memberBloodsLost: new QuickDB<MemberBloodsLost>({ filePath, table: "MemberBloodsLost" }),
    channelBloodsIgnored: new QuickDB<ChannelBloodsIgnored>({ filePath, table: "ChannelBloodsIgnored" }),
    memberBloodsRank: new QuickDB<MemberBloodsRank>({ filePath, table: "MemberBloodsRank" }),
    activeMemberDuration: new QuickDB<ActiveMemberDuration>({ filePath, table: "ActiveMemberDuration" }),
    commandTimer: new QuickDB<CommandTimer>({ filePath, table: "CommandTimer" }),
};

export { database };
