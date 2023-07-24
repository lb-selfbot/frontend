export const osOptions = [
  { label: "Windows", value: "windows" },
  { label: "Linux", value: "linux" },
  { label: "macOS", value: "macos" },
];

export const osInfo = "Select your computer's operating system.";

export const archOptions = {
  windows: [
    { label: "amd64 (64-bit)", value: "amd64" },
    { label: "386 (32-bit)", value: "386" },
  ],
  linux: [
    { label: "amd64 (64-bit)", value: "amd64" },
    { label: "386 (32-bit)", value: "386" },
    { label: "arm64 (64-bit)", value: "arm64" },
    { label: "arm (32-bit)", value: "arm" },
  ],
  macos: [{ label: "Intel/Apple Silicon", value: "amd/arm" }],
};

const mutualArchInfo = "Select your CPU's architecture. ";

export const archInfo = {
  windows:
    mutualArchInfo +
    "If your Windows PC is 64-bit, choose amd64. If it is 32-bit, choose 386.",
  linux:
    mutualArchInfo +
    "If your Linux computer has an ARM chip, choose either arm or arm64. If it uses X86 or X86-64, choose 386 or amd64 respectively.",
  macos:
    "Both Intel and Apple Silicon Macs can use the same file as both architectures are combined into one file.",
};

export const typeOptions = {
  windows: [
    { label: "With UI", value: "ui" },
    { label: "With Console", value: "selfbot" },
  ],
  linux: [
    { label: "With UI", value: "ui" },
    { label: "With Console", value: "selfbot" },
  ],
  macos: [
    { label: "With UI", value: "ui" },
    { label: "With Console", value: "selfbot" },
  ],
};
export const typeInfo = "Select what type of download you want.";
