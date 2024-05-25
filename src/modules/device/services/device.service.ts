import { Inject, Injectable, forwardRef } from '@nestjs/common';
import mongoose from 'mongoose';
import { DeviceRepository } from '../repositories/device.repository';
import * as randompassword from 'secure-random-password';
import { GereralException } from 'src/modules/utility/exceptions/general.exception';
import { ErrorTypeEnum } from 'src/modules/utility/enums/error-type.enum';
import { UserService } from 'src/modules/user/services/user/user.service';
import { DeviceLogService } from './device-log.service';
import { EditDeviceDto } from '../data-transfer-objects/edit-device.dto';

// Nodejs encryption with CTR
let crypto = require('crypto');
let algorithm = 'aes-256-ctr';
let defaultEncryptionPassword = 'SDfsae4d6F3Efeq';
const initializationVector = '5183666c72eec9e4';

/**
 * Device manipulation service.
 */

@Injectable()
export class DeviceService {
  private result;

  constructor(
    @Inject(forwardRef(() => UserService)) // For avoid circular dependency
    private readonly userService?: UserService,
    @Inject(forwardRef(() => DeviceLogService)) // For avoid circular dependency
    private readonly deviceLogService?: DeviceLogService,
    private readonly deviceRepository?: DeviceRepository,
  ) {}

  async generatePassword(len) {
    return randompassword.randomPassword({
      length: len,
      characters:
        randompassword.lower +
        randompassword.upper +
        randompassword.digits +
        '^&*()',
    });
  }

