import { OnChanges, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TransactionStripped } from '../../interfaces/websocket.interface';
import { StateService } from '../../services/state.service';
import { VbytesPipe } from '../../shared/pipes/bytes-pipe/vbytes.pipe';
import { selectPowerOfTen } from '../../bitcoin.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fee-distribution-graph',
  templateUrl: './fee-distribution-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeeDistributionGraphComponent implements OnInit, OnChanges, OnDestroy {
  @Input() feeRange: number[];
  @Input() vsize: number;
  @Input() transactions: TransactionStripped[];
  @Input() height: number | string = 210;
  @Input() top: number | string = 20;
  @Input() right: number | string = 22;
  @Input() left: number | string = 30;
  @Input() numSamples: number = 200;
  @Input() numLabels: number = 10;

  simple: boolean = false;
  data: number[][];
  labelInterval: number = 50;

  rateUnitSub: Subscription;
  weightMode: boolean = false;
  mempoolVsizeFeesOptions: any;
  mempoolVsizeFeesInitOptions = {
    renderer: 'svg'
  };

  constructor(
    private stateService: StateService,
    private vbytesPipe: VbytesPipe,
  ) { }

  ngOnInit() {
    this.rateUnitSub = this.stateService.rateUnits$.subscribe(rateUnits => {
      this.weightMode = rateUnits === 'wu';
      if (this.data) {
        this.mountChart();
      }
    });
  }

  ngOnChanges(): void {
    this.simple = !!this.feeRange?.length;
    this.prepareChart();
    this.mountChart();
  }

  prepareChart(): void {
    if (this.simple) {
      this.data = this.feeRange.map((rate, index) => [index * 10, rate]);
      this.labelInterval = 1;
      return;
    }
    this.data = [];
    if (!this.transactions?.length) {
      return;
    }
    const samples = [];
    const txs = this.transactions.map(tx => { return { vsize: tx.vsize, rate: tx.rate || (tx.fee / tx.vsize) }; }).sort((a, b) => { return b.rate - a.rate; });
    const maxBlockVSize = this.stateService.env.BLOCK_WEIGHT_UNITS / 4;
    const sampleInterval = maxBlockVSize / this.numSamples;
    let cumVSize = 0;
    let sampleIndex = 0;
    let nextSample = 0;
    let txIndex = 0;
    this.labelInterval = this.numSamples / this.numLabels;
    while (nextSample <= maxBlockVSize) {
      if (txIndex >= txs.length) {
        samples.push([(1 - (sampleIndex / this.numSamples)) * 100, 0]);
        nextSample += sampleInterval;
        sampleIndex++;
        continue;
      }

      while (txs[txIndex] && nextSample < cumVSize + txs[txIndex].vsize) {
        samples.push([(1 - (sampleIndex / this.numSamples)) * 100, txs[txIndex].rate]);
        nextSample += sampleInterval;
        sampleIndex++;
      }
      cumVSize += txs[txIndex].vsize;
      txIndex++;
    }
    this.data = samples.reverse();
  }

  mountChart(): void {
    this.mempoolVsizeFeesOptions = {
      grid: {
        height: '210',
        right: '20',
        top: '22',
        left: '40',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '% Weight',
        nameLocation: 'middle',
        nameGap: 0,
        nameTextStyle: {
          verticalAlign: 'top',
          padding: [30, 0, 0, 0],
        },
        axisLabel: {
          interval: (index: number): boolean => { return index && (index % this.labelInterval === 0); },
          formatter: (value: number): string => { return Number(value).toFixed(0); },
        },
        axisTick: {
          interval: (index:number): boolean => { return (index % this.labelInterval === 0); },
        },
      },
      yAxis: {
        type: 'value',
        // name: 'Effective Fee Rate s/vb',
        // nameLocation: 'middle',
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: '#ffffff66',
            opacity: 0.25,
          }
        },
        axisLabel: {
          formatter: (value: number): string => {
            const unitValue = this.weightMode ? value / 4 : value;
            const selectedPowerOfTen = selectPowerOfTen(unitValue);
            const newVal = Math.round(unitValue / selectedPowerOfTen.divider);
            return `${newVal}${selectedPowerOfTen.unit}`;
          },
        }
      },
      series: [{
        data: this.data,
        type: 'line',
        label: {
          show: true,
          position: 'top',
          color: '#ffffff',
          textShadowBlur: 0,
          formatter: (label: { data: number[] }): string => {
            const value = (label.data[1] * 1000) / 100000000;
            const unitValue = this.weightMode ? value / 4 : value;
            const selectedPowerOfTen = selectPowerOfTen(unitValue);
            const newVal = Math.round(unitValue / selectedPowerOfTen.divider);
            return `${newVal}${selectedPowerOfTen.unit}`;
          }
        },
        showAllSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#D81B60',
          width: 1,
        },
        itemStyle: {
          color: '#b71c1c',
          borderWidth: 10,
          borderMiterLimit: 10,
          opacity: 1,
        },
        areaStyle: {
          color: '#D81B60',
          opacity: 1,
        }
      }]
    };
  }

  ngOnDestroy(): void {
    this.rateUnitSub.unsubscribe();
  }
}
