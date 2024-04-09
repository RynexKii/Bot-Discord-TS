import { QuickDB } from "quick.db";
import { MemberBloods } from "./interfaces/MemberBloods.js";
import { ChannelBloodsIgnored } from "./interfaces/ChannelBloodsIgnored.js";
import { MemberBloodsRank } from "./interfaces/MemberBloodsRank.js";

const filePath = rootTo("localdatabase.sqlite");

const database = {
    memberBloods: new QuickDB<MemberBloods>({ filePath, table: "MemberBloods" }),
    channelBloodsIgnored: new QuickDB<ChannelBloodsIgnored>({ filePath, table: "ChannelBloodsIgnored" }),
    memberBloodsRank: new QuickDB<MemberBloodsRank>({ filePath, table: "MemberBloodsRank" }),
};

export { database };
