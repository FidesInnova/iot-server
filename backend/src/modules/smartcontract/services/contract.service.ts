import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractData from '../contract-data';
import { GeneralException } from 'src/modules/utility/exceptions/general.exception';
import { ErrorTypeEnum } from 'src/modules/utility/enums/error-type.enum';
import { DeviceService } from 'src/modules/device/services/device.service';
import { ServiceService } from 'src/modules/service/services/service.service';

function parseProofString(proofString) {
  let cleanedString = proofString.substring(1, proofString.length - 1);
  let sections = cleanedString.split('],[');
  return sections.map((section) => {
    section = section.replace(/^\[|\]$/g, '');
    return section.split(',').map((item) => item.trim().replace(/^'|'$/g, ''));
  });
}

@Injectable()
export class ContractService {
  private readonly rpcUrl = 'https://fidesf1-rpc.fidesinnova.io';
  private readonly chainId = 706883;
  private readonly faucetAmount = 5;
  private readonly minFaucetAmount = 0.5;
  private lastRequestTime = {};
  private provider: any;
  private faucetWallet: any;
  private adminWallet: any;
  private contracts = {
    zkp: null,
    serviceDevice: null,
  };

  constructor(
    @Inject(forwardRef(() => DeviceService))
    private readonly deviceService?: DeviceService,
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService?: ServiceService,
  ) {
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl, {
      name: 'FidesInnova',
      chainId: this.chainId,
    });

    this.faucetWallet = new ethers.Wallet(
      process.env.FAUCET_WALLET_PRIVATE_KEY,
      this.provider,
    );

    this.adminWallet = new ethers.Wallet(
      process.env.ADMIN_WALLET_PRIVATE_KEY,
      this.provider,
    );

    this.contracts.zkp = new ethers.Contract(
      contractData.zkpContractAddress,
      contractData.zkpContractABI,
      this.adminWallet,
    );

    this.contracts.serviceDevice = new ethers.Contract(
      contractData.serviceDeviceContractAddress,
      contractData.serviceDeviceContractABI,
      this.adminWallet,
    );

    this.contracts.serviceDevice.on('ServiceCreated', async (id, service) => {
      let newService = {
        nodeId: service[0],
        nodeServiceId: service[1],
        userId: service[1],
        serviceName: service[2],
        description: service[3],
        serviceImage: service[8],
        serviceType: service[4],
        installationPrice: service[6],
        runningPrice: service[7],
        status: 'tested',
        blocklyJson: '',
        code: service[9],
        devices: service[5],
        insertDate: service[10],
        updateDate: service[11],
        published: true,
      };

      try {
        const createService = await this.serviceService.insertService(
          newService,
        );
      } catch (error) {
        console.log(error);
      }
    });

    this.contracts.serviceDevice.on('ServiceRemoved', async (id, service) => {
      console.log(`${service[0]} , ${service[1]}`);

      try {
        await this.serviceService.deleteServiceByNodeServiceIdAndNodeId(
          service[0],
          service[1],
        );
      } catch (error) {
        console.log(error);
      }
    });

    this.contracts.serviceDevice.on('DeviceCreated', (id, device) => {
      let newDevice = {
        nodeId: device[0],
        nodeDeviceId: device[1],
        userId: device[2],
        isShared: true,
        deviceName: device[3],
        deviceType: device[4],
        deviceEncryptedId: device[5],
        hardwareVersion: device[6],
        firmwareVersion: device[7],
        parameters: device[8],
        costOfUse: device[9],
        location: { coordinates: device[10] },
        insertDate: device[11],
        updateDate: device[11],
      };

      this.deviceService.insertDevice(newDevice);
    });

