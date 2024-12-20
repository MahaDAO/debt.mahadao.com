import { EventEmitter } from "events";
import { IMulticallInput } from "../utils/interface";

const multicall = require("@makerdao/multicall");

export default class Multicall extends EventEmitter {
  watcher: any;
  rpcUrl: string;
  address: string;
  calls: IMulticallInput[] = [];

  constructor(rpcUrl: string, address: string) {
    super();
    this.rpcUrl = rpcUrl;
    this.address = address;
    this.calls = [];
    this._recreateWatcher();
  }

  addCall = (data: IMulticallInput): string => {
    this.calls.push(data);
    this._recreateWatcher();
    this.watcher.tap(() => this._getMutlicallCalls([data]));
    return data.key;
  };

  removeCall = (key: string) => {
    const index = this.calls.findIndex((d) => d.key === key);
    if (index <= 0) return;
    this.calls = this.calls.splice(index, 1);
    this._recreateWatcher();
  };

  addCalls = (data: IMulticallInput[]): string[] => {
    data.forEach((d) => this.calls.push(d));
    this._recreateWatcher();
    this.watcher.tap(() => this._getMutlicallCalls(data));
    return data?.map((d) => d.key);
  };

  private _getMutlicallCalls = (calls: IMulticallInput[]) => {
    return calls?.map((c) => ({
      target: c.target,
      call: c.call,
      returns: [[c.key, c.convertResult]],
    }));
  };

  private _processUpdates = (update: { type: any; value: any }) => {
    this.emit(update.type, update.value);
  };

  private _recreateWatcher = () => {
    if (this.watcher) this.watcher.stop();

    const config = {
      rpcUrl: this.rpcUrl,
      multicallAddress: this.address,
      interval: 5000,
    };

    this.watcher = multicall.createWatcher(
      this._getMutlicallCalls(this.calls),
      config
    );
    this.watcher.subscribe(this._processUpdates);

    // Start the watcher polling.
    this.watcher.start();
  };
}
