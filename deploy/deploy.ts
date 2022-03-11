import { ethers } from "hardhat";

module.exports = async function ({}) {
  console.log("Deploying via Deploy.ts : ");

  const StakingTokenInitialSupply = ethers.utils.parseUnits("1.0", 27); // billion
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy(StakingTokenInitialSupply);

  console.log("StakingToken Address: ", stakingToken.address);

  const RewardTokenInitialSupply = ethers.utils.parseUnits("1", 27); // billion
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(RewardTokenInitialSupply);
  const rewardTokenDeployed = await rewardToken.deployed();
  console.log("RewardToken Address: ", rewardToken.address);

  const StakingRewards = await ethers.getContractFactory("StakingRewards");
  const stakingRewards = await StakingRewards.deploy(
    stakingToken.address,
    rewardToken.address
  );
  console.log("StakingRewards Address: ", stakingRewards.address);

  console.log("Sending RewardTokens to Staking Contract from me ");
  await rewardTokenDeployed.transfer(
    stakingRewards.address,
    RewardTokenInitialSupply
  );

  console.log("Everything Done!");
};
module.exports.tags = ["deploy"];
