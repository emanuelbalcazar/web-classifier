# Clasificador de Paginas Webs

Proyecto realizado para rendir el final de la materia Inteligencia Artificial en la Universidad Nacional de la Patagonia San Juan Bosco.

## Requisitos

Instalar Node.js, NPM:

```bash
sudo apt-get install -g npm
```

```bash
sudo apt-get install node
```

## Despliegue

1. Instalar las dependencias del proyecto con: `npm install`.
2. Entrenar los algoritmos de clasificación con: `npm run train`.
3. Comenzar la clasificación disparando una "araña" con: `npm run classify`.


La araña generará un archivo de logs en `src/log/execution.log` donde se colocará la url crawleada, el texto extraido y el resultado de la clasificación del texto usando dos algoritmos: `NaiveBayes` y `Regresión Logistica`. Ambos algoritmos son provistos por la libreria [natural](https://www.npmjs.com/package/natural) disponible en los repositorios de npm para nodejs.


## Notas

- En la carpeta `src/dataset` se encuentran los archivos que contienen las palabras asociadas a cada tematica, con esto se entrenan los algoritmos de clasificación.

- En la carpeta `src/classifiers` se encuentran los clasificadores entrenados que se almacenan como un archivo con formato JSON y se generan una vez que se entrenan a los clasificadores, esto permite poder cargarlos sin necesidad de volver a entrenarlos. 
