import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MenuComponent, BaseChartDirective, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'line'> | undefined;
  public barChartType = 'line' as const;
  public barChartData: ChartData<'line'> = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        label: 'Series A',
      },
    ],
  };

  constructor(private backendService: BackendService) {
    backendService.ordenes.getOrdenes().then((ordenes) => {
      console.log(ordenes);
    });
  }
}
