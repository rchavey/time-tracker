package net.chavey.monster.service;

import net.chavey.monster.domain.Encounter;
import net.chavey.monster.domain.EncounterMonster;
import net.chavey.monster.domain.EncounterMonsterType;
import net.chavey.monster.domain.MonsterType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EncounterRepository {


    @Autowired
    private JdbcTemplate jdbcOperations;

    @Autowired
    private NamedParameterJdbcOperations namedParameterJdbcOperations;

    public List<Encounter> getAll() {

        return jdbcOperations.query("select id, name from encounter", BeanPropertyRowMapper.newInstance(Encounter.class));
    }

    public Encounter getEncounter(Integer encounterId) {

        Encounter encounter = jdbcOperations.queryForObject(
                "select id, name from encounter where id=?", BeanPropertyRowMapper.newInstance(Encounter.class), encounterId);

        RowMapper<EncounterMonsterType> encounterMonsterTypeRowMapper = (rs, rowNum) -> {

            EncounterMonsterType encounterMonsterType = new EncounterMonsterType();
            MonsterType monsterType = new MonsterType();
            monsterType.setId(rs.getInt("monster_type_id"));
            encounterMonsterType.setNotes(rs.getString("notes"));
            encounterMonsterType.setStrategy(rs.getString("strategy"));
            encounterMonsterType.setTreasure(rs.getString("treasure"));
            encounterMonsterType.setMonsterType(monsterType);
            return encounterMonsterType;
        };
        List<EncounterMonsterType> encounterMonsterTypes = jdbcOperations.query(
                "select monster_type_id, strategy, notes, treasure from encounter_monster_type where encounter_id = ?", encounterMonsterTypeRowMapper, encounterId);
        encounter.addEncounterMonsterTypes(encounterMonsterTypes);

        for (EncounterMonsterType encounterMonsterType : encounterMonsterTypes) {
            List<EncounterMonster> encounterMonsters = jdbcOperations.query(
                    "select id, max_hit_points, current_hit_points from encounter_monster where encounter_id = ? and monster_type_id = ?",
                    BeanPropertyRowMapper.newInstance(EncounterMonster.class),
                    encounterId, encounterMonsterType.getMonsterType().getId());
            encounterMonsterType.addEncounterMonsters(encounterMonsters);

            MonsterType monsterType = jdbcOperations.queryForObject(
                    "select * from monster_type where id = ?",
                    BeanPropertyRowMapper.newInstance(MonsterType.class),
                    encounterMonsterType.getMonsterType().getId()
            );
            encounterMonsterType.setMonsterType(monsterType);

        }
        return encounter;
    }

    public void delete(Integer encounterId) {

        jdbcOperations.update("delete from encounter_monster where encounter_id = ?", encounterId);
        jdbcOperations.update("delete from encounter_monster_type where encounter_id = ?", encounterId);
        jdbcOperations.update("delete from encounter where id = ?", encounterId);
    }

    public Number create(Encounter encounter) {

        return new SimpleJdbcInsert(jdbcOperations)
                .withTableName("encounter")
                .usingColumns("name")
                .usingGeneratedKeyColumns("id")
                .executeAndReturnKey(new BeanPropertySqlParameterSource(encounter));
    }

    public void update(Encounter encounter, Integer encounterId) {

        jdbcOperations.update("update encounter set name=? where id=?", encounter.getName(), encounterId);

        encounter.getEncounterMonsterTypes().stream()
            .flatMap(encounterMonsterType -> encounterMonsterType.getEncounterMonsters().stream())
            .forEach(encounterMonster ->
                        jdbcOperations.update(
                                "UPDATE encounter_monster SET current_hit_points = ? WHERE id = ?",
                                encounterMonster.getCurrentHitPoints(), encounterMonster.getId()));
    }

    public void create(EncounterMonsterType encounterMonsterType, Integer encounterId) {

//        deleteEncounterMonsterTypes(encounterId);
        insertEncounterMonsterTypes(encounterId, encounterMonsterType);
        deleteEncounterMonsters(encounterId, encounterMonsterType);
        for (EncounterMonster encounterMonster : encounterMonsterType.getEncounterMonsters()) {
            insertEncounterMonster(encounterId, encounterMonsterType, encounterMonster);
        }
    }

    private void insertEncounterMonster(Integer encounterId, EncounterMonsterType encounterMonsterType, EncounterMonster encounterMonster) {
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("encounterId", encounterId)
                .addValue("monsterTypeId", encounterMonsterType.getMonsterType().getId())
                .addValue("maxHitPoints", encounterMonster.getMaxHitPoints())
                .addValue("currentHitPoints", encounterMonster.getCurrentHitPoints());
        new SimpleJdbcInsert(jdbcOperations)
                .withTableName("encounter_monster")
                .usingColumns("encounter_id", "monster_type_id", "max_hit_points", "current_hit_points")
                .execute(params);
    }

    private int deleteEncounterMonsterTypes(Integer encounterId) {
        return jdbcOperations.update("delete from encounter_monster_type where encounter_id = ?", encounterId);
    }

    private void insertEncounterMonsterTypes(Integer encounterId, EncounterMonsterType encounterMonsterType) {
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("encounterId", encounterId)
                .addValue("monsterTypeId", encounterMonsterType.getMonsterType().getId())
                .addValue("strategy", encounterMonsterType.getStrategy())
                .addValue("notes", encounterMonsterType.getNotes())
                .addValue("treasure", encounterMonsterType.getTreasure());
        namedParameterJdbcOperations.update("replace into encounter_monster_type (encounter_id, monster_type_id, strategy, notes, treasure)" +
                " values (:encounterId, :monsterTypeId, :strategy, :notes, :treasure)", parameterSource);
    }

    private void deleteEncounterMonsters(Integer encounterId, EncounterMonsterType encounterMonsterType) {
        jdbcOperations.update("delete from encounter_monster where encounter_id = ? and monster_type_id = ?",
                encounterId, encounterMonsterType.getMonsterType().getId());
    }

}
