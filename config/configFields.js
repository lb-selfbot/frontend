export const configFields = {
  selfbot: [
    {
      name: "Command Prefix",
      type: "text",
      info: 'The prefix that will be used to trigger commands. \nExample: If your command prefix is "!", you can you use "!help" to get a list of commands.',
      get: (config) => config.Selfbot?.CommandPrefix,
      set: (config, value) => {
        config.Selfbot.CommandPrefix = value;
        return config;
      },
    },
    {
      name: "Command Mode",
      type: "dropdown",
      info: "The command mode changes how responses to your commands will be sent.",
      get: (config) => config.Selfbot?.CommandMode,
      set: (config, value) => {
        config.Selfbot.CommandMode = value;
        return config;
      },
      options: [
        {
          label: "Codeblock",
          value: "Codeblock",
          info: "The bot will respond to commands in codeblocks.",
          icon: "code-braces",
        },
        {
          label: "Text",
          value: "Text",
          info: "The bot will respond to commands in normal text.",
          icon: "text",
        },
        {
          label: "URL Embed",
          value: "URLEmbed",
          info: "The bot will respond to commands with a hidden URL that will have a Discord embed.",
          icon: "link",
        },
      ],
    },
    {
      name: "Title",
      type: "text",
      jsonQuery: "/Selfbot/Title",
      info: "The title of the embed, codeblock or message that the bot will response with.\nThe title is the first line in the message and will be in a different color in codeblock mode.",
      get: (config) => config.Selfbot?.Title,
      set: (config, value) => {
        config.Selfbot.Title = value;
        return config;
      },
    },
    {
      name: "Footer",
      type: "text",
      info: "The footer of the embed, codeblock or message that the bot will response with.\nThe footer is the last line in the message and will be in a different color in codeblock mode.",
      get: (config) => config.Selfbot?.Footer,
      set: (config, value) => {
        config.Selfbot.Footer = value;
        return config;
      },
    },
    {
      name: "Delete Responses",
      type: "switch",
      info: "If this is enabled, the bot will delete the message that the bot sent in response to the command after waiting for the delay.\nThis is useful to hide the bot from other people.",
      get: (config) => config.Selfbot?.DeleteResponses,
      set: (config, value) => {
        config.Selfbot.DeleteResponses = value;
        return config;
      },
    },
    {
      name: "Delete Responses Delay",
      type: "number",
      info: "If this is enabled, the bot will delete the message that the bot sent in response to the command after waiting for the delay.\nThis is useful to hide the bot from other people.",
      get: (config) => config.Selfbot?.DeleteResponsesDelay,
      set: (config, value) => {
        config.Selfbot.DeleteResponsesDelay = value;
        return config;
      },
    },
    {
      name: "Delete Commands",
      type: "switch",
      info: "If enabled, the bot will delete the message that invoked the command.",
      get: (config) => config.Selfbot?.DeleteCommands,
      set: (config, value) => {
        config.Selfbot.DeleteCommands = value;
        return config;
      },
    },
    {
      name: "Mobile Friendly",
      type: "switch",
      info: "If enabled, the bot will not use colored codeblocks to improve readability on mobile.",
      get: (config) => config.Selfbot?.MobileFriendly,
      set: (config, value) => {
        config.Selfbot.MobileFriendly = value;
        return config;
      },
    },
  ],
  notifications: [
    {
      name: "Enabled",
      type: "switch",
      get: (config) => config.Notifications?.Enabled,
      set: (config, value) => {
        config.Notifications.Enabled = value;
        return config;
      },
      info: "Turn notifications on or off.",
    },
  ],
  snipers: [
    {
      name: "Nitro Sniper",
      type: "switch",
      info: "Enable or disable the nitro sniper.\n\nThe nitro sniper will try to claim every gift code that is sent in servers that you are in.",
      get: (config) => config.Snipers?.NitroSniper,
      set: (config, value) => {
        config.Snipers.NitroSniper = value;
        return config;
      },
    },
    {
      name: "Giveaway Sniper",
      type: "switch",
      info: "Enable or disable the giveaway sniper.\n\nThe giveaway sniper will try to join every giveaway hosted in servers you are in and notify you when you win a giveaway.",
      get: (config) => config.Snipers?.GiveawaySniper?.Enabled,
      set: (config, value) => {
        config.Snipers.GiveawaySniper.Enabled = value;
        return config;
      },
    },
    {
      name: "Giveaway Sniper Sleep",
      type: "number",
      info: "Time in seconds that the sniper will wait before joining a giveaway after finding it.",
      get: (config) => config.Snipers?.GiveawaySniper?.Sleep,
      set: (config, value) => {
        config.Snipers.GiveawaySniper.Sleep = value;
        return config;
      },
    },
    {
      name: "Custom Bots",
      type: "user_selection_dialog",
      info: "Custom bots for the giveaway sniper.\n\nThe bot will try to enter giveaways hosted using these bots.",
      get: (config) => config.Snipers?.GiveawaySniper?.CustomBots,
      set: (config, value) => {
        config.Snipers.GiveawaySniper.CustomBots = value;
        return config;
      },
    },
    {
      name: "Blacklist",
      type: "text_selection_dialog",
      info: "The giveaway sniper will ignore a giveaway if any of the blacklist entries are found in the prize.",
      get: (config) => config.Snipers?.Blacklist,
      set: (config, value) => {
        config.Snipers.Blacklist = value;
        return config;
      },
    },
    {
      name: "Multi-Token Sniper",
      type: "switch",
      info: "Enable or disable the giveaway sniper.\n\nThe giveaway sniper will try to join every giveaway hosted in servers you are in and notify you when you win a giveaway.",
      get: (config) => config.Snipers?.MultiTokenSniper,
      set: (config, value) => {
        config.Snipers.MultiTokenSniper = value;
        return config;
      },
    },
    {
      name: "Tokens",
      type: "text_selection_dialog",
      info: "Tokens for the multi-token sniper.\n\nThe sniper will try to join giveaways and redeem codes using these tokens.",
      get: (config) => config.Snipers?.Tokens,
      set: (config, value) => {
        config.Snipers.Tokens = value;
        return config;
      },
    },
  ],
  webhooks: [
    {
      name: "Nitro Sniper Webhook",
      type: "url",
      get: (config) => config.Webhooks?.NitroSniper,
      set: (config, value) => {
        config.Webhooks.NitroSniper = value;
        return config;
      },
      info: "The webhook URL to send nitro sniper notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Giveaway Sniper Webhook",
      type: "url",
      get: (config) => config.Webhooks?.GiveawaySniper,
      set: (config, value) => {
        config.Webhooks.GiveawaySniper = value;
        return config;
      },
      info: "The webhook URL to send giveaway sniper notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Selfbot Detection Webhook",
      type: "url",
      get: (config) => config.Webhooks?.SelfbotDetection,
      set: (config, value) => {
        config.Webhooks.SelfbotDetection = value;
        return config;
      },
      info: "The webhook URL to send selfbot detection notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Staff Detection Webhook",
      type: "url",
      get: (config) => config.Webhooks?.StaffDetection,
      set: (config, value) => {
        config.Webhooks.StaffDetection = value;
        return config;
      },
      info: "The webhook URL to send staff detection notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Notifiers Webhook",
      type: "url",
      get: (config) => config.Webhooks?.Notifiers,
      set: (config, value) => {
        config.Webhooks.Notifiers = value;
        return config;
      },
      info: "The webhook URL to send notifier notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Ping Detection Webhook",
      type: "url",
      get: (config) => config.Webhooks?.PingDetection,
      set: (config, value) => {
        config.Webhooks.PingDetection = value;
        return config;
      },
      info: "The webhook URL to send ping detection notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Misc Webhook",
      type: "url",
      get: (config) => config.Webhooks?.Misc,
      set: (config, value) => {
        config.Webhooks.Misc = value;
        return config;
      },
      info: "The webhook URL to send miscellaneous notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
    {
      name: "Sessions Webhook",
      type: "url",
      get: (config) => config.Webhooks?.Sessions,
      set: (config, value) => {
        config.Webhooks.Sessions = value;
        return config;
      },
      info: "The webhook URL to send sessions notifications to. Leave blank to disable.\n\nYou can create a webhook by going to Channel Settings > Integrations > Webhooks > Create Webhook.",
    },
  ],
  events: [
    {
      name: "Ban Notifier",
      type: "switch",
      info: "You will be notified when you get banned from a server.",
      get: (config) => config.Events?.BanNotifier,
      set: (config, value) => {
        config.Events.BanNotifier = value;
        return config;
      },
    },
    {
      name: "DM Notifier",
      type: "switch",
      info: "You will be notified when someone sends you a DM.",
      get: (config) => config.Events?.DMNotifier,
      set: (config, value) => {
        config.Events.DMNotifier = value;
        return config;
      },
    },
    {
      name: "DM Edit Notifier",
      type: "switch",
      info: "You will be notified when someone edits a DM sent to you.",
      get: (config) => config.Events?.DMEditNotifier,
      set: (config, value) => {
        config.Events.DMEditNotifier = value;
        return config;
      },
    },
    {
      name: "DM Delete Notifier",
      type: "switch",
      info: "You will be notified when someone deletes a DM sent to you.",
      get: (config) => config.Events?.DMDeleteNotifier,
      set: (config, value) => {
        config.Events.DMDeleteNotifier = value;
        return config;
      },
    },
    {
      name: "DM Typing Notifier",
      type: "switch",
      info: "You will be notified when someone is typing in your DMs.",
      get: (config) => config.Events?.DMTypingNotifier,
      set: (config, value) => {
        config.Events.DMTypingNotifier = value;
        return config;
      },
    },
    {
      name: "Discord Staff Detection",
      type: "switch",
      info: "You will be notified when a Discord staff member is detected.",
      get: (config) => config.Events?.DiscordStaffDetection,
      set: (config, value) => {
        config.Events.DiscordStaffDetection = value;
        return config;
      },
    },
    {
      name: "Ghost Ping Detection",
      type: "switch",
      info: "You will be notified when you are pinged and the message is deleted.",
      get: (config) => config.Events?.GhostPingDetection,
      set: (config, value) => {
        config.Events.GhostPingDetection = value;
        return config;
      },
    },
    {
      name: "Message Delete Notifier",
      type: "switch",
      info: "You will be notified when a message is deleted.",
      get: (config) => config.Events?.MessageDeleteNotifier,
      set: (config, value) => {
        config.Events.MessageDeleteNotifier = value;
        return config;
      },
    },
    {
      name: "Selfbot Detection",
      type: "switch",
      info: "You will be notified when a user is detected using a selfbot.",
      get: (config) => config.Events?.SelfbotDetection,
      set: (config, value) => {
        config.Events.SelfbotDetection = value;
        return config;
      },
    },
    {
      name: "Ticket Notifier",
      type: "switch",
      info: "You will be notified when a ticket is opened in a server your are administrating.",
      get: (config) => config.Events?.TicketNotifier,
      set: (config, value) => {
        config.Events.TicketNotifier = value;
        return config;
      },
    },
    {
      name: "Session Connected",
      type: "switch",
      info: "You will be notified when a device is logged in to your Discord account.",
      get: (config) => config.Events?.SessionConnected,
      set: (config, value) => {
        config.Events.SessionConnected = value;
        return config;
      },
    },
    {
      name: "Session Disconnected",
      type: "switch",
      info: "You will be notified when a device is logged out of your Discord account.",
      get: (config) => config.Events?.SessionDisconnected,
      set: (config, value) => {
        config.Events.SessionDisconnected = value;
        return config;
      },
    },
  ],
  rpc: [
    {
      name: "Enabled",
      type: "switch",
      info: "Turn Rich Presence on or off.",
      get: (config) => config.RPC?.Enabled,
      set: (config, value) => {
        config.RPC.Enabled = value;
        return config;
      },
    },
    {
      name: "Client ID",
      type: "text",
      info: "The Client ID for your Rich Presence application. You can find it in the Discord Developers site.",
      get: (config) => config.RPC?.ClientID,
      set: (config, value) => {
        config.RPC.ClientID = value;
        return config;
      },
    },
    {
      name: "Invitable",
      type: "switch",
      info: "If enabled, you can send fake game invites to other people.",
      get: (config) => config.RPC?.Invitable,
      set: (config, value) => {
        config.RPC.Invitable = value;
        return config;
      },
    },
    {
      name: "Time",
      type: "switch",
      info: "If enabled, your Rich Presence will show how much time has elapsed.",
      get: (config) => config.RPC?.Time,
      set: (config, value) => {
        config.RPC.Time = value;
        return config;
      },
    },
    {
      name: "Large Image ID",
      type: "text",
      info: "The ID for the large image.",
      get: (config) => config.RPC?.LargeImage,
      set: (config, value) => {
        config.RPC.LargeImage = value;
        return config;
      },
    },
    {
      name: "Large Image Text",
      type: "text",
      info: "The text for the large image.",
      get: (config) => config.RPC?.LargeText,
      set: (config, value) => {
        config.RPC.LargeText = value;
        return config;
      },
    },
    {
      name: "Small Image ID",
      type: "text",
      info: "The ID for the small image.",
      get: (config) => config.RPC?.SmallImage,
      set: (config, value) => {
        config.RPC.SmallImage = value;
        return config;
      },
    },
    {
      name: "Small Image Text",
      type: "text",
      info: "The text for the small image.",
      get: (config) => config.RPC?.SmallText,
      set: (config, value) => {
        config.RPC.SmallText = value;
        return config;
      },
    },
    {
      name: "Details",
      type: "text",
      info: "The details text for the Rich Presence.",
      get: (config) => config.RPC?.Details,
      set: (config, value) => {
        config.RPC.Details = value;
        return config;
      },
    },
    {
      name: "State",
      type: "text",
      info: "The state text for the Rich Presence.",
      get: (config) => config.RPC?.State,
      set: (config, value) => {
        config.RPC.State = value;
        return config;
      },
    },
    {
      name: "Button 1 Label",
      type: "text",
      info: "The label for the first button.",
      get: (config) => config.RPC?.Buttons[0]?.Label,
      set: (config, value) => {
        config.RPC.Buttons[0].Label = value;
        return config;
      },
    },
    {
      name: "Button 1 URL",
      type: "url",
      info: "The URL for the first button.",
      get: (config) => config.RPC?.Buttons[0]?.URL,
      set: (config, value) => {
        config.RPC.Buttons[0].URL = value;
        return config;
      },
    },
    {
      name: "Button 2 Label",
      type: "text",
      info: "The label for the second button.",
      get: (config) => config.RPC?.Buttons[1]?.Label,
      set: (config, value) => {
        config.RPC.Buttons[1].Label = value;
        return config;
      },
    },
    {
      name: "Button 2 URL",
      type: "url",
      info: "The URL for the second button.",
      get: (config) => config.RPC?.Buttons[1]?.URL,
      set: (config, value) => {
        config.RPC.Buttons[1].URL = value;
        return config;
      },
    },
  ],
  ui: [
    {
      name: "Theme",
      type: "dropdown",
      info: "The theme of the UI.",
      options: [
        {
          label: "Dark",
          value: "Dark",
          info: "Dark Theme",
        },
        {
          label: "Light",
          value: "Light",
          info: "Light Theme",
        },
      ],
      get: (config) => config.UI?.Theme,
      set: (config, value) => {
        config.UI.Theme = value;
        return config;
      },
    },
    {
      name: "Hide To System Tray",
      type: "switch",
      info: "If enabled, the UI will be hidden to the system tray when you minimize it.",
      get: (config) => config.UI?.HideToSystemTray,
      set: (config, value) => {
        config.UI.HideToSystemTray = value;
        return config;
      },
    },
  ],
  protections: [
    {
      name: "Anti Friend Request",
      type: "switch",
      info: "If enabled, the bot will protect you against friend request spam.",
      get: (config) => config.Protections?.AntiFriendRequest,
      set: (config, value) => {
        config.Protections.AntiFriendRequest = value;
        return config;
      },
    },
    {
      name: "Anti Mass DM",
      type: "switch",
      info: "If enabled, the bot will protect you against DM spam.",
      get: (config) => config.Protections?.AntiMassDM,
      set: (config, value) => {
        config.Protections.AntiMassDM = value;
        return config;
      },
    },
    {
      name: "Anti Phising",
      type: "switch",
      info: "If enabled, the bot will warn you against phising links.",
      get: (config) => config.Protections?.AntiPhising,
      set: (config, value) => {
        config.Protections.AntiPhising = value;
        return config;
      },
    },
    {
      info: "Protect your servers from malicious users.",
      name: "Server Protections",
      type: "server_protections_dialog",
      get: (config) => config.Protections?.ServerProtections,
      set: (config, _value) => config,
    },
  ],
  afk: [
    {
      name: "Enabled",
      type: "switch",
      info: "Turn AFK on or off.",
      get: (config) => config.AFK?.Enabled,
      set: (config, value) => {
        config.AFK.Enabled = value;
        return config;
      },
    },
    {
      name: "Delay",
      type: "number",
      info: "Delay before sending the AFK message.",
      get: (config) => config.AFK?.Delay,
      set: (config, value) => {
        config.AFK.Delay = value;
        return config;
      },
    },
    {
      name: "On DM",
      type: "switch",
      info: "If enabled, the AFK message will be sent when you get a DM.",
      get: (config) => config.AFK?.OnDM,
      set: (config, value) => {
        config.AFK.OnDM = value;
        return config;
      },
    },
    {
      name: "On Ping",
      type: "switch",
      info: "If enabled, the AFK message will be sent when you get pinged.",
      get: (config) => config.AFK?.OnPing,
      set: (config, value) => {
        config.AFK.OnPing = value;
        return config;
      },
    },
    {
      name: "Reply",
      type: "switch",
      info: "If enabled, the AFK message will be sent in a reply to the message that triggered it.",
      get: (config) => config.AFK?.Reply,
      set: (config, value) => {
        config.AFK.Reply = value;
        return config;
      },
    },
    {
      name: "Typing",
      type: "switch",
      info: "If enabled, Discord will display that you are typing for as long as the delay before sending the AFK message.",
      get: (config) => config.AFK?.Typing,
      set: (config, value) => {
        config.AFK.Typing = value;
        return config;
      },
    },
    {
      name: "Ignored Users",
      type: "user_selection_dialog",
      info: "Messages from these users will be ignored.",
      get: (config) => config.AFK?.IgnoredUsers,
      set: (config, value) => {
        config.AFK.IgnoredUsers = value;
        return config;
      },
    },
    {
      name: "Ignored Servers",
      type: "server_selection_dialog",
      info: "Messages from these servers will be ignored.",
      get: (config) => config.AFK?.IgnoredServers,
      set: (config, value) => {
        config.AFK.IgnoredServers = value;
        return config;
      },
    },
    {
      name: "Message",
      type: "text",
      info: "The message to be sent when a message triggers the AFK bot.",
      get: (config) => config.AFK?.Message,
      set: (config, value) => {
        config.AFK.Message = value;
        return config;
      },
    },
  ],
  sharing: [
    {
      name: "Share All Commands",
      type: "switch",
      info: "Share all commands with the shared users.\n\nWARNING: Users in the shared users list will be able to run any command in the bot. This means they can execute commands like shutdownpc, hiddeneveryone, etc.",
      get: (config) => config.Sharing?.ShareAll,
      set: (config, value) => {
        config.Sharing.ShareAll = value;
        return config;
      },
    },
    {
      name: "Shared Users",
      type: "user_selection_dialog",
      info: "Users to share commands with.",
      get: (config) => config.Sharing?.SharedUsers,
      set: (config, value) => {
        config.Sharing.SharedUsers = value;
        return config;
      },
    },
    {
      name: "Shared Categories",
      type: "category_selection_dialog",
      info: "Command categories that shared users will be able to use.",
      get: (config) => config.Sharing?.SharedCategories,
      set: (config, value) => {
        config.Sharing.SharedCategories = value;
        return config;
      },
    },
    {
      name: "Shared Commands",
      type: "command_selection_dialog",
      info: "Individual commands that shared users will be able to use.",
      get: (config) => config.Sharing?.SharedCommands,
      set: (config, value) => {
        config.Sharing.SharedCommands = value;
        return config;
      },
    },
  ],
  serverProtections: [
    {
      name: "Anti Delete",
      type: "switch",
      info: "Get notified when a message is deleted in protected servers.",
      get: (config) => config.Protections?.ServerProtections?.AntiDelete,
      set: (config, value) => {
        config.Protections.ServerProtections.AntiDelete = value;
        return config;
      },
    },
    {
      name: "Anti Invite",
      type: "switch",
      info: "Deletes invites sent by users in protected servers.",
      get: (config) => config.Protections?.ServerProtections?.AntiInvite,
      set: (config, value) => {
        config.Protections.ServerProtections.AntiInvite = value;
        return config;
      },
    },
    {
      name: "Anti Spam",
      type: "switch",
      info: "Stops users from spamming messages in protected servers.",
      get: (config) => config.Protections?.ServerProtections?.AntiSpam,
      set: (config, value) => {
        config.Protections.ServerProtections.AntiSpam = value;
        return config;
      },
    },
    {
      name: "Anti Upper",
      type: "switch",
      info: "Stops users from only using uppercase letters in protected servers.",
      get: (config) => config.Protections?.ServerProtections?.AntiUpper,
      set: (config, value) => {
        config.Protections.ServerProtections.AntiUpper = value;
        return config;
      },
    },
  ],
};
