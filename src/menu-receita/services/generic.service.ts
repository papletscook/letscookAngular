export abstract class GenericService {

    protected handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
