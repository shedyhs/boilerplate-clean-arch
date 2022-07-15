import * as awilix from 'awilix';
import { repositoriesContainer, RepositoriesCradle } from './repositories';
import { useCasesContainer, UseCasesCradle } from './usecases';
import { controllersContainer, ControllersCradle } from './controllers';
import { thirdPartiesContainer, ThirdPartiesCradle } from './third-parties';
import { middlewaresContainer, MiddlewaresCradle } from './middlewares';

type Cradle = RepositoriesCradle &
  UseCasesCradle &
  ControllersCradle &
  ThirdPartiesCradle &
  MiddlewaresCradle;

const container = awilix.createContainer<Cradle>({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

container.register({
  ...repositoriesContainer,
  ...useCasesContainer,
  ...controllersContainer,
  ...thirdPartiesContainer,
  ...middlewaresContainer,
});

export { container };
