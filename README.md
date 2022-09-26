 - Dependências de desenvolvimento (começou como JS):
npm install -D typescript @types/react @types/node
 
 - Estilização:
npm install sass
fonte Roboto obtida em:
https://fonts.google.com/specimen/Roboto

 - detalhes da personalização do document obtido em:
https://nextjs.org/docs/advanced-features/custom-document

 - instalação de api fake (não de forma global):
 npx json-server api.json -p 3333 -w -d 2000 (-d 2000 é um delay de 2 segundos)

 - API utilizada na segunda etapa:
npm install @prismicio/client@5.0.0
npm install prismic-dom@2.2.5 (para auxiliar na tipagem)
npm i --save-dev @types/prismic-dom
dados armazenados e mais informações em:
https://prismic.io/
obs.: foi ativado o legacy builder em configurações nesse site

 - Pacotes de teste:
npm i -D jest jest-dom ts-jest jest-mock @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest identity-obj-proxy jest-environment-jsdom
execução:
npm run test (configurado no package.json)