# User Prompts

```
quiero que leas el fichero @README.md y que estudies la arquitectura @backend del proyecto para entender la arquitectura (por ejemplo si usa DDD, arquitectura hexagonal, etc.) y buenas prácticas (por ejemplo SOLID, KISS...) de backend así como detectar otros patrones como la organización en directorios y ficheros o el naming de variables entre otros.
Una vez la hayas comprendido, hazme un resumen con todos los puntos.
También quiero que hagas un listado de todos los endpoints y generes las llamadas "curl" para poder probarlos.
``` 

---
## Implementar endpoint para candidatos por posición

```
una vez tienes este conocimiento, quiero que implementes el siguiente endpoint:

GET /positions/:id/candidates

Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

- Nombre completo del candidato (de la tabla candidate).
- current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
- La puntuación media del candidato de todas las entrevistas que ha realizado para esa posición.

Crea todas las capas necesarias, validaciones, consultas de prisma, etc. que consideres siguiendo la arquitectura, buenas práctivas y convenciones del @backend analizadas anteriormente.
``` 