WITH block_heights_in_scope AS (
    SELECT DISTINCT block_height
    FROM (

        SELECT block_height
        FROM test_txs
        ORDER BY block_height DESC
        LIMIT $1
    ) as limited_txs
)

SELECT *
FROM test_txs
WHERE block_height IN (SELECT block_height FROM block_heights_in_scope)
ORDER BY block_height DESC;