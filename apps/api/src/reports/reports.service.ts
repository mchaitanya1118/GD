import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private escapeCsv(val: any): string {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  }

  async exportPayrollCsv(tenantId: string, month: number, year: number) {
    const slips = await this.prisma.payslip.findMany({
      where: { tenantId, month, year },
      include: { rider: true },
    });

    const headers = [
      'Rider ID', 'Rider Name', 'Vehicle Type', 'Single Orders', 'Double Orders',
      'Gross Amount', 'Bonus', 'Deductions', 'Sales Cash', 'Car Rent',
      'Akama', 'Fine', 'Bank Deduction', 'Net Total', 'Status'
    ];

    const rows = slips.map(s => [
      s.rider.riderId,
      s.rider.riderName,
      s.rider.vehicleType,
      s.totalSingleOrders,
      s.totalDoubleOrders,
      s.grossAmount,
      s.bonus,
      s.deductions,
      s.salesCash,
      s.carRent,
      s.akama,
      s.fine,
      s.bankDeduction,
      s.netTotal,
      s.status
    ]);

    const csvContent = [
      headers.map(h => this.escapeCsv(h)).join(','),
      ...rows.map(row => row.map(cell => this.escapeCsv(cell)).join(','))
    ].join('\n');

    return csvContent;
  }

  async exportRidersCsv(tenantId: string) {
    const riders = await this.prisma.rider.findMany({
      where: { tenantId },
    });

    const headers = ['Rider ID', 'Rider Name', 'Vehicle Type', 'Rate Type', 'Company Code', 'Created At'];
    
    const rows = riders.map(r => [
      r.riderId,
      r.riderName,
      r.vehicleType,
      r.rateType,
      r.companyCode || '',
      r.createdAt.toISOString()
    ]);

    const csvContent = [
      headers.map(h => this.escapeCsv(h)).join(','),
      ...rows.map(row => row.map(cell => this.escapeCsv(cell)).join(','))
    ].join('\n');

    return csvContent;
  }
}
