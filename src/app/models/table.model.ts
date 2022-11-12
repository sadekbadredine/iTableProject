export interface TABLE {
  id: string;
  data: {
    id: number;
    status: string | 'AVAILABLE' | 'UNAVAILABLE' | 'TAKE_ORDER' | 'CHECK_OUT';
    order:any;
  };
}
export class Table implements Table {
  constructor(
    public id: string,
    public data: {
      id: number;
      status: string;
    }
  ) {}
}
