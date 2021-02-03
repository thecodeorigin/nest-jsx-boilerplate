import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('module', {
    description: 'Generate a module',
    prompts: [{
      type: 'input',
      name: 'entity',
      message: 'Enter entity name:'
    }],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{entity}}s/controller/index.ts',
        templateFile: 'src/app/Template/Example/controller/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/service/index.ts',
        templateFile: 'src/app/Template/Example/service/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/repository/index.ts',
        templateFile: 'src/app/Template/Example/repository/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/dto/create.dto.ts',
        templateFile: 'src/app/Template/Example/dto/create.dto.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/dto/update.dto.ts',
        templateFile: 'src/app/Template/Example/dto/update.dto.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/index.module.ts',
        templateFile: 'src/app/Template/Example/index.module.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/index.entity.example.ts',
        templateFile: 'src/app/Template/Example/index.entity.example.ts'
      },
    ]
  })
  plop.setGenerator('tree_module', {
    description: 'Generate a tree module',
    prompts: [{
      type: 'input',
      name: 'entity',
      message: 'Enter entity name:'
    }],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{entity}}s/controller/index.ts',
        templateFile: 'src/app/Template/ExampleTree/controller/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/service/index.ts',
        templateFile: 'src/app/Template/ExampleTree/service/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/repository/index.ts',
        templateFile: 'src/app/Template/ExampleTree/repository/index.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/dto/create.dto.ts',
        templateFile: 'src/app/Template/ExampleTree/dto/create.dto.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/dto/update.dto.ts',
        templateFile: 'src/app/Template/ExampleTree/dto/update.dto.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/index.module.ts',
        templateFile: 'src/app/Template/ExampleTree/index.module.ts'
      },
      {
        type: 'add',
        path: 'src/app/{{entity}}s/index.entity.example.ts',
        templateFile: 'src/app/Template/ExampleTree/index.entity.example.ts'
      },
    ]
  })
};