  encryptDeviceId(deviceId) {
    console.log('deviceId: ', deviceId);
    let cipher = crypto.createCipher(algorithm, defaultEncryptionPassword);
    console.log('cipher: ', cipher);
    let encrypted = cipher.update(deviceId, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    encrypted = encrypted.replace(/\//g, '~').replace(/\+/g, '_');
    return encrypted;
  }

  decryptDeviceId(encryptedDeviceId) {
    encryptedDeviceId = encryptedDeviceId.replace(/_/g, '+').replace(/~/g, '/');
    let decipher = crypto.createDecipheriv(
      algorithm,
      defaultEncryptionPassword,
      initializationVector,
    );
    let decrypted = decipher.update(encryptedDeviceId, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    // console.log('decryptid', text, dec);
    return decrypted;
  }

  async insertDevice(body) {
    let deviceEncryptedId = Buffer.from(body.mac, 'utf8').toString('base64');

    let newDevice = {
      userId: body.userId,
      deviceName: body.deviceName,
      password: await this.generatePassword(20),
      deviceType: body.deviceType,
      mac: body.mac,
      deviceEncryptedId: deviceEncryptedId,
      parameters: body.parameters,
      location: body.location,
      geometry: body.geometry,
      insertedBy: body.userId,
      insertDate: new Date(),
      updatedBy: body.userId,
      updateDate: new Date(),
    };

    let insertedDevice = await this.deviceRepository.insertDevice(newDevice);
    console.log('User device inserted!');
    return insertedDevice;
  }

  async getDevicesByUserId(userId) {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      'isDeleted userId deviceName deviceType mac deviceEncryptedId hardwareVersion firmwareVersion parameters isShared costOfUse location geometry insertedBy insertDate updatedBy updateDate';
    let foundDevices: any = null;

    console.log('we are in getDeviceByUserId service!');

    foundDevices = await this.deviceRepository.getDevicesByUserId(
      userId,
      whereCondition,
      populateCondition,
      selectCondition,
    );

    console.log('Found devices are: ', foundDevices);

    return foundDevices;
  }

  async getDevicesWithEncryptedDeviceIdByUserId(userId) {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      'isDeleted userId deviceName deviceEncryptedId deviceType mac hardwareVersion firmwareVersion parameters isShared costOfUse location geometry insertedBy insertDate updatedBy updateDate';
    let foundDevices: any = null;
    let foundDevicesWithEncryptedDeviceId = [];
    let encryptedDeviceId;

    console.log('we are in getDeviceByUserId service!');

    foundDevices = await this.deviceRepository.getDevicesByUserId(
      userId,
      whereCondition,
      populateCondition,
      selectCondition,
    );

    console.log('Found devices are: ', foundDevices);

    foundDevices.forEach((element) => {
      encryptedDeviceId = this.encryptDeviceId(element._id.toString());
      console.log('encryptedDeviceId is: ', encryptedDeviceId);
      foundDevicesWithEncryptedDeviceId.push({
        _id: element._id,
        encryptedId: encryptedDeviceId,
        isDeleted: element.isDeleted,
        userId: element.userId,
        deviceName: element.deviceName,
        deviceType: element.deviceType,
        mac: element.mac,
        installationDate: element.insertDate,
        updateDate: element.updateDate,
      });
    });
    console.log(
      'foundDevicesWithEncryptedDeviceId are: ',
      foundDevicesWithEncryptedDeviceId,
    );

    return foundDevicesWithEncryptedDeviceId;
  }

  async getDeviceById(deviceId) {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      '_id isDeleted userId deviceName deviceEncryptedId deviceType mac hardwareVersion firmwareVersion parameters isShared costOfUse location geometry insertedBy insertDate updatedBy updateDate';
    let foundDevice: any = null;

    // if (ObjectID.isValid(deviceId)){
    if (mongoose.isValidObjectId(deviceId)) {
      await this.deviceRepository
        .getDeviceById(
          deviceId,
          whereCondition,
          populateCondition,
          selectCondition,
        )
        .then((data) => {
          foundDevice = data;
        })
        .catch((error) => {
          let errorMessage = 'Some errors occurred while finding a device!';
          throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
        });
    }

    return foundDevice;
  }

  async findADeviceByMac(
    mac,
    whereCondition,
    populateCondition,
    selectCondition,
  ) {
    return await this.deviceRepository.findDeviceByMac(
      mac,
      whereCondition,
      populateCondition,
      selectCondition,
    );
  }

  async getInstalledDevicesByDate(
    installationYear,
    installationMonth,
    installationDay,
  ) {
    let startDate = new Date(
      installationYear,
      installationMonth - 1,
      installationDay,
    );
    let endDate = new Date(
      installationYear,
      installationMonth - 1,
      installationDay,
    );
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    let foundDevices: any = null;
    let formatedFoundDevices;

    let query = {
      isDeleted: false,
      insertDate: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    console.log(query);

    await this.deviceRepository
      .getInstalledDevicesByDate(query)
      .then(async (data) => {
        foundDevices = data;

        formatedFoundDevices = [];

        for (const element of foundDevices) {
          let foundUser;
          await this.userService
            .findAUserById(element.userId)
            .then((data) => {
              foundUser = data;

              formatedFoundDevices.push({
                _id: element._id,
                deviceEncryptedId: element.deviceEncryptedId,
                mac: element.mac,
                deviceName: element.deviceName,
                deviceType: element.deviceType,
                userId: element.userId,
                walletAddress: foundUser.walletAddress
                  ? foundUser.walletAddress
                  : null,
                insertDate: element.insertDate,
              });
            })
            .catch((error) => {
              let errorMessage =
                'Some errors occurred while finding user for installed devices!';
              throw new GereralException(ErrorTypeEnum.NOT_FOUND, error);
            });
        }
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while finding installed devices!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    console.log('formatedFoundDevices are: ', formatedFoundDevices);
    return formatedFoundDevices;
  }

  async getNumberOfPayloadsSentByDevicesByDate(
    reportYear,
    reportMonth,
    reportDay,
  ) {
    let startDate = new Date(reportYear, reportMonth - 1, reportDay);
    let endDate = new Date(reportYear, reportMonth - 1, reportDay);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);

    let foundDevices: any = null;
    let formatedFoundDevices;

    let query = {
      isDeleted: false,
    };

    console.log(query);

    await this.deviceRepository
      .getAllActiveDevices(query)
      .then(async (data) => {
        foundDevices = data;

        formatedFoundDevices = [];

        for (const element of foundDevices) {
          let foundUser;
          await this.userService
            .findAUserById(element.userId)
            .then((data) => {
              foundUser = data;

              formatedFoundDevices.push({
                _id: element._id,
                deviceEncryptedId: element.deviceEncryptedId,
                mac: element.mac,
                deviceName: element.deviceName,
                deviceType: element.deviceType,
                userId: element.userId,
                walletAddress: foundUser.walletAddress
                  ? foundUser.walletAddress
                  : null,
                payloadsSent: 0,
                insertDate: element.insertDate,
              });
            })
            .catch((error) => {
              let errorMessage =
                'Some errors occurred while finding user for installed active devices!';
              throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
            });
        }
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while finding installed active devices!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    console.log('formatedFoundDevices are: ', formatedFoundDevices);

    for (const element of formatedFoundDevices) {
      let foundDeviceLog;
      await this.deviceLogService
        .getDeviceLogByEncryptedDeviceIdAndDate(
          element.deviceEncryptedId,
          reportYear,
          reportMonth,
          reportDay,
        )
        .then((data) => {
          foundDeviceLog = data;

          console.log('foundDeviceLog: ', foundDeviceLog);

          element.payloadsSent = foundDeviceLog.length;
          console.log('foundDeviceLog.length: ', foundDeviceLog.length);
        })
        .catch((error) => {
          let errorMessage =
            'Some errors occurred while finding logs for installed active devices!';
          throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
        });
    }

    return formatedFoundDevices;
  }

  async checkDeviceIsExist(deviceMac) {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      'isDeleted userId deviceName deviceEncryptedId deviceType mac insertedBy insertDate updatedBy updateDate';
    let foundDevice = null;

    console.log('I am in checkDeviceIsExist!');

    foundDevice = await this.findADeviceByMac(
      deviceMac,
      whereCondition,
      populateCondition,
      selectCondition,
    );

    if (foundDevice) {
      console.log('Device found!');
      return true;
    } else {
      console.log('Device not found!');
      throw new GereralException(
        ErrorTypeEnum.NOT_FOUND,
        'Device does not exist.',
      );
      // return false
    }
  }

  async editDevice(body: EditDeviceDto, userId: any) {
    let whereCondition = { _id: body.deviceId };
    let populateCondition = [];
    let selectCondition =
      '_id isDeleted userId deviceName deviceEncryptedId deviceType mac hardwareVersion firmwareVersion isShared costOfUse location geometry insertedBy insertDate updatedBy updateDate';
    let foundDevice: any = null;

    console.log('we are in editDevice service!');

    await this.deviceRepository
      .getDeviceById(
        body.deviceId,
        whereCondition,
        populateCondition,
        selectCondition,
      )
      .then((data) => {
        foundDevice = data;
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while finding a device for rename!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    // if(foundDevice && foundDevice !== undefined && foundDevice.deletable){
    if (foundDevice && foundDevice !== undefined) {
      foundDevice.updatedBy = userId;
      foundDevice.updateDate = new Date();
    }

    console.log('Updated found device for edit is: ', foundDevice);
    await this.deviceRepository
      .editDevice(foundDevice._id, body)
      .then((data) => {
        this.result = data;
      })
      .catch((error) => {
        let errorMessage = 'Some errors occurred while editing a device!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    return this.result;
  }

  async renameDevice(body, userId): Promise<any> {
    let whereCondition = { _id: body.deviceId };
    let populateCondition = [];
    let selectCondition =
      '_id isDeleted userId deviceName deviceEncryptedId deviceType mac insertedBy insertDate updatedBy updateDate';
    let foundDevice: any = null;

    console.log('we are in renameDevice service!');

    await this.deviceRepository
      .getDeviceById(
        body.deviceId,
        whereCondition,
        populateCondition,
        selectCondition,
      )
      .then((data) => {
        foundDevice = data;
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while finding a device for rename!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    // if(foundDevice && foundDevice !== undefined && foundDevice.deletable){
    if (foundDevice && foundDevice !== undefined) {
      foundDevice.deviceName = body.deviceName;
      foundDevice.updatedBy = userId;
      foundDevice.updateDate = new Date();
    }

    console.log('Updated found device for rename is: ', foundDevice);

    await this.deviceRepository
      .editDevice(foundDevice._id, foundDevice)
      .then((data) => {
        this.result = data;
      })
      .catch((error) => {
        let errorMessage = 'Some errors occurred while renaming a device!';
        throw new GereralException(
          ErrorTypeEnum.UNPROCESSABLE_ENTITY,
          errorMessage,
        );
      });

    return this.result;
  }

  async getAllSharedDevices() {
    let whereCondition = { isDeleted: false, isShared: true };
    let populateCondition = [];
    let selectCondition =
      'deviceName deviceType mac deviceEncryptedId hardwareVersion firmwareVersion parameters location geometry insertedBy insertDate isDeletable isDeleted deletedBy deleteDate deletionReason updatedBy updateDate';
    let foundDevices: any = null;
    let response = [];

    console.log('we are in getAllSharedDevices service!');

    foundDevices = await this.deviceRepository.getAllDevices(
      whereCondition,
      populateCondition,
      selectCondition,
    );

    console.log('Found devices are: ', foundDevices);

    foundDevices.forEach((element) => {
      response.push({
        _id: element._id,
        deviceName: element.deviceName,
        deviceType: element.deviceType,
        mac: element.mac,
        deviceEncryptedId: element.deviceEncryptedId,
        hardwareVersion: element.hardwareVersion,
        firmwareVersion: element.firmwareVersion,
        parameters: element.parameters,
        location: element.location,
        geometry: element.geometry,
        insertedBy: element.insertedBy,
        insertDate: element.insertDate,
      });
    });
    console.log('response are: ', response);

    return response;
  }

  async getAllDevices() {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      '_id deviceName deviceType mac deviceEncryptedId hardwareVersion firmwareVersion parameters isShared location geometry insertedBy insertDate isDeletable isDeleted deletedBy deleteDate deletionReason updatedBy updateDate';
    let foundDevices: any = null;
    let response = [];

    console.log('we are in getAllDevices service!');

    foundDevices = await this.deviceRepository.getAllDevices(
      whereCondition,
      populateCondition,
      selectCondition,
    );

    console.log('Found devices are: ', foundDevices);

    foundDevices.forEach((element) => {
      response.push({
        _id: element._id,
        deviceName: element.deviceName,
        deviceType: element.deviceType,
        mac: element.mac,
        deviceEncryptedId: element.deviceEncryptedId,
        hardwareVersion: element.hardwareVersion,
        firmwareVersion: element.firmwareVersion,
        parameters: element.parameters,
        isShared: element.isShared,
        location: element.location,
        geometry: element.geometry,
      });
    });
    console.log('response are: ', response);

    return response;
  }

  async deleteDeviceByDeviceId(deviceId): Promise<any> {
    let whereCondition = { isDeleted: false };
    let populateCondition = [];
    let selectCondition =
      '_id isDeleted userId deviceName deviceEncryptedId deviceType mac insertedBy insertDate updatedBy updateDate';
    let foundDevice: any = null;

    await this.deviceRepository
      .getDeviceById(
        deviceId,
        whereCondition,
        populateCondition,
        selectCondition,
      )
      .then((data) => {
        foundDevice = data;
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while finding a device for deletion!';
        throw new GereralException(ErrorTypeEnum.NOT_FOUND, errorMessage);
      });

    // if(foundDevice && foundDevice !== undefined && foundDevice.deletable){
    if (foundDevice && foundDevice !== undefined) {
      foundDevice.isDeleted = true;
      foundDevice.RemoveTime = new Date();
      foundDevice.updatedAt = new Date();
    }

    console.log('Updated found device for deletion is: ', foundDevice);

    await this.deviceRepository
      .editDevice(foundDevice._id, foundDevice)
      .then((data) => {
        this.result = data;
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while editing and deleting a device!';
        throw new GereralException(
          ErrorTypeEnum.UNPROCESSABLE_ENTITY,
          errorMessage,
        );
      });

    return this.result;
  }

  async deleteAllUserDevicesPermanently(userId) {
    await this.deviceRepository
      .deleteAllUserDevicesPermanently(userId)
      .then((data) => {
        this.result = data;
      })
      .catch((error) => {
        let errorMessage =
          'Some errors occurred while deleting customer devices in device service!';
        throw new GereralException(
          ErrorTypeEnum.UNPROCESSABLE_ENTITY,
          errorMessage,
        );
      });

    return this.result;
  }
}
