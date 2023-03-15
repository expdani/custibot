import { apolloClient } from "../../apollo";
import { GET_ALL_GUILD_COMMANDS, GET_SINGLE_GUILD_COMMAND } from "./gql";

export type AllGuildCommandType = {
  server_id: string;
  user_id: string;
  name: string;
  commands: SingleCommandType[];
};

export type SingleGuildCommandType = {
  server_id: string;
  name: string;
  command: SingleCommandType;
};

export type SingleCommandType = {
  id: string;
  name: string;
  description: string;
  options?: [
    {
      name: string;
      description: string;
      type: 1 | 2 | 3 | 4 | 5;
      required?: boolean;
      choices?: [
        {
          name: string;
          value: string;
        }
      ];
    }
  ];
  action: CommandAction;
};

type CommandAction = {
  message?: string;
  ephemeral?: boolean;
};

/**
 * Get the commands from all guilds
 */
export async function getAllGuildCommands(): Promise<AllGuildCommandType[]> {
  const { data } = await apolloClient.query({
    query: GET_ALL_GUILD_COMMANDS,
  });

  return data.getAllGuildCommands;
}

/**
 * Get all commands for a single guild
 */
export async function getGuildCommands(
  id: string
): Promise<AllGuildCommandType[]> {
  const { data } = await apolloClient.query({
    query: GET_ALL_GUILD_COMMANDS,
  });

  return data.getAllGuildCommands;
}

/**
 * Find a single command
 */
export async function getGuildCommand(
  server_id: string,
  name: string
): Promise<SingleGuildCommandType> {
  const { data } = await apolloClient.query({
    query: GET_SINGLE_GUILD_COMMAND,
    variables: { server_id, name },
  });

  return data.getSingleGuildCommand;
}
