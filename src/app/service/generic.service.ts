export abstract class GenericService {

    protected handleError(error: any): Promise<any> {
        console.log(error)
        return Promise.reject(error);
    }

}
