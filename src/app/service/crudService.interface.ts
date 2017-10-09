interface CrudService<T> extends Service<T> {

    list(): Promise<T[]>;

    cadastrar(t: T): Promise<T>;

    atualizar(t: T): Promise<T>;

    atualizar(t: T);

    getById(t: T): Promise<T>;

}
