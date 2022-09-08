import { fundoClaro,
conteudoClaro,
textoFundoClaro,
fundoEscuro,
conteudoEscuro,
textoFundoEscuro,
corPrimaria  
} from './variables'

export const temaClaro = {
  primaryColor:corPrimaria,
  body : fundoClaro,
  inside: conteudoClaro,
  text:textoFundoClaro,
  filter: '',
  fontColor: 'green'
}

export const temaEscuro = {
  primaryColor:corPrimaria,
  body : fundoEscuro,
  inside: conteudoEscuro,
  text: textoFundoEscuro,
  filter: "invert(100)",
  fontColor: conteudoClaro
}
