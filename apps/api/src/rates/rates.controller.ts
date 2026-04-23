import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { RatesService } from './rates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.ratesService.findAll(req.user.tenantId);
  }

  @Post()
  async upsert(@Request() req: any, @Body() body: any) {
    return this.ratesService.upsert(req.user.tenantId, body);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    return this.ratesService.remove(req.user.tenantId, id);
  }
}