    this.contracts.serviceDevice.on('DeviceRemoved', (id, device) => {
      this.deviceService.deleteOtherNodeDeviceByNodeIdAndDeviceId(
        device[0],
        device[1],
        device[5],
      );
    });
  }

  formatBigInt(bigIntValue: bigint): number {
    let strValue = bigIntValue.toString().replace(/0+$/, '');
    let formattedValue = strValue.slice(0, 1) + '.' + strValue.slice(1, 8);
    return parseFloat(formattedValue);
  }

  async getWalletBalance(walletAddress: string) {
    try {
      const res = await this.provider.getBalance(walletAddress);
      return this.formatBigInt(res);
    } catch (error) {
      throw new GeneralException(
        ErrorTypeEnum.UNPROCESSABLE_ENTITY,
        `Wallet address is not valid !`,
      );
    }
  }

  async requestFaucet(walletAddress: string): Promise<string> {
    const currentTime = Date.now();
    const twentyFourHours = 1000 * 24 * 60 * 60;

    if (
      this.lastRequestTime[walletAddress] &&
      currentTime - this.lastRequestTime[walletAddress] < twentyFourHours
    ) {
      throw new GeneralException(
        ErrorTypeEnum.FORBIDDEN,
        `You can only use the faucet once every 24 hours.`,
      );
    }

    this.lastRequestTime[walletAddress] = currentTime;

    const balance = this.formatBigInt(
      await this.provider.getBalance(walletAddress),
    );

    if (balance < this.faucetAmount) {
      const amountToSend = this.faucetAmount - balance;

      if (amountToSend < this.minFaucetAmount) {
        throw new GeneralException(
          ErrorTypeEnum.UNPROCESSABLE_ENTITY,
          `Minimum amount for faucet is ${this.minFaucetAmount}`,
        );
      }

      try {
        const tx = await this.faucetWallet.sendTransaction({
          to: walletAddress,
          value: ethers.parseUnits(amountToSend.toString(), 'ether'),
        });

        await tx.wait();
      } catch (error) {
        throw new GeneralException(
          ErrorTypeEnum.NOT_FOUND,
          'Wallet address is not valid !',
        );
      }

      return `Success: Topped up ${amountToSend} FDS to ${walletAddress}.`;
    }

    return `No action needed: ${walletAddress} already has a balance of ${this.faucetAmount} FDS or more.`;
  }

  async shareDevice(
    nodeId: string,
    deviceId: string,
    ownerId: string,
    name: string,
    deviceType: string,
    encryptedID: string,
    hardwareVersion: string,
    firmwareVersion: string,
    parameters: Array<string>,
    useCost: string,
    locationGPS: Array<string>,
    installationDate: string,
  ) {
    return this.contracts.serviceDevice.createDevice(
      nodeId,
      deviceId,
      ownerId,
      name,
      deviceType,
      encryptedID,
      hardwareVersion,
      firmwareVersion,
      parameters,
      useCost,
      locationGPS,
      installationDate,
    );
  }

  async removeSharedDevice(nodeId: string, deviceId: string) {
    return this.contracts.serviceDevice.removeDevice(nodeId, deviceId);
  }

  async createService(
    nodeId: string,
    serviceId: string,
    name: string,
    description: string,
    serviceType: string,
    devices: string,
    installationPrice: string,
    executionPrice: string,
    imageURL: string,
    program: string,
    creationDate: string,
    publishedDate: string,
  ) {
    return this.contracts.serviceDevice.createService(
      nodeId,
      serviceId,
      name,
      description,
      serviceType,
      devices,
      installationPrice,
      executionPrice,
      imageURL,
      program,
      creationDate,
      publishedDate,
    );
  }

  async removeService(nodeId: string, serviceId: string) {
    return this.contracts.serviceDevice.removeService(nodeId, serviceId);
  }

  async fetchAllDevices() {
    return this.contracts.serviceDevice.fetchAllDevices();
  }

  async fetchAllServices() {
    return this.contracts.serviceDevice.fetchAllServices();
  }

  async zpkProof(proofString: string): Promise<boolean> {
    try {
      const proofSlices = parseProofString(proofString);
      const result = await this.contracts.zkp.verifyProof(
        proofSlices[0],
        [proofSlices[1], proofSlices[2]],
        proofSlices[3],
        proofSlices[4],
      );
      return result;
    } catch (error) {
      console.error('Error calling verifyProof:', error);
      return false;
    }
  }
}
