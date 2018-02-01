DELIMITER $$

DROP PROCEDURE IF EXISTS `test_table_select_all`$$
DROP PROCEDURE IF EXISTS `test_table_select_row`$$
DROP PROCEDURE IF EXISTS `test_table_insert`$$
DROP PROCEDURE IF EXISTS `test_table_update`$$
DROP PROCEDURE IF EXISTS `test_table_delete`$$

CREATE PROCEDURE `test_table_select_all` () READS SQL DATA
  SELECT * FROM test_table
$$

CREATE PROCEDURE `test_table_select_row` (
  IN `$id` INT UNSIGNED
)  READS SQL DATA
SELECT * FROM test_table WHERE id=$id LIMIT 1
$$

CREATE PROCEDURE `test_table_insert` (
  IN `$value` INT UNSIGNED
) MODIFIES SQL DATA
  BEGIN
    INSERT INTO test_table (value) VALUES ($value);
    CALL test_table_select_row(LAST_INSERT_ID());
  END
$$

CREATE PROCEDURE `test_table_update` (
  IN `$id` INT UNSIGNED,
  IN `$value` INT UNSIGNED
) MODIFIES SQL DATA
  BEGIN
    UPDATE test_table SET value=$value WHERE id=$id LIMIT 1;
    CALL test_table_select_row($id);
  END
$$

CREATE PROCEDURE `test_table_delete` (
  IN `$id` INT UNSIGNED
) MODIFIES SQL DATA
  IF ((SELECT COUNT(*) FROM test_table WHERE id=$id) > 0) THEN
    DELETE FROM test_table WHERE id=$id LIMIT 1;
  END IF
$$

DELIMITER ''
