export const faqAnswers = {
  General: {
    "What is a selfbot?":
      "A selfbot is a bot that runs under the user account. " +
      "It is like a user's personal assistant that responds to their command inputs to perform different tasks. " +
      "The main objective of self bot is to make things easier for the users by doing small things such as posting " +
      "messages, changing user’s avatar and status, etc., on their behalf.",
    "What is a Discord token and how do I get one?":
      "A Discord token is a unique code that is used to authenticate a Discord account. " +
      "It's sent to Discord when you log in so Discord knows you're the owner of the account. " +
      "Keep your Discord token private, as other people will be able to login to your account using it. " +
      "Your Discord token is only saved on your own computer and never shared with us. " +
      '<a href="https://youtu.be/1dva3YqBI2E?t=57" target="_blank" rel="noreferrer" class="faqLink">Click here</a> to learn how to get your Discord token.',
    "Can I test LightningBot before buying it?":
      "Yes! We offer everyone a free trial so you can test LightningBot yourself for 7 days instead of relying on our words. Your free trial will be activated automatically after creating an account. Please refer to our Terms of Service for more information.",
    "Is there a list of commands?":
      "You can see all commands by typing <code>[p]help</code> in any server or DM. Make sure to replace <code>[p]</code> with your own prefix. Your prefix will be an exclamation mark (<code>!</code>) by default.",
    "Where does LightningBot store data?":
      "Previously, all files were located in your Documents folder. With the switch to multi-platform, we had to make some changes to the data location. " +
      "The files are now located in your user config directory:\n" +
      "<ul>" +
      "  <li>Windows: <code>%AppData%\\LightningBot</code></li>" +
      "  <li>MacOS: <code>~/Library/Application Support/LightningBot</code></li>" +
      "  <li>Linux: <code>$XDG_CONFIG_HOME/LightningBot</code> or <code>~/.config/LightningBot</code></li>" +
      "</ul>",
  },
  Troubleshooting: {
    'How do I fix "LightningBot can\'t be opened because Apple cannot check it for malicious software"?':
      "You can fix this issue by opening System Preferences > Security & Privacy > General and clicking the Open Anyway button. " +
      "The warning will reappear and you can press the Open button to open LightningBot.",
  },
};
