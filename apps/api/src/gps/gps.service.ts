import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GpsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateLocation(riderId: string, lat: number, lng: number) {
    const timestamp = new Date();
    
    // 1. Update current rider location (atomic summary)
    await this.prisma.rider.update({
      where: { id: riderId },
      data: {
        lastLat: lat,
        lastLng: lng,
        lastLocationUpdate: timestamp,
      }
    });

    // 2. Append to history log
    return this.prisma.riderLocation.create({
      data: {
        riderId,
        lat,
        lng,
        timestamp,
      }
    });
  }

  async getActiveLocations(tenantId: string) {
    // Only return riders who have at least one location update
    return this.prisma.rider.findMany({
      where: {
        tenantId,
        lastLat: { not: null },
        lastLng: { not: null },
      },
      select: {
        id: true,
        riderId: true,
        riderName: true,
        lastLat: true,
        lastLng: true,
        lastLocationUpdate: true,
        status: true,
        vehicleType: true,
      }
    });
  }
}
