import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Message Test", () => {
  const deployMessageFixture = async () => {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Message = await hre.ethers.getContractFactory("Message");
    const message = await Message.deploy();

    return { message, owner, otherAccount };
  };

  describe("Deployment", () => {
    it("should check if it is deployed", async () => {
      const { message, owner } = await loadFixture(deployMessageFixture);

      expect(await message.owner()).to.equal(owner);
    });

    it("should be able to send message if it is the owner", async () => {
      const { message, owner } = await loadFixture(deployMessageFixture);

      const msg = "Hello Wolrd";

      await message.connect(owner).setMessage(msg);

      expect(await message.getMessage()).to.equal(msg);
    });

    it("should not be able to send message, if not the owner", async () => {
      const { message, otherAccount } = await loadFixture(deployMessageFixture);

      const msg = "Hello Wolrd";

      await expect(
        message.connect(otherAccount).setMessage(msg)
      ).to.be.revertedWith("You are not the owner");
    });

    it("should be able to transfer the ownership", async () => {
      const { owner, otherAccount, message } = await loadFixture(
        deployMessageFixture
      );

      await message.connect(owner).transferOwnership(otherAccount);

      expect(await message.owner()).to.equal(otherAccount);
    });

    it("check if you are not the owner, you cant transfer the ownership", async () => {
      const { otherAccount, message } = await loadFixture(
        deployMessageFixture
      );

      await expect(
        message.connect(otherAccount).transferOwnership(otherAccount)
      ).to.be.revertedWith("You are not the owner");
    });
  });
});
