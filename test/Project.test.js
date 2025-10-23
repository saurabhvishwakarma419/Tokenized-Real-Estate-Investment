
// test/Project.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Tokenized Real Estate Investment Platform", function () {
  // Fixture for deploying the contract
  async function deployContractFixture() {
    const [owner, treasury, investor1, investor2, investor3, propertyOwner] = await ethers.getSigners();

    const TokenizedRealEstate = await ethers.getContractFactory("Project");
    const contract = await TokenizedRealEstate.deploy(treasury.address);

    return { contract, owner, treasury, investor1, investor2, investor3, propertyOwner };
  }

  // Fixture for deploying contract with a property
  async function deployWithPropertyFixture() {
    const fixture = await deployContractFixture();
    const { contract, owner } = fixture;

    // Create a test property
    await contract.connect(owner).createProperty(
      "Test Property",
      "123 Test Street",
      "A test property for investment",
      ethers.parseEther("100"), // 100 ETH total value
      1000, // 1000 tokens
      ethers.parseEther("0.1") // 0.1 ETH minimum investment
    );

    return fixture;
  }

  describe("Deployment", function () {
    it("Should deploy with correct parameters", async function () {
      const { contract, owner, treasury } = await loadFixture(deployContractFixture);

      expect(await contract.owner()).to.equal(owner.address);
      expect(await contract.platformTreasury()).to.equal(treasury.address);
      expect(await contract.platformFeePercentage()).to.equal(250); // 2.5%
      expect(await contract.propertyCount()).to.equal(0);
      expect(await contract.totalInvestmentVolume()).to.equal(0);
    });

    it("Should not deploy with zero treasury address", async function () {
      const TokenizedRealEstate = await ethers.getContractFactory("Project");
      
      await expect(
        TokenizedRealEstate.deploy(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid treasury address");
    });
  });

  describe("Property Creation (Core Function 1)", function () {
    it("Should create a property successfully", async function () {
      const { contract, owner } = await loadFixture(deployContractFixture);

      const tx = await contract.connect(owner).createProperty(
        "Luxury Apartment",
        "New York City",
        "Premium downtown location",
        ethers.parseEther



