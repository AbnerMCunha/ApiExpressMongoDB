//Ao importar validador global ele aplica a validação automaticamente para todos os modelos exportados. 
//Além disso, a configuração do validadorGlobal.js está centralizada e acessivel a outros modelos que possam necessitar de validações globais, não necessitando realizar a validação dentro de cada modelo mongoose.
//Porém, nos lugares que utilizam a importação direta dos modelos, devem ser alteradas para importar este index.js, que exportará os respectivos modelos, já validados.

import "./validadorGlobal.js";
import { autor } from "./Autor.js";
import livros from "./Livro.js";

export { autor, livros };