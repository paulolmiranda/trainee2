# DGPE Trainee 2: **Atividade 4 - Product API**

**_Desenvolvido por:_** _Thiago de Oliveira Miranda_.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[Github](https://github.com/ThiagoOMiranda)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;[LinkedIn](https://www.linkedin.com/in/thiago-de-oliveira-miranda-5393181a7/)

_Repositório da atividade:_ [tarefa-4-product-api](https://github.com/ThiagoOMiranda/trainee2/tree/feature/tarefa-4-product-api).

<br>

### **Sumário:**

- <a href="#escopo">Escopo do Projeto</a>
- <a href="#conhecimento">Conhecimento Aplicado</a>

<br>

### `Escopo do Projeto: CRUD de Produtos com NestJS` <a name="escopo"></a>

O projeto consiste em criar uma _API_ simples utilizando NestJS, que realiza as operações básicas de um CRUD (Create, Read, Update, Delete) e implementar a persistência dos dados em memória.

**Deve ser implentado:**

- Entidade (Product);
- Módulo;
- Repositório;
- Serviço;
- Controller;

**Cada produto deve ter como propriedades, por exemplo:** id, nome, marca, cor e etc.

**A API deve permitir:**

- Criar um produto;
- Listar todos os produtos;
- Buscar um produto por ID;
- Atualizar um produto;
- Deletar um produto;

Obs: Utilizar ferramentas de requisição para testar os endpoints.

<br>

### `Conhecimento Aplicado` <a name="conhecimento"></a>

**_Separação de responsabilidades:_** Princípio de design que sugere que cada módulo ou componente de um sistema deve ter uma única responsabilidade e que essas responsabilidades devem ser bem definidas e bem separadas.

<br>

**_Módulos organizados por domínio:_** O NestJS é um framework que permite organizar os módulos do sistema em uma estrutura hierárquica, onde cada módulo é responsável por uma funcionalidade específica do sistema.

<br>

**Aplicação de abstração e extensibilidade:** O projeto implementa uma classe abstrata _BaseEntity_ que serve como base para todas as entidades do domínio:

```
export abstract class BaseEntity {
  id: string;

  constructor(partial?: Partial<BaseEntity>) {
    this.id = partial?.id || uuidv4();
  }
}
```

_Pontos importantes:_

- **Classe Abstrata:** Não pode ser instanciada diretamente, apenas estendida.
- **Gerenciamento de IDs:** Gera automaticamente um _UUID v4_ quando nenhum ID é fornecido.
- **Tipo Parcial:** Usa _Partial<T>_ para permitir a construção parcial do objeto.

<br>

**Uso de Genéricos no _FileStorageService_:**
O _FileStorageService_ é uma implementação genérica para persistência de dados:

```
export class FileStorageService<T extends BaseEntity> implements OnModuleInit {
  private data: T[] = [];
  private readonly filePath: string;
  private readonly entityFactory: EntityFactory<T>;
  // ...
}
```

_Pontos importantes:_

- **Tipo Genérico T:** Restrito a classes que estendem _BaseEntity_.
- **Factory Pattern:** Usa uma função factory para criar instâncias do tipo T.
- **Injeção de Dependência:** Integra-se com o sistema de injeção do NestJS.

<br>

**Implementação do _Padrão Repository_:**
O _ProductRepository_ demonstra uma implementação do padrão Repository:

```
@Injectable()
export class ProductRepository {
  constructor(
    @Inject(FileStorageService)
    private readonly storage: FileStorageService<Product>,
  ) {}
  // ...
}
```

_Pontos importantes:_

- **Inversão de Dependência:** Depende de uma abstração (_FileStorageService_) em vez de uma implementação concreta.
- **Tipagem Forte:** Especifica o tipo _Product_ para o _FileStorageService_.
- **Injeção de Dependência:** Usa o decorador _@Inject_ para injeção de dependência.

<br>

**Factory de Entidades:**
O tipo _EntityFactory_ é usado para criar instâncias de entidades de forma tipada:

```
type EntityFactory<T> = (data: Partial<T>) => T;
```

_Pontos importantes:_

- **Flexibilidade:** Permite criar instâncias de qualquer tipo que estenda _BaseEntity_.
- **Tipagem Segura:** Mantém a segurança de tipos em tempo de compilação.
- **Desacoplamento:** Separa a lógica de criação da lógica de negócios.
