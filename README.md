Misión M4 · Full Contact Form — Web Development I.

## Cómo probarlo


## Uso de IA
Usé Claude como pareja de programación:

## Autopsia
Aunque es del tema siguiente, decidí implementar para css la librería tailwind, ya que me pareció cómoda y ya lo habíamos visto en clase para cuando escribí esa parte del código.

Para el tema de las etiquetas en los campos del formulario, decidí anidar los inputs (u otras etiquetas) dentro de las labels para evitarme el problema de los ids, ya que cuando trabajamos con componentes React no es buena idea usar ids, pues queremos que sean reutilizables. La otra alternativa qeu tenía era utilizar useId, pero me parecía innecesariamente complejo para tantos campos teniendo la alternativa que elegí, que te deja ver en un momento que campos están relacionados con qué labels, y es igual de reutilizable.

Para el tema de cómo guardar/validar el enum de las obras teatrales, al principio quería crear una función que transformase a mano el título de las obras a kebab case o a camel case para no tener datos guardados con espacios o mayúsculas que pudiesen ser problemáticas. Sin embargo, al consultar a Claude, me aconsejó que al ser un select simple, no era necesario, ya que no era algo tan sensible como un id o una URL, así que decidí dejar la comprobación como estaba.
