---
titulo: '7 consultas de SQL Server que todo analista de datos debería dominar'
tituloSeo: '7 consultas de SQL Server para analistas'
descripcion: 'JOIN, GROUP BY, CTE, funciones de ventana y más: siete patrones de T-SQL que resuelven la mayoría de preguntas de negocio, con ejemplos listos para usar.'
resumen: 'Siete patrones de T-SQL cubren la mayoría de preguntas de negocio: filtrar y ordenar, unir tablas con JOIN, agregar con GROUP BY y HAVING, clasificar con CASE, ordenar la lógica con CTE, obtener el top por grupo con ROW_NUMBER y comparar períodos con LAG y sumas acumuladas.'
publicado: 2026-08-18
categoria: datos
etiquetas: ['SQL Server', 'T-SQL', 'análisis de datos', 'funciones de ventana']
curso: analisis-de-datos-con-sql-server-e-ia
faq:
  - pregunta: '¿Qué diferencia hay entre SQL y T-SQL?'
    respuesta: 'SQL es el lenguaje estándar para consultar bases de datos relacionales. T-SQL, o Transact-SQL, es la versión de Microsoft para SQL Server: incluye todo el estándar y le suma variables, control de flujo, procedimientos almacenados y funciones propias.'
  - pregunta: '¿Qué son las funciones de ventana?'
    respuesta: 'Son funciones que calculan sobre un grupo de filas relacionadas sin colapsarlas en una sola, a diferencia de GROUP BY. Permiten rankings, totales acumulados o comparaciones con la fila anterior, y se reconocen por la cláusula OVER.'
  - pregunta: '¿Cuándo conviene usar una CTE?'
    respuesta: 'Cuando una consulta tiene varios pasos. Una CTE, que se escribe con WITH, le pone nombre a un resultado intermedio y hace que la lógica se lea de arriba abajo, en lugar de anidar subconsultas difíciles de revisar.'
---

La mayoría de preguntas que llegan a un analista —cuánto vendimos, quiénes son los mejores clientes, cómo vamos frente al mes pasado— se resuelven con un puñado de patrones de SQL. Dominarlos bien vale más que conocer superficialmente todo el lenguaje.

Estos son los siete que más se repiten, en T-SQL para SQL Server. Los ejemplos usan dos tablas: `Ventas` y `Clientes`.

## 1. Filtrar y ordenar

La base de todo: elegir columnas, filtrar filas y ordenar el resultado.

```sql
SELECT TOP (20) VentaID, Fecha, ClienteID, Importe
FROM Ventas
WHERE Fecha >= '2026-01-01'
  AND Importe > 0
ORDER BY Importe DESC;
```

> Filtra por columnas **sin envolverlas en funciones**. `WHERE YEAR(Fecha) = 2026` impide que SQL Server use el índice; `WHERE Fecha >= '2026-01-01'` sí lo aprovecha.

## 2. Unir tablas con JOIN

Casi ningún dato útil vive en una sola tabla.

```sql
SELECT v.Fecha, c.RazonSocial, c.Region, v.Importe
FROM Ventas AS v
INNER JOIN Clientes AS c
    ON c.ClienteID = v.ClienteID;
```

Usa `INNER JOIN` cuando solo te interesan las coincidencias y `LEFT JOIN` cuando necesitas conservar todas las filas de la izquierda, por ejemplo clientes que **no** compraron.

## 3. Agregar con GROUP BY y HAVING

La tabla dinámica de SQL. `WHERE` filtra filas antes de agrupar; `HAVING` filtra grupos después.

```sql
SELECT c.Region,
       COUNT(*)         AS Operaciones,
       SUM(v.Importe)   AS Total,
       AVG(v.Importe)   AS Ticket
FROM Ventas AS v
JOIN Clientes AS c ON c.ClienteID = v.ClienteID
GROUP BY c.Region
HAVING SUM(v.Importe) > 100000
ORDER BY Total DESC;
```

## 4. Clasificar con CASE

Para crear segmentos o categorías sin tocar la tabla original.

```sql
SELECT ClienteID,
       SUM(Importe) AS Total,
       CASE
           WHEN SUM(Importe) >= 50000 THEN 'A'
           WHEN SUM(Importe) >= 10000 THEN 'B'
           ELSE 'C'
       END AS Segmento
FROM Ventas
GROUP BY ClienteID;
```

## 5. Ordenar la lógica con una CTE

Cuando una consulta tiene varios pasos, una **CTE** le pone nombre a cada uno y la vuelve legible.

```sql
WITH VentasPorCliente AS (
    SELECT ClienteID, SUM(Importe) AS Total
    FROM Ventas
    WHERE Fecha >= '2026-01-01'
    GROUP BY ClienteID
)
SELECT c.RazonSocial, vpc.Total
FROM VentasPorCliente AS vpc
JOIN Clientes AS c ON c.ClienteID = vpc.ClienteID
WHERE vpc.Total > 20000;
```

## 6. El top por grupo con ROW_NUMBER

«Los tres mejores clientes de cada región» es una pregunta clásica que `GROUP BY` no resuelve. Las **funciones de ventana** sí.

```sql
WITH Ranking AS (
    SELECT c.Region, c.RazonSocial, SUM(v.Importe) AS Total,
           ROW_NUMBER() OVER (
               PARTITION BY c.Region
               ORDER BY SUM(v.Importe) DESC
           ) AS Puesto
    FROM Ventas AS v
    JOIN Clientes AS c ON c.ClienteID = v.ClienteID
    GROUP BY c.Region, c.RazonSocial
)
SELECT Region, RazonSocial, Total, Puesto
FROM Ranking
WHERE Puesto <= 3;
```

## 7. Comparar períodos con LAG y sumas acumuladas

Para ver la variación mensual y el acumulado del año en una sola consulta:

```sql
WITH Mensual AS (
    SELECT DATEFROMPARTS(YEAR(Fecha), MONTH(Fecha), 1) AS Mes,
           SUM(Importe) AS Total
    FROM Ventas
    GROUP BY DATEFROMPARTS(YEAR(Fecha), MONTH(Fecha), 1)
)
SELECT Mes,
       Total,
       Total - LAG(Total) OVER (ORDER BY Mes)        AS VariacionMensual,
       SUM(Total) OVER (ORDER BY Mes
                        ROWS UNBOUNDED PRECEDING)    AS Acumulado
FROM Mensual
ORDER BY Mes;
```

## Tres hábitos que separan a un buen analista

- **Revisa los totales** contra una fuente conocida antes de publicar un número.
- **Cuidado con los JOIN que duplican filas**: si un cliente tiene dos direcciones, sus ventas se cuentan dos veces.
- **Documenta con comentarios** qué responde cada consulta: dentro de seis meses no lo recordarás.

## Para seguir

Estos patrones son la base del [curso Análisis de Datos con SQL Server e IA](/cursos/analisis-de-datos-con-sql-server-e-ia/), que continúa con modelado, optimización, integración con Python y Microsoft Fabric. Cuando tus consultas estén listas, el siguiente paso natural es llevarlas a un tablero: te contamos [cuándo dar el salto de Excel a Power BI](/blog/power-bi-vs-excel/).
