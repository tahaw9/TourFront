export class BaseResponse<T>{
    succcess : boolean = false;
    Data: T|null = null;
    DataCount: number = 0;
    Message: string = "";
}