import { Controller, Get, Query, UseGuards, Request, Response } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('payroll/export')
  async exportPayroll(
    @Request() req: any,
    @Query('month') month: string,
    @Query('year') year: string,
    @Response() res: any,
  ) {
    const csv = await this.reportsService.exportPayrollCsv(
      req.user.tenantId,
      parseInt(month),
      parseInt(year),
    );
    
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="payroll_${month}_${year}.csv"`,
    });
    
    res.send(csv);
  }

  @Get('riders/export')
  async exportRiders(@Request() req: any, @Response() res: any) {
    const csv = await this.reportsService.exportRidersCsv(req.user.tenantId);
    
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="riders_directory.csv"',
    });
    
    res.send(csv);
  }
}
