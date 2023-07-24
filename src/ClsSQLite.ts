import Dexie from 'dexie';

const NOME_DATABASE: string = 'bancoDados'

export default class ClsSQLite {

    private db: Dexie = new Dexie(NOME_DATABASE)

    public constructor() {
        this.db.version(2).stores({
            pedidos: '++id, nrpedido',
            pedidoiten: '++id, nrpedido'
        })
    }

    public incluir(tabela: string, objeto: any): Promise<boolean> {

        return new Promise((resolve, _reject) => {

            if (this.db) {

                this.db.transaction('rw', tabela, () => {
                    this.db.table(tabela).add(JSON.parse(objeto))
                }).then(() => {
                    console.log("parece que incluil");
                    resolve(true)
                }).catch((e: any) => {
                    console.log("erro no incluir  "+e);
                    resolve(false)
                })
            } else {
                console.log('Sem o DB', this.db)
            }

        })
    }

    public consultar(tabela: string): Promise<Array<any>> {

        return this.db.table(tabela).toArray()

    }
    public consultarWhere(tabela: string, campo:string, valor:string): Promise<Array<any>> {

        return this.db.table(tabela).where(campo).equals(valor).toArray()

    }
    public quantidadeRegistros(tabela: string):Promise<any>{
        return this.db.table(tabela).count();
    }

    public fechar() {
        if (this.db) this.db.close()
    }

}