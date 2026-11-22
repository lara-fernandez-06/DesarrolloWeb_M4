Misión M4 · Full Contact Form — Web Development I.

## Cómo probarlo
Ejecutas npm run dev (inicamos la página) y npx json-server db.json --port 3000 (para iniciar la api), y podrás ver el formulario a tu disposición para opinar sobre un musical que tú elijas.
En esta entrefa, el formulario manda la información y la guarda en db.json. Debajo del formulario, se pueden ver las últimas reseñas añadidas, las cuales primero pasan por una comporbacion cuando se obtienen los datos de db.json para asegurar que se muestran no hay datos corruptos.

## Uso de IA
Usé Claude como pareja de programación: para ayudarme sobretodo a entender los conceptos de estas nuevas librerías y a mejorar mi eficiencia al escribir partes del código. Además, tuve un problema con cómo instalé alguans librerías, ya que algunas estaban en el proyecto, como debería ser, pero algunas estaban en el repo de gitHub, una carpeta más arriba, lo cual Claude me ayudó a solucionar.

Ejemplos:
"volvamos a mi pregunta anterior. como linkeo lo que quiero tener dentro del src del proyecto, la api con todas las funciones de fetch con get, con el db.json?"

Al final del proyecto también me ayudó con la corrección de errores y con la estética, ya que dejé esta última parte para el final, dando prioridad a la lógica.


## Autopsia

Para el tema de las etiquetas en los campos del formulario, decidí anidar los inputs (u otras etiquetas) dentro de las labels para evitarme el problema de los ids, ya que cuando trabajamos con componentes React no es buena idea usar ids, pues queremos que sean reutilizables. La otra alternativa qeu tenía era utilizar useId, pero me parecía innecesariamente complejo para tantos campos teniendo la alternativa que elegí, que te deja ver en un momento que campos están relacionados con qué labels, y es igual de reutilizable.

Para el tema de cómo guardar/validar el enum de las obras teatrales, al principio quería crear una función que transformase a mano el título de las obras a kebab case o a camel case para no tener datos guardados con espacios o mayúsculas que pudiesen ser problemáticas. Sin embargo, al consultar a Claude, me aconsejó que al ser un select simple, no era necesario, ya que no era algo tan sensible como un id o una URL, así que decidí dejar la comprobación como estaba.

