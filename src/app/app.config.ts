import { SchedulerConfig } from '@bryntum/scheduler';

export const schedulerConfig: Partial<SchedulerConfig> = {
  columns : [
    { text : 'Materiel', field : 'name', width : 160 }
  ],
  startDate : new Date(2024, 2, 20, 6),
  endDate   : new Date(2024, 2, 27, 20),
  viewPreset: 'dayAndMonth',
};
