import React, { useEffect, useState } from 'react'


export default interface IPedidoItens{
    id?:number
    quantidade?:number
    codigoItem?:number
    descricao?:string    
    nrpedido?:number
}