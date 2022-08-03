import { fundoClaro,
conteudoClaro,
textoFundoClaro,
fundoEscuro,
conteudoEscuro,
textoFundoEscuro  
} from './variables'

export const temaClaro = {
  body : fundoClaro,
  inside: conteudoClaro,
  text:textoFundoClaro,
  filter: '',
  fontColor: 'green'
}

export const temaEscuro = {
  body : fundoEscuro,
  inside: conteudoEscuro,
  text: textoFundoEscuro,
  filter: "invert(100)",
  fontColor: conteudoClaro
}
