import mongoose, { model } from "mongoose";
import { log } from "#settings";
import chalk from "chalk";
import { guildSchema } from "./schemas/guild.js";
import { profileSchema } from "./schemas/profile.js";
import { profileDeletedSchema } from "./schemas/profileDeleted.js";
import { commandCooldownSchema } from "./schemas/commandCooldown.js";

// Conectando no MongoDB
mongoose
    .connect(process.env.MONGO_URI, { dbName: "database" })
    .then(() => {
        log.success(chalk.cyan("MongoDB connected"));
    })
    .catch((err) => {
        log.error(err);
        process.exit(1);
    });

// Criando o model e exportando
export const database = {
    guild: model("Guild", guildSchema, "Guild"),
    profile: model("Profile", profileSchema, "Profile"),
    profileDeleted: model("ProfileDeleted", profileDeletedSchema, "ProfileDeleted"),
    commandCooldown: model("CommandCooldown", commandCooldownSchema, "CommandCooldown"),
};
