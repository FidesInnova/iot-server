import { log } from 'console';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user/user.service';
import { SendNotificationRequestBodyDto } from '../dto/send-notif-dto';
import firebase from 'firebase-admin';

import * as serviceAccount from '../../../fidesinnova-aa633-firebase-adminsdk-utzec-ac7cc3e00e.json';
import { NotificationRepository } from './notification.repository';
import { AddNotificationRequestBodyDto } from '../dto/notification.dto';
import { NotificationSchema } from './notification.schema';

@Injectable()
export class NotificationService {
  firebaseApp: firebase.app.App;

  constructor(
    @Inject(UserService)
    private userService?: UserService,
    private notificationRepository?: NotificationRepository,
  ) {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount as any),
    });
  }

  getNotificationKeys(): string[] {
    return Object.keys(NotificationSchema.paths);
  }

  sendToken(token: string, userId: string) {
    return this.userService.setFirebaseToken(userId, token);
  }

  async sendNotification(notification: SendNotificationRequestBodyDto) {
    const user = await this.userService.getUserFirebaseTokenById(
      notification.user,
    );
    if (!user) throw new BadRequestException(undefined, 'user not found');
    const firebaseToken = user.firebaseToken;
    if (!firebaseToken)
      throw new BadRequestException(undefined, 'user has no firebase token');

    try {
      await firebase.messaging(this.firebaseApp).send({
        token: firebaseToken,
        notification: {
          title: notification.title,
          body: notification.message,
        },
      });
      return 'notification send';
    } catch (err) {
      console.log(err);

      throw new BadRequestException(undefined, err.message);
    }
  }

  async addNotificationForUserById(
    data: AddNotificationRequestBodyDto,
    insertedBy: string,
  ) {
    const insertData = {
      ...data,
      insertDate: new Date(),
      insertedBy: insertedBy,
    };

    return this.notificationRepository.insertNotif(insertData);
  }

  async getUserNotificationUserById(userId: string) {
    return this.notificationRepository.getNotSeenNotificationsForUserById(
      userId,
    );
  }

  /* async seenNotificationByUserIdAndNotificationIds(userId: string, notifList: string[]) {
    return this.notificationRepository.
  } */

}
