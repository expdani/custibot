import { gql } from "@apollo/client/core";

export const GET_ALL_GUILD_COMMANDS = gql`
  query getAllGuildCommands {
    getAllGuildCommands {
      server_id
      user_id
      commands
    }
  }
`;

export const GET_SINGLE_GUILD_COMMAND = gql`
  query getSingleGuildCommand($server_id: String!, $name: String!) {
    getSingleGuildCommand(server_id: $server_id, name: $name) {
      server_id
      name
      command
    }
  }
`;
