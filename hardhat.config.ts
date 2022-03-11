import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
  // accountsBalance: "990000000000000000000",
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.10",

  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    only: ["StakingToken", "RewardToken", "StakingRewards"],
    // except: []
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      gasPrice: 6 * 1000000000,
      chainId: 1,
    },

    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
};

export default config;

/**
 npx hardhat verify --network rinkeby --contract contracts/RewardToken.sol:RewardToken 0x209e679A7cd10B50b1568BB5a2FB3c7B0A4D70f6 "0000000000000000000000000000000000000000000000000000000000000064"
 npx hardhat verify --network rinkeby --contract contracts/StakingToken.sol:StakingToken 0x278645aa6590E960fb2F263d26e094BBed376C10 "00000000000000000000000000000000000000000000d3c21bcecceda1000000"
 npx hardhat verify --network rinkeby --contract contracts/StakingRewards.sol:StakingRewards 0x2E03A09d7d165D5A9e144691E9Bc02526B70C33e 0x9174642f38441F1F99203Ea04d55521b1e9b857a 0xaEE1c602cc640af5d1357A2F36378A0D6Fd6e050


 deploy
 verify if need

*/
