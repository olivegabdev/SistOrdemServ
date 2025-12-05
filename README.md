# SisOrdemServ - Sistema de Ordens de Serviço

# Sobre o Projeto

O Sistema de Ordens de Serviço é uma aplicação web para gerenciamento de ordens de serviço, desenvolvido como trabalho acadêmico (NP2) para demonstrar o uso de padrões de projeto e arquiteturais.

# Funcionalidades Principais

 - Gestão de clientes: Cadastro, edição e listagem
 - Gestão de Técnicos: Cadastro com controle de disponibilidade
 - Gestão de Chamados: Abertura, atribuição e acompanhamento de status (aberto, em andamento e finalizado)

# Padrão Arquitetural: MVVM (Model-View-ViewModel)
O sistema é baseado na arquitetura MVVM com Angular 20, proporcionando: 

    - Separação clara de responsabilidades
    - Data binding automático com Signals
    - Standalone Components para modularidade 
    - Serviços como ViewModels para lógica de negócio


# Estrutura de Pastas

src/app/  
    |- models/ (interfaces e tipos typescript)  
    |- services/ (lógica de negócio)  
    |- views/ (componentes de páginas)  
    |   |- chamados/ (módulo de chamados)  
    |   |- clientes/ (módulo de clientes)  
    |   |- tecnicos/ (módulo de técnicos)   

# Padrões de Projeto Implementados

 - Factory Method (Padrão criacional)
    Localização: /services

    Exemplo em ClienteService: 
    ```
    private generateId(): number {
    const clientes = this.clientesSignal();
    return Math.max(...clientes.map(c => c.id), 0) + 1;
    }
    
    ```

 - Repository Pattern (Padrão estrutural)
    Localização: /services

    Exemplo em TecnicoService:
   ```
    @Injectable()
    export class TecnicoService {
    getTecnicos(): { ... }
    getTecnicoById(id: number): { ... }
    addTecnicos(tecnico: Tecnico): void { ... }
    }
   
   ```

 - Observer Pattern (Padrão comportamental)
    Localização: Implementado com Angular Signals

    Exemplo:
   ```
    private clientesSignal = signal<Cliente[]>([]);
    clientes = computed(() => this.clientesSignal());
   
   ```

# Decisões de Design Arquitetural

 - Escolha do Angular 20:  
        - Suporte nativo a Signals e Standalone Components.  
        - Código mais limpo e performance otimizada.

 - Implementação de Signals:  
        - Substituir Observables para estados simples.

 - Componentes Standalone:   
        - Simplificar estrutura de módulos.

# Tecnologias Utilizadas

 - Frontend:   
        - Angular 20: Framework principal  
        - Typescript  
        - Angular Signals: Gerenciamento de estado   
        - Angular Router: Navegação SPA  
        - CSS3  
    
 - Ferramentas de desenvolvimento: 
        - Angular CLI   
        - Node.js & npm  
        - Git  
        - VS Code  

# Instalação e Execução 

- Pré-requisitos: 
   - Node.js 18+ [Download](https://nodejs.org/pt)
   - npm 9+ ou yarn
   - Angular CLI 18+

 - Passo a passo: 
    1. Clone o repositório    
       ```
       git clone https://github.com/olivegabdev/SistOrdemServ
        ```
    2. Instale as dependências  
        ```
         npm install
        ```
    3. Execute o servidor de desenvolvimento
        ```
         ng serve
        ```
    4. Acesse a aplicação (https://localhost:4200)

# Equipe e Contribuições

<div align="center">

  |  Pessoa  | Função |
  |:--------:|:------:|
  | Gabrielle Oliveira | Arquitetura, Padrões de Projeto |
  | Laura Oliveira | Documentação |
  | Monalisa Araújo| Frontend |


    Desenvolvido para a Disciplina de Métodos Avançados de Programação   
    Entrega: NP2 - 2025    
    Professor: Leandro Taddeo
</div>
