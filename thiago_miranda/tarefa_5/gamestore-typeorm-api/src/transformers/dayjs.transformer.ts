import timezone from 'dayjs/plugin/timezone';
import { ValueTransformer } from 'typeorm';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('pt-br');

dayjs.tz.setDefault('America/Sao_Paulo');

export class DayJsTransformer implements ValueTransformer {
  constructor(private readonly format: string = 'YYYY-MM-DD HH:MM') {}

  from(value: string | Date | null): Date | null {
    if (!value) return null;
    return dayjs.tz(value, this.format, 'America/Sao_Paulo').toDate();
  }

  to(value: Date | null): string | null {
    if (!value) return null;
    return dayjs.tz(value, 'America/Sao_Paulo').format(this.format);
  }
}
